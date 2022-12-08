package com.arquitetura.anexo.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class AttachmentUploadDTO {

    private String filename;
    private String base64;
}
