package com.elevate.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * A purchasable color/finish option for a {@link Product}, e.g. "Graphite" / #1d1d22.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ProductColor {

    @Column(name = "color_name", nullable = false, length = 60)
    private String name;

    @Column(name = "color_value", nullable = false, length = 20)
    private String value;
}
