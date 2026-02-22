/** Payload sent to the `/api/contact` endpoint. */
export interface ContactForm {
  /** Sender's full name. */
  name: string;
  /** Sender's email address. */
  email: string;
  /** Free-text message body. */
  message: string;
}
