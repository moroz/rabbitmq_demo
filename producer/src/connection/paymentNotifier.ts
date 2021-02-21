import avsc from "avsc";
import fs from "fs";
import path from "path";
import { sendMessage } from "./amqpConnector";
import logger from "../utils/logger";
import { PaymentNotificationPayload } from "../interfaces/payments";

const schemaDir =
  process.env.AVRO_SCHEMA_DIR || path.join(process.cwd(), "../avro");
const paymentSchemaPath = path.join(schemaDir, "PaymentNotification.avsc");

const schema = fs.readFileSync(paymentSchemaPath, {
  encoding: "utf-8"
});
const type = avsc.parse(schema);

export async function sendNotification(payload: PaymentNotificationPayload) {
  const serialized = type.toBuffer(payload);
  await sendMessage(serialized);
  logger.info(`Sent notification payload for order ${payload.order_id}`);
  return true;
}
