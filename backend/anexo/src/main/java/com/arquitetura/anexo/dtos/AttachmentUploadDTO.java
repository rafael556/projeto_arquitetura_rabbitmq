package com.arquitetura.anexo.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AttachmentUploadDTO {

    private String filename;
    private String base64;
}
