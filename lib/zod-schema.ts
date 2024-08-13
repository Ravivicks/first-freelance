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
});
export const formBannerSchema = z.object({
  image: z.string(),
  brand: z.string(),
});

export const FileFormSchema = z.object({
  file: z.instanceof(File).refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file.type);
  }, "File must be xlsx, xls"),
});
