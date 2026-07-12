-- Keep database constraints aligned with the public contact form DTO.

ALTER TABLE contact_messages
    ADD CONSTRAINT chk_contact_messages_name_not_blank
        CHECK (char_length(trim(name)) > 0);

ALTER TABLE contact_messages
    ADD CONSTRAINT chk_contact_messages_email_not_blank
        CHECK (char_length(trim(email)) > 0);

ALTER TABLE contact_messages
    ADD CONSTRAINT chk_contact_messages_subject_not_blank
        CHECK (char_length(trim(subject)) > 0);

ALTER TABLE contact_messages
    ADD CONSTRAINT chk_contact_messages_message_not_blank
        CHECK (char_length(trim(message)) > 0);

ALTER TABLE contact_messages
    ADD CONSTRAINT chk_contact_messages_message_length
        CHECK (char_length(message) <= 5000);
