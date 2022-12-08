package com.arquitetura.anexo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Attachment {

    @Id
    private UUID id;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private String responsible;

    private LocalDate date;

    private String documentType;

    private String subject;

    private String justification;

    private String fileUrl;
}
