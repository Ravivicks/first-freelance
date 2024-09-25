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
  user?: any,
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
      subject: `${
        user?.enquiryType === "serviceQuote"
          ? "Service Quatations"
          : user?.enquiryType === "priceRequest"
          ? "Price Request"
          : user?.enquiryType === "quickQuote"
          ? "Quick Quotation"
          : user?.enquiryType === "quoteRequest"
          ? "Quotation"
          : user?.enquiryType === "entireProjectQuote"
          ? "Entire Project Quotation"
          : user?.enquiryType === "cart"
          ? "Cart"
          : ""
      } Enquiry Received`,
      body: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Inquiry Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid #dddddd;
        }
        .header {
            background-color: #00b0ac;
            padding: 20px;
            text-align: center;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h1 {
            color: #002244;
            font-size: 24px;
        }
        .content p {
            font-size: 16px;
            color: #333333;
            line-height: 1.6;
        }
        .cta-button {
            display: inline-block;
            background-color: #00e0c6;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 20px;
            border-radius: 4px;
        }
        .footer {
            background-color: #002244;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 12px;
        }
        .footer a {
            color: white;
            text-decoration: none;
        }
        .social-links img {
            margin: 0 10px;
        }
    </style>
</head>
<body>

<div class="email-container">
    <!-- Header -->
    <div class="header">
        <img src="https://www.automationecom.store/Automation.png" alt="Company Logo" >
    </div>

    <!-- Content -->
    <div class="content">
        <h1>Thank You for Your Enquiry!</h1>
        <p>Dear ${user?.fullName},</p>
        <p>
            We have received your enquiry for the following products on our website. Our team is reviewing the details and will provide you with a quotation as soon as possible.
        </p>
        <p>
            If you have any questions or require more information, feel free to contact us at info@automationecom.store or +91-9990010960.
        </p>
        <a href="https://www.automationecom.store" class="cta-button" target="_blank">View Enquiry</a>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>Best regards, <br> Automation Ecom Global</p>
        <div class="social-links">
            <img src="https://www.automationecom.store/icons-social.png" alt="socials" height="40px" width="150px" />
        </div>
        <p>
            © 2024 Automation Ecom Global, B-1/13, RAGHU NAGAR, PANKHA ROAD, Near JANAK CINEMA, New Delhi-110045 <br>
            If you no longer wish to receive emails, you can <a href="#">unsubscribe here</a>.
        </p>
    </div>
</div>

</body>
</html>
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
  host: "mail.automationecom.store", // Outlook SMTP server
  port: 587, // Use port 587 for TLS (recommended)
  secure: false, // Set to true for SSL on port 465
  auth: {
    user: "info@automationecom.store",
    pass: "yv$HLG=pm{u#", // Use App Password if 2FA is enabled
  },
  maxConnections: 1,
});

export const sendEmail = async (
  emailContent: EmailContent,
  sendTo: string[]
) => {
  const mailOptions = {
    from: "info@automationecom.store",
    to: sendTo.join(","), // Join recipients with a comma
    subject: emailContent.subject,
    html: emailContent.body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
