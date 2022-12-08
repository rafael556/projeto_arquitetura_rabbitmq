package com.arquitetura.anexo.controllers;

import com.arquitetura.anexo.dtos.AttachmentInputDTO;
import com.arquitetura.anexo.entities.Attachment;
import com.arquitetura.anexo.services.AttachmentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AttachmentController {

    @Autowired
    private AttachmentService attachmentService;

    @PostMapping("test")
    public ResponseEntity<String> test() throws JsonProcessingException {
        return ResponseEntity.ok(attachmentService.testMessage());
    }

    @PostMapping("/v1/attachment")
    public ResponseEntity<Attachment> createAttachment(@RequestBody AttachmentInputDTO attachmentInputDTO) throws JsonProcessingException {
        return ResponseEntity.status(HttpStatus.CREATED).body(attachmentService.create(attachmentInputDTO));
    }

    @GetMapping("/v1/attachment")
    public ResponseEntity<List<Attachment>> listAttachments() {
        return ResponseEntity.ok(attachmentService.list());
    }
}
