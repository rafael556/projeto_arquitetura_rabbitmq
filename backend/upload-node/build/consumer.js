"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var amqplib_1 = __importDefault(require("amqplib"));
var AWS = require('aws-sdk');
var fs = require('fs');
require('dotenv').config({ path: '../.env' });
var fila = 'attachment';
function uploadFile(fileName, base64) {
    return __awaiter(this, void 0, void 0, function () {
        var s3, fileContent, contentType, contentTypeParam, t, params, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    s3 = new AWS.S3({
                        apiVersion: '2006-03-01',
                        region: process.env.AWS_REGION
                    });
                    fileContent = Buffer.from(base64, 'base64');
                    contentType = fileName.split('.')[1];
                    switch (contentType) {
                        case 'pdf':
                            contentTypeParam = 'application/pdf';
                            break;
                        case 'png':
                            contentTypeParam = 'image/png';
                            break;
                        case 'jpg':
                            contentTypeParam = 'image/jpeg';
                            t = '../app.env';
                            break;
                    }
                    // console.log(process.env)
                    console.log(process.env.ENV_1);
                    console.log(process.env.ENV_2);
                    console.log(process.env.ENV_3);
                    console.log(process.env.ENV_4);
                    params = {
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: fileName,
                        Body: fileContent,
                        ContentType: contentTypeParam
                    };
                    console.log(params);
                    return [4 /*yield*/, s3.upload(params).promise()];
                case 1:
                    data = _a.sent();
                    console.log(data.Location);
                    return [2 /*return*/];
            }
        });
    });
}
amqplib_1.default
    .connect({
    hostname: 'localhost',
    port: 5672,
    username: 'admin',
    password: '123456'
})
    .then(function (connection) {
    connection.createChannel().then(function (channel) {
        channel.consume(fila, function (message) {
            var data = JSON.parse(message.content.toString('utf-8'));
            console.log(data.filename);
            uploadFile(data.filename, data.base64);
        }, { noAck: true });
    });
})
    .catch(function (err) { return console.log(err); });
