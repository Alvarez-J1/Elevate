package com.elevate.backend.mapper;

import com.elevate.backend.dto.product.ProductColorDto;
import com.elevate.backend.dto.product.ProductResponse;
import com.elevate.backend.dto.product.ProductSummaryResponse;
import com.elevate.backend.entity.Product;
import com.elevate.backend.entity.ProductColor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductMapper {

    public ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getSku(),
                product.getSlug(),
                product.getName(),
                product.getTagline(),
                product.getCategory().getName(),
                product.getCategory().getSlug(),
                product.getPrice(),
                product.getOriginalPrice(),
                product.getRating(),
                product.getReviewCount(),
                product.getDescription(),
                List.copyOf(product.getFeatures()),
                java.util.Map.copyOf(product.getSpecs()),
                product.getColors().stream().map(this::toColorDto).toList(),
                List.copyOf(product.getImages()),
                product.getBadge(),
                product.getStock(),
                product.isInStock(),
                product.getAccent());
    }

    public ProductSummaryResponse toSummary(Product product) {
        String primaryImage = product.getImages().isEmpty() ? null : product.getImages().get(0);

        return new ProductSummaryResponse(
                product.getId(),
                product.getSlug(),
                product.getName(),
                product.getTagline(),
                product.getCategory().getName(),
                product.getPrice(),
                product.getOriginalPrice(),
                product.getRating(),
                product.getReviewCount(),
                primaryImage,
                product.getBadge(),
                product.isInStock(),
                product.getAccent());
    }

    public ProductColorDto toColorDto(ProductColor color) {
        return new ProductColorDto(color.getName(), color.getValue());
    }

    public ProductColor toColorEntity(ProductColorDto dto) {
        return new ProductColor(dto.name(), dto.value());
    }
}
