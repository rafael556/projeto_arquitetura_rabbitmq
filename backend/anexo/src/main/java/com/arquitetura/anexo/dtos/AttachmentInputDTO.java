package com.arquitetura.anexo.dtos;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class AttachmentInputDTO implements Serializable {
    private String responsible;
    private LocalDateTime date;
    private String documentType;
    private String subject;
    private String justification;
    private String base64;
}
