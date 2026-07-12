package com.elevate.backend.service;

import com.elevate.backend.dto.cart.AddCartItemRequest;
import com.elevate.backend.dto.cart.CartResponse;
import com.elevate.backend.entity.Cart;
import com.elevate.backend.entity.CartItem;
import com.elevate.backend.entity.Product;
import com.elevate.backend.entity.Role;
import com.elevate.backend.entity.User;
import com.elevate.backend.exception.BadRequestException;
import com.elevate.backend.exception.ResourceNotFoundException;
import com.elevate.backend.mapper.CartMapper;
import com.elevate.backend.repository.CartItemRepository;
import com.elevate.backend.repository.CartRepository;
import com.elevate.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class CartServiceTest {

    @Mock
    private CartRepository cartRepository;
    @Mock
    private CartItemRepository cartItemRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ProductService productService;

    private final CartMapper cartMapper = new CartMapper();

    private CartService cartService() {
        return new CartService(cartRepository, cartItemRepository, userRepository, productService, cartMapper);
    }

    private User user(long id) {
        return User.builder()
                .id(id)
                .email("user-" + id + "@example.com")
                .passwordHash("hash")
                .firstName("Test")
                .lastName("User")
                .role(Role.USER)
                .enabled(true)
                .build();
    }

    private Cart cart(long id, User user) {
        return Cart.builder()
                .id(id)
                .user(user)
                .items(new ArrayList<>())
                .build();
    }

    private Product product(long id, String price, int stock) {
        return Product.builder()
                .id(id)
                .sku("SKU-" + id)
                .slug("product-" + id)
                .name("Product " + id)
                .tagline("A useful product")
                .price(new BigDecimal(price))
                .stock(stock)
                .accent("#7dd3fc")
                .images(new ArrayList<>(List.of("/product-" + id + ".png")))
                .build();
    }

    private CartItem cartItem(long id, Cart cart, Product product, int quantity, String color) {
        CartItem item = CartItem.builder()
                .id(id)
                .cart(cart)
                .product(product)
                .quantity(quantity)
                .color(color)
                .build();
        cart.addItem(item);
        return item;
    }

    @Test
    void addItem_createsLineAndCalculatesTotals() {
        Cart cart = cart(10L, user(1L));
        Product product = product(1L, "25.00", 10);

        given(cartRepository.findByUser_Id(1L)).willReturn(Optional.of(cart));
        given(productService.getProductEntityById(1L)).willReturn(product);
        given(cartItemRepository.findByCart_IdAndProduct_IdAndColor(10L, 1L, "Graphite"))
                .willReturn(Optional.empty());
        given(cartItemRepository.save(any(CartItem.class))).willAnswer(invocation -> {
            CartItem item = invocation.getArgument(0);
            item.setId(100L);
            return item;
        });

        CartResponse response = cartService().addItem(1L, new AddCartItemRequest(1L, 2, "Graphite"));

        assertThat(response.items()).hasSize(1);
        assertThat(response.items().get(0).id()).isEqualTo(100L);
        assertThat(response.items().get(0).color()).isEqualTo("Graphite");
        assertThat(response.itemCount()).isEqualTo(2);
        assertThat(response.subtotal()).isEqualByComparingTo("50.00");
    }

    @Test
    void addItem_combinesDuplicateProductVariant() {
        Cart cart = cart(10L, user(1L));
        Product product = product(1L, "25.00", 10);
        CartItem existing = cartItem(100L, cart, product, 2, "Graphite");

        given(cartRepository.findByUser_Id(1L)).willReturn(Optional.of(cart));
        given(productService.getProductEntityById(1L)).willReturn(product);
        given(cartItemRepository.findByCart_IdAndProduct_IdAndColor(10L, 1L, "Graphite"))
                .willReturn(Optional.of(existing));

        CartResponse response = cartService().addItem(1L, new AddCartItemRequest(1L, 3, "Graphite"));

        assertThat(existing.getQuantity()).isEqualTo(5);
        assertThat(response.items()).hasSize(1);
        assertThat(response.itemCount()).isEqualTo(5);
        assertThat(response.subtotal()).isEqualByComparingTo("125.00");
    }

    @Test
    void addItem_normalizesMissingColorForStorageButReturnsNull() {
        Cart cart = cart(10L, user(1L));
        Product product = product(1L, "25.00", 10);

        given(cartRepository.findByUser_Id(1L)).willReturn(Optional.of(cart));
        given(productService.getProductEntityById(1L)).willReturn(product);
        given(cartItemRepository.findByCart_IdAndProduct_IdAndColor(10L, 1L, ""))
                .willReturn(Optional.empty());
        given(cartItemRepository.save(any(CartItem.class))).willAnswer(invocation -> {
            CartItem item = invocation.getArgument(0);
            assertThat(item.getColor()).isEqualTo("");
            item.setId(102L);
            return item;
        });

        CartResponse response = cartService().addItem(1L, new AddCartItemRequest(1L, 2, null));

        assertThat(response.items()).singleElement().satisfies(item -> {
            assertThat(item.id()).isEqualTo(102L);
            assertThat(item.color()).isNull();
        });
    }

    @Test
    void addItem_keepsDistinctVariantsSeparate() {
        Cart cart = cart(10L, user(1L));
        Product product = product(1L, "25.00", 10);
        cartItem(100L, cart, product, 2, "Graphite");

        given(cartRepository.findByUser_Id(1L)).willReturn(Optional.of(cart));
        given(productService.getProductEntityById(1L)).willReturn(product);
        given(cartItemRepository.findByCart_IdAndProduct_IdAndColor(10L, 1L, "Mist"))
                .willReturn(Optional.empty());
        given(cartItemRepository.save(any(CartItem.class))).willAnswer(invocation -> {
            CartItem item = invocation.getArgument(0);
            item.setId(101L);
            return item;
        });

        CartResponse response = cartService().addItem(1L, new AddCartItemRequest(1L, 1, "Mist"));

        assertThat(response.items()).hasSize(2);
        assertThat(response.items()).extracting("color").containsExactly("Graphite", "Mist");
        assertThat(response.itemCount()).isEqualTo(3);
    }

    @Test
    void addItem_rejectsCombinedQuantityAboveLimit() {
        Cart cart = cart(10L, user(1L));
        Product product = product(1L, "25.00", 200);
        CartItem existing = cartItem(100L, cart, product, 60, "Graphite");

        given(cartRepository.findByUser_Id(1L)).willReturn(Optional.of(cart));
        given(productService.getProductEntityById(1L)).willReturn(product);
        given(cartItemRepository.findByCart_IdAndProduct_IdAndColor(10L, 1L, "Graphite"))
                .willReturn(Optional.of(existing));

        assertThrows(BadRequestException.class,
                () -> cartService().addItem(1L, new AddCartItemRequest(1L, 40, "Graphite")));
    }

    @Test
    void updateItemQuantity_rejectsItemOutsideUsersCart() {
        Cart cart = cart(10L, user(1L));

        given(cartRepository.findByUser_Id(1L)).willReturn(Optional.of(cart));
        given(cartItemRepository.findByIdAndCart_Id(999L, 10L)).willReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> cartService().updateItemQuantity(1L, 999L, 2));
    }
}
