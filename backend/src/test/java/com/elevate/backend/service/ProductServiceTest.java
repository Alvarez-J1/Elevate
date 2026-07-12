package com.elevate.backend.service;

import com.elevate.backend.dto.common.PageResponse;
import com.elevate.backend.dto.product.ProductRequest;
import com.elevate.backend.dto.product.ProductSummaryResponse;
import com.elevate.backend.entity.Category;
import com.elevate.backend.entity.Product;
import com.elevate.backend.exception.DuplicateResourceException;
import com.elevate.backend.exception.ResourceNotFoundException;
import com.elevate.backend.mapper.ProductMapper;
import com.elevate.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;
    @Mock
    private CategoryService categoryService;
    @Mock
    private ProductMapper productMapper;

    private ProductService productService() {
        return new ProductService(productRepository, categoryService, productMapper);
    }

    @Test
    void getProductEntityBySlug_throwsWhenMissing() {
        given(productRepository.findBySlugIgnoreCase("missing")).willReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> productService().getProductEntityBySlug("missing"));
    }

    @Test
    void search_delegatesToRepositoryAndMapsResults() {
        Category category = Category.builder().id(1L).name("Audio").slug("audio").description("d").build();
        Product product = Product.builder()
                .id(1L)
                .sku("ELV-001")
                .slug("vanta-studio")
                .name("Vanta Studio")
                .tagline("Great sound")
                .category(category)
                .price(new BigDecimal("549.00"))
                .accent("#7dd3fc")
                .build();

        Page<Product> page = new PageImpl<>(List.of(product));
        Pageable pageable = PageRequest.of(0, 24);

        given(productRepository.search(any(), any(), any(), any(), any(), any(), any(), anyString(), any(Pageable.class)))
                .willReturn(page);
        given(productMapper.toSummary(product)).willReturn(new ProductSummaryResponse(
                1L, "vanta-studio", "Vanta Studio", "Great sound", "Audio", new BigDecimal("549.00"), null,
                BigDecimal.ZERO, 0, null, null, true, "#7dd3fc"));

        PageResponse<ProductSummaryResponse> result = productService()
                .search(null, null, null, null, null, null, null, List.of(), pageable);

        assertThat(result.content()).hasSize(1);
        assertThat(result.content().get(0).slug()).isEqualTo("vanta-studio");
        assertThat(result.totalElements()).isEqualTo(1);
    }

    @Test
    void create_throwsWhenSlugAlreadyExists() {
        given(productRepository.existsBySlugIgnoreCase("dup-slug")).willReturn(true);

        ProductRequest request = new ProductRequest(
                "SKU-1", "dup-slug", "Name", "Tagline", 1L, BigDecimal.TEN, null, "desc",
                List.of("feature"), Map.of(), List.of(), List.of("/img.png"), null, 5, "#fff");

        assertThrows(DuplicateResourceException.class, () -> productService().create(request));
    }
}
