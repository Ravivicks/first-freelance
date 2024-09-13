import { z } from "zod";

const ACCEPTED_FILE_TYPES = ["file/xlsx", "file/xls"];

export const formSchema = z.object({
  email: z.string().email(),
  mobile: z.string(),
  productName: z.string(),
  productId: z.string(),
  productPrice: z.number(),
  enquiryDescription: z.string(),
  quantity: z.number(),
  status: z.enum(["pending", "approved", "rejected"]),
  reason: z.string().optional(),
  cartProduct: z
    .array(
      z.object({
        productName: z.string(),
        productId: z.string(),
        productPrice: z.number(),
        quantity: z.number(),
      })
    )
    .optional()
    .default([]), // Ensuring it's an empty array if not provided
});

export const requestPriceFormSchema = z.object({
  email: z.string().email(),
  mobile: z.string(),
  productName: z.string(),
  productId: z.string(),
  priceDescription: z.string(),
  quantity: z.number(),
  status: z.string(),
  reason: z.string(),
});
export const formBannerSchema = z.object({
  image: z.string(),
  brand: z.string(),
});

export const formAddressSchema = z.object({
  _id: z.string(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z
    .string()
    .min(10, { message: "Mobile number must be at least 10 digits long" })
    .max(15, { message: "Mobile number can't exceed 15 digits" })
    .regex(/^\d+$/, { message: "Mobile number must contain only numbers" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(1, { message: "Address is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  zipcode: z
    .string()
    .min(5, { message: "Zipcode must be at least 5 digits long" })
    .max(10, { message: "Zipcode can't exceed 10 digits" })
    .regex(/^\d+$/, { message: "Zipcode must contain only numbers" }),
});

export const FileFormSchema = z.object({
  file: z.instanceof(File).refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file.type);
  }, "File must be xlsx, xls"),
});

export const CommentSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
  productId: z.string().nonempty("Product ID is required"),
  rating: z.number(),
  comment: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  userAvatar: z.string(),
});
export const ReplySchema = z.object({
  userId: z.string().nonempty("User ID is required"),
  rating: z.number(),
  comment: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});
