package com.arquitetura.anexo.connections;

import jakarta.annotation.PostConstruct;
import org.springframework.amqp.core.*;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQConnection {
    private final AmqpAdmin amqpAdmin;

    public RabbitMQConnection(AmqpAdmin amqpAdmin) {
        this.amqpAdmin = amqpAdmin;
    }

    private Queue queue(String queueName) {
        return new Queue(queueName, true, false, false);
    }

    private DirectExchange directExchange() {
        return new DirectExchange("test-exchange");
    }

    private Binding relacionamento(Queue queue, DirectExchange exchange) {
        return new Binding(queue.getName(), Binding.DestinationType.QUEUE, exchange.getName(), queue.getName(), null);
    }

    @PostConstruct
    private void add() {
        Queue attachment = this.queue("attachment");
        Queue test = this.queue("test");

        DirectExchange exchange = this.directExchange();

        Binding ligacaoattachment = this.relacionamento(attachment, exchange);
        Binding ligacaoTest = this.relacionamento(test, exchange);

        //Criando as filas no RabbitMQ
        this.amqpAdmin.declareQueue(attachment);
        this.amqpAdmin.declareQueue(test);

        this.amqpAdmin.declareExchange(exchange);

        this.amqpAdmin.declareBinding(ligacaoattachment);
        this.amqpAdmin.declareBinding(ligacaoTest);
    }
}
