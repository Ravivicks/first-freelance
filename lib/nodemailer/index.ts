"use server";

import {
  EmailContent,
  EmailProductInfo,
  EnquireProps,
  NotificationType,
  PriceRequestProps,
} from "@/types";
import nodemailer from "nodemailer";

const Notification = {
  NEW_USER: "NEW_USER",
  ENQUIRY: "ENQUIRY",
  REQUEST_FOR_PRICE: "REQUEST_FOR_PRICE",
  ORDER_CONFIRMATION: "ORDER_CONFIRMATION",
};

export async function generateEmailBody(
  type: NotificationType,
  user?: { username: string; password: string },
  product?: EnquireProps | PriceRequestProps
) {
  // Use the full product name
  const productName = product?.productName ?? "Product";

  // Define subjects and bodies for each notification type
  const subjectsAndBodies = {
    [Notification.NEW_USER]: {
      subject: `Welcome to Automation Ecom Global!`,
      body: `
        <div>
          <h2>Welcome to Automation Ecom Global 🚀</h2>
          <p>We're excited to have you on board!</p>
          <p>Here are your account details:</p>
          <ul>
            <li><strong>Username:</strong> ${user?.username}</li>
            <li><strong>Password:</strong> ${user?.password}</li>
          </ul>
          <p>Please keep these details secure and use them to log in to your account.</p>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Thank you for choosing Automation Ecom Global!</p>
        </div>
      `,
    },
    [Notification.ENQUIRY]: {
      subject: `Enquiry Received for ${productName}`,
      body: `
        <div>
          <h4>Thank you for your enquiry about ${productName}.</h4>
          <p>Our team at Automation Ecom Global will get back to you with more information soon.</p>
        </div>
      `,
    },
    [Notification.REQUEST_FOR_PRICE]: {
      subject: `Price Request for ${productName} Submitted`,
      body: `
        <div>
          <h4>Thank you for requesting the price for ${productName}.</h4>
          <p>We will notify you through Automation Ecom Global when there's a price drop or promotion available.</p>
        </div>
      `,
    },
    [Notification.ORDER_CONFIRMATION]: {
      subject: `Order Confirmation for ${productName}`,
      body: `
        <div>
          <h4>Thank you for your order of ${productName}!</h4>
          <p>Your order has been confirmed by Automation Ecom Global and is being processed.</p>
          <p>We will notify you when your order is ready for shipping.</p>
        </div>
      `,
    },
  };

  // Get the subject and body based on the notification type
  const { subject, body } = subjectsAndBodies[type] || {
    subject: "",
    body: "",
  };

  // Throw an error if the type is invalid
  if (!subject) {
    throw new Error("Invalid notification type.");
  }

  return { subject, body };
}

const transporter = nodemailer.createTransport({
  pool: true,
  service: "hotmail",
  port: 2525,
  auth: {
    user: "anuragiravi85@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
  maxConnections: 1,
});

export const sendEmail = async (
  emailContent: EmailContent,
  sendTo: string[]
) => {
  const mailOptions = {
    from: "anuragiravi85@gmail.com",
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) return console.log(error);

    console.log("Email sent: ");
  });
};
