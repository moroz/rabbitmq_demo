import logger from "./logger";
import amqplib from "amqplib";

const {
  RABBITMQ_HOST = "localhost",
  RABBITMQ_CONNECTION_RETRIES = 3,
  RABBITMQ_CONNECTION_INTERVAL = 5000,
  RABBITMQ_PAYMENT_QUEUE: QUEUE = "payment_notifications"
} = process.env;

let connection: amqplib.Connection;
let channel: amqplib.Channel;

const app = async () => {
  logger.info("Connecting to RabbitMQ...");
  connection = await amqplib.connect(`amqp://${RABBITMQ_HOST}`);
  logger.debug("Connected! Creating channel...");
  channel = await connection.createChannel();
  logger.debug("Created channel.");
  channel.assertQueue(QUEUE);
  logger.debug(`Created queue ${QUEUE}.`);
};

export default function connect(retries = 0) {
  app().catch(() => {
    if (retries === Number(RABBITMQ_CONNECTION_RETRIES) - 1) {
      logger.error("Connection failed and maximum retries exceeded, exiting!");
      process.exit(1);
    }
    logger.warn(
      `Connection failed, trying again in ${RABBITMQ_CONNECTION_INTERVAL}ms`
    );
    setTimeout(
      () => connect(retries + 1),
      Number(RABBITMQ_CONNECTION_INTERVAL)
    );
  });
}

function normalizeMessage(message: Buffer | string) {
  if (message instanceof Buffer) {
    return message;
  }
  return Buffer.from(message, "binary");
}

export async function sendMessage(message: Buffer | string) {
  return channel.sendToQueue(QUEUE, normalizeMessage(message));
}
