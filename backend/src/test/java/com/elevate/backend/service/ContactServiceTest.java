package com.elevate.backend.service;

import com.elevate.backend.dto.common.PageResponse;
import com.elevate.backend.dto.contact.ContactMessageRequest;
import com.elevate.backend.dto.contact.ContactMessageResponse;
import com.elevate.backend.dto.contact.ContactSubmissionResponse;
import com.elevate.backend.entity.ContactMessage;
import com.elevate.backend.mapper.ContactMessageMapper;
import com.elevate.backend.repository.ContactMessageRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    @Mock
    private ContactMessageRepository contactMessageRepository;

    private final ContactMessageMapper contactMessageMapper = new ContactMessageMapper();

    private ContactService contactService() {
        return new ContactService(contactMessageRepository, contactMessageMapper);
    }

    @Test
    void submit_savesMessageAndReturnsMinimalSubmissionResponse() {
        Instant createdAt = Instant.parse("2026-07-11T12:00:00Z");

        given(contactMessageRepository.save(any(ContactMessage.class))).willAnswer(invocation -> {
            ContactMessage message = invocation.getArgument(0);
            message.setId(42L);
            message.setCreatedAt(createdAt);
            return message;
        });

        ContactSubmissionResponse response = contactService().submit(new ContactMessageRequest(
                "Jane Doe",
                "jane@example.com",
                "Shipping question",
                "Can you help with delivery timing?"));

        assertThat(response.id()).isEqualTo(42L);
        assertThat(response.createdAt()).isEqualTo(createdAt);
    }

    @Test
    void findAll_returnsAdminMessageDtosNewestFirstFromRepository() {
        Instant createdAt = Instant.parse("2026-07-11T12:00:00Z");
        ContactMessage message = ContactMessage.builder()
                .id(42L)
                .name("Jane Doe")
                .email("jane@example.com")
                .subject("Shipping question")
                .message("Can you help with delivery timing?")
                .resolved(false)
                .createdAt(createdAt)
                .build();

        given(contactMessageRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(0, 20)))
                .willReturn(new PageImpl<>(List.of(message)));

        PageResponse<ContactMessageResponse> response = contactService()
                .findAll(PageRequest.of(0, 20));

        assertThat(response.content()).singleElement().satisfies(item -> {
            assertThat(item.id()).isEqualTo(42L);
            assertThat(item.email()).isEqualTo("jane@example.com");
            assertThat(item.message()).isEqualTo("Can you help with delivery timing?");
            assertThat(item.createdAt()).isEqualTo(createdAt);
        });
    }
}
