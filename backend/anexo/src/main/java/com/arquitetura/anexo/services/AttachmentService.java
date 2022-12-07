package com.arquitetura.anexo.services;

import com.arquitetura.anexo.dtos.AttachmentInputDTO;
import com.arquitetura.anexo.dtos.AttachmentUploadDTO;
import com.arquitetura.anexo.entities.Attachment;
import com.arquitetura.anexo.repositories.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AttachmentService {

    @Autowired
    private AttachmentRepository attachmentRepository;

    @Autowired
    private RabbitMQService rabbitMQService;

    @Value("%{}")
    private String attachmentPath = "";

    public Attachment create(AttachmentInputDTO attachmentInputDTO) {
        Attachment attachment = new Attachment();
        attachment.setId(UUID.randomUUID());
        attachment.setDate(attachmentInputDTO.getDate());
        attachment.setJustification(attachmentInputDTO.getJustification());
        attachment.setResponsible(attachmentInputDTO.getResponsible());
        attachment.setDocumentType(attachmentInputDTO.getDocumentType());

        String filename = attachment.getId()+"."+attachment.getDocumentType();
        attachment.setFileUrl(attachmentPath+"/"+filename);

        AttachmentUploadDTO attachmentUploadDTO = new AttachmentUploadDTO(filename, attachmentInputDTO.getBase64());
        rabbitMQService.sendMessage("attachment", attachmentUploadDTO);

        return attachmentRepository.save(attachment);
    }

    public List<Attachment> list() {
        return attachmentRepository.findAll();
    }
}

