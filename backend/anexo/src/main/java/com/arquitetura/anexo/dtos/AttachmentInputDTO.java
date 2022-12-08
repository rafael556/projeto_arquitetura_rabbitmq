package com.arquitetura.anexo.dtos;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

@Data
public class AttachmentInputDTO implements Serializable {
    private String responsible;
    private LocalDate date;
    private String documentType;
    private String subject;
    private String justification;
    private String base64;
}
