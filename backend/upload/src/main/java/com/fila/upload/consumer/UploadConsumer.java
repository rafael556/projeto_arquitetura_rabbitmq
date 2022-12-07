package com.fila.upload.consumer;

import com.fila.upload.model.AttachmentUploadDTO;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
public class UploadConsumer {

    @RabbitListener(queues = "attachment")
    private void uploadAttachments(AttachmentUploadDTO attachmentUploadDTO) {
        byte[] bytes = Base64.getDecoder().decode(attachmentUploadDTO.getBase64().getBytes(StandardCharsets.UTF_8));

        File file = new File("/var/lib"+attachmentUploadDTO.getFilename());
        try {
            OutputStream os = new FileOutputStream(file);

            os.write(bytes);
            os.close();
        } catch(Exception e) {
            System.out.println("Exception: " + e);
        }

    }
}
