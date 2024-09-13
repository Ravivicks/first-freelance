import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  format,
  isToday,
  isYesterday,
  isThisWeek,
  isThisMonth,
  isThisYear,
  differenceInDays,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: string,
  locale: string
): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount
  );
}

export const formatNumber = (num: number = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// export function calculateGST(totalAmount: number): number {
//   const gstRate = 0.18; // 18% GST
//   const gstAmount = Number((totalAmount * gstRate).toFixed(2));
//   return gstAmount;
// }

// function calculateGST(totalAmount: number): number {
//   const gstRate = 0.18; // 18% GST
//   return totalAmount * gstRate;
// }

// function calculateShipping(totalAmount: number): number {
//   const shippingRate = 0.005; // 0.5% Shipping
//   return totalAmount * shippingRate;
// }

export function calculateTotalWithGSTAndShipping(totalAmount: number) {
  const GST_RATE = 0.18; // Example GST rate
  const SHIPPING_AMOUNT = 50; // Example shipping cost
  const DISCOUNT_RATE = 0.1; // 10% discount

  // Apply the discount
  const discountAmount = totalAmount * DISCOUNT_RATE;
  const discountedAmount = totalAmount - discountAmount;

  // Calculate GST on the discounted amount
  const gstAmount = discountedAmount * GST_RATE;
  const totalWithGST = discountedAmount + gstAmount;

  // Add shipping cost
  const totalWithGSTAndShipping = totalWithGST + SHIPPING_AMOUNT;

  return {
    discountAmount,
    gstAmount,
    shippingAmount: SHIPPING_AMOUNT,
    totalWithGSTAndShipping,
    discountedAmount, // The amount after discount but before GST and shipping
  };
}

export function generateRandomPassword(length: number = 10): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

export const formatDate = (createdAt: string | Date): string => {
  const date = new Date(createdAt); // Parse the createdAt string into a Date object

  // Check if the date is today
  if (isToday(date)) {
    return "Today";
  }

  // Check if the date is yesterday
  if (isYesterday(date)) {
    return "Yesterday";
  }

  // Check if the date is within the last 7 days
  const daysDifference = differenceInDays(new Date(), date);
  if (daysDifference <= 7) {
    return "Last week";
  }

  // Check if the date is this month
  if (isThisMonth(date)) {
    return "This month";
  }

  // Check if the date is this year
  if (isThisYear(date)) {
    return "This year";
  }

  // Otherwise, return the formatted date (MM/dd/yyyy)
  return format(date, "MM/dd/yyyy");
};
