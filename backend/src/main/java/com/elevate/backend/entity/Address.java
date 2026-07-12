package com.elevate.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * A shipping address snapshot, embedded directly into {@link Order} so that
 * historical orders remain accurate even if a customer later edits their
 * saved address.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Address {

    @Column(name = "shipping_first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "shipping_last_name", nullable = false, length = 100)
    private String lastName;

    @Column(name = "shipping_address_line1", nullable = false, length = 200)
    private String addressLine1;

    @Column(name = "shipping_city", nullable = false, length = 100)
    private String city;

    @Column(name = "shipping_postal_code", nullable = false, length = 20)
    private String postalCode;

    @Column(name = "shipping_country", nullable = false, length = 100)
    private String country;
}
