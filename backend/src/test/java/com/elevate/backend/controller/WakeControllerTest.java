package com.elevate.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class WakeControllerTest {

    private static final String DEMO_RESUME_URL = "https://elevate-storefront.vercel.app/login?resumeDemo=1";

    @Autowired
    private MockMvc mockMvc;

    @Test
    void wakeRedirectsWithoutAuthentication() throws Exception {
        mockMvc.perform(get("/wake"))
                .andExpect(status().isSeeOther())
                .andExpect(header().string("Location", DEMO_RESUME_URL));
    }
}
