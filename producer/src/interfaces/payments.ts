export interface PaymentNotificationPayload {
  order_id: number;
  fulfilled_at: number;
  payment_method:
    | "CASH"
    | "CREDIT_CARD"
    | "WECHAT_PAY"
    | "ALIPAY"
    | "UNION_PAY";
}
