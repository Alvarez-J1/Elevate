package com.elevate.backend.service;

import com.elevate.backend.dto.common.PageResponse;
import com.elevate.backend.dto.contact.ContactMessageRequest;
import com.elevate.backend.dto.contact.ContactMessageResponse;
import com.elevate.backend.dto.contact.ContactSubmissionResponse;
import com.elevate.backend.entity.ContactMessage;
import com.elevate.backend.mapper.ContactMessageMapper;
import com.elevate.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final ContactMessageMapper contactMessageMapper;

    @Transactional
    public ContactSubmissionResponse submit(ContactMessageRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.name())
                .email(request.email())
                .subject(request.subject())
                .message(request.message())
                .resolved(false)
                .build();

        ContactMessage saved = contactMessageRepository.save(message);
        return new ContactSubmissionResponse(saved.getId(), saved.getCreatedAt());
    }

    @Transactional(readOnly = true)
    public PageResponse<ContactMessageResponse> findAll(Pageable pageable) {
        Page<ContactMessage> page = contactMessageRepository.findAllByOrderByCreatedAtDesc(pageable);
        return PageResponse.from(page.map(contactMessageMapper::toResponse));
    }
}
