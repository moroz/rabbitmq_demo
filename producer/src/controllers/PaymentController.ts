import { Request, Response } from "express";
import { sendNotification } from "../connection/paymentNotifier";
import { PaymentNotificationPayload } from "../interfaces/payments";

class PaymentController {
  static async fulfill(req: Request, res: Response) {
    const payload = req.body as PaymentNotificationPayload;
    try {
      await sendNotification(payload);
      res.status(200).send("OK");
    } catch (err) {
      res.status(500).json({
        error: err.message,
        stacktrace: err.stacktrace
      });
    }
  }
}

export default PaymentController;
