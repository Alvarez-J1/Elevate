package com.elevate.backend.mapper;

import com.elevate.backend.dto.order.OrderItemResponse;
import com.elevate.backend.dto.order.OrderResponse;
import com.elevate.backend.dto.order.ShippingAddressDto;
import com.elevate.backend.entity.Order;
import com.elevate.backend.entity.OrderItem;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    public OrderResponse toResponse(Order order) {
        var items = order.getItems().stream().map(this::toItemResponse).toList();
        var address = order.getShippingAddress();

        ShippingAddressDto addressDto = new ShippingAddressDto(
                address.getFirstName(),
                address.getLastName(),
                address.getAddressLine1(),
                address.getCity(),
                address.getPostalCode(),
                address.getCountry());

        return new OrderResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getStatus().name(),
                order.getContactEmail(),
                addressDto,
                items,
                order.getSubtotal(),
                order.getShippingCost(),
                order.getTax(),
                order.getTotal(),
                order.getCreatedAt());
    }

    public OrderItemResponse toItemResponse(OrderItem item) {
        return new OrderItemResponse(
                item.getId(),
                item.getProduct() != null ? item.getProduct().getId() : null,
                item.getProductName(),
                item.getProductImage(),
                item.getUnitPrice(),
                item.getQuantity(),
                item.getColor(),
                item.getLineTotal());
    }
}
