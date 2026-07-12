package com.elevate.backend.mapper;

import com.elevate.backend.dto.contact.ContactMessageResponse;
import com.elevate.backend.entity.ContactMessage;
import org.springframework.stereotype.Component;

@Component
public class ContactMessageMapper {

    public ContactMessageResponse toResponse(ContactMessage message) {
        return new ContactMessageResponse(
                message.getId(),
                message.getName(),
                message.getEmail(),
                message.getSubject(),
                message.getMessage(),
                message.isResolved(),
                message.getCreatedAt());
    }
}
