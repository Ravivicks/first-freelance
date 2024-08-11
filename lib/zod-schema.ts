import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email(),
  mobile: z.string(),
  productName: z.string(),
  productId: z.string(),
  productPrice: z.number(),
  enquiryDescription: z.string(),
  quantity: z.number(),
});
