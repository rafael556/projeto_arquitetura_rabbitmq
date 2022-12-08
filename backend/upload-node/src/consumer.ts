import amqp from 'amqplib'
const AWS = require('aws-sdk')
const fs = require('fs')
require('dotenv').config()

const fila = 'attachment'

async function uploadFile(fileName: string, base64: string) {
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: process.env.AWS_REGION
  })
  const fileContent = Buffer.from(base64, 'base64')

  const contentType = fileName.split('.')[1]
  let contentTypeParam

  switch (contentType) {
    case 'pdf':
      contentTypeParam = 'application/pdf'
      break
    case 'png':
      contentTypeParam = 'image/png'
      break
    case 'jpg':
      contentTypeParam = 'image/jpeg'
      const t = '../app.env'
      break
  }
  // console.log(process.env)
  console.log(process.env.ENV_1)
  console.log(process.env.ENV_2)
  console.log(process.env.ENV_3)
  console.log(process.env.ENV_4)

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: fileContent,
    ContentType: contentTypeParam,
    ACL: 'public-read'
  }

  console.log(params)

  const data = await s3.upload(params).promise()
  console.log(data.Location)
}

amqp
  .connect({
    hostname: 'localhost',
    port: 5672,
    username: 'admin',
    password: '123456'
  })
  .then(connection => {
    connection.createChannel().then(channel => {
      channel.consume(
        fila,
        message => {
          const data = JSON.parse(message.content.toString('utf-8'))
          console.log(data.filename)

          uploadFile(data.filename, data.base64)
        },
        { noAck: true }
      )
    })
  })
  .catch(err => console.log(err))
