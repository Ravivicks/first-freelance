import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";
import { Hono } from "hono";

const resend = new Resend(process.env.RESEND_API_KEY);

const app = new Hono().get("/", async (c) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["ravivicks1990@gmail.com"],
    subject: "Hello world",
    react: EmailTemplate({ firstName: "Ravi" }),
  });

  if (error) {
    return c.json({ error });
  }

  return c.json({ data });
});

export default app;
