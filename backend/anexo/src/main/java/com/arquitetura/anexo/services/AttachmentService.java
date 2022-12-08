package com.arquitetura.anexo.services;

import com.arquitetura.anexo.connections.RabbitMQConnection;
import com.arquitetura.anexo.dtos.AttachmentInputDTO;
import com.arquitetura.anexo.dtos.AttachmentUploadDTO;
import com.arquitetura.anexo.entities.Attachment;
import com.arquitetura.anexo.repositories.AttachmentRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
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

    public Attachment create(AttachmentInputDTO attachmentInputDTO) throws JsonProcessingException {
        Attachment attachment = new Attachment();
        attachment.setId(UUID.randomUUID());
        attachment.setDate(attachmentInputDTO.getDate());
        attachment.setJustification(attachmentInputDTO.getJustification());
        attachment.setResponsible(attachmentInputDTO.getResponsible());
        attachment.setSubject(attachmentInputDTO.getSubject());
        attachment.setDocumentType(attachmentInputDTO.getDocumentType());

        String filename = attachment.getId()+"."+attachment.getDocumentType();
        attachment.setFileUrl("http://localhost:8081/anexos"+filename);

        AttachmentUploadDTO attachmentUploadDTO = new AttachmentUploadDTO(filename, attachmentInputDTO.getBase64());
        rabbitMQService.sendMessage("attachment", attachmentUploadDTO);

        return attachmentRepository.save(attachment);
    }

    public String testMessage() throws JsonProcessingException {
            AttachmentUploadDTO attachmentUploadDTO = new AttachmentUploadDTO("teste", "123");
        rabbitMQService.sendMessage("test", attachmentUploadDTO);
            return "Mensagem enviada";
    }

    public List<Attachment> list() {
        return attachmentRepository.findAll();
    }
}

