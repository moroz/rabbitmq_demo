import avsc from "avsc";
import fs from "fs";
import path from "path";
import { sendMessage } from "./amqpConnector";
import logger from "./logger";

const schemaDir =
  process.env.AVRO_SCHEMA_DIR || path.join(process.cwd(), "../avro");
const paymentSchemaPath = path.join(schemaDir, "PaymentNotification.avsc");

const schema = fs.readFileSync(paymentSchemaPath, {
  encoding: "utf-8"
});
const type = avsc.parse(schema);

interface PaymentNotificationPayload {
  order_id: number;
  fulfilled_at: number;
  payment_method:
    | "CASH"
    | "CREDIT_CARD"
    | "WECHAT_PAY"
    | "ALIPAY"
    | "UNION_PAY";
}

export async function sendNotification(payload: PaymentNotificationPayload) {
  const serialized = type.toBuffer(payload);
  await sendMessage(serialized);
  logger.info(`Sent notification payload for order ${payload.order_id}`);
  return true;
}
