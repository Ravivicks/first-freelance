export type PriceHistoryItem = {
  price: number;
};
export type ProductInfoItem = {
  name: string;
  value: string;
};

export type User = {
  email: string;
};

export type IProduct = {
  _id: string;
  url: string;
  currency: string;
  image: string;
  pdfFile: string;
  title: string;
  discount: string;
  brand: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  productInformationTech: ProductInfoItem[] | [];
  productInformationAdditional: ProductInfoItem[] | [];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  discountRate: number;
  description: string;
  machineCode: string;
  type: string;
  productDescription: string;
  category: string;
  reviewsCount: number;
  quantity: number;
  minQuantity: number;
  stars: number;
  isOutOfStock: Boolean;
  users?: User[];
  sliderImages?: string[] | [];
};

export type NotificationType =
  | "NEW_USER"
  | "ENQUIRY"
  | "REQUEST_FOR_PRICE"
  | "ORDER_CONFIRMATION";

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
};

export type ProductProps = {
  References: string;
  "Image Link-": string;
  "360 Image Link": string | 0;
  "Short Description": string;
  "Medium description": string;
  "Long Description": string;
  "Product Line Helios Code": string;
  "Product Line Name": string;
  Brand: string;
  EAN13: string;
  GTIN: string;
  keywords: string | 0;
  LP: number;
  PDP: string;
};

export type EnquireProps = {
  email: string;
  mobile: string;
  productName?: string;
  productId?: string;
  productPrice?: number;
  enquiryDescription: string;
  quantity?: number;
  status: "pending" | "approved" | "rejected";
  reason?: string;
  cartProduct?: {
    productName: string;
    productId: string;
    productPrice: number;
    quantity: number;
  }[];
};

export type PriceRequestProps = {
  email: string;
  mobile: string;
  productName: string;
  productId: string;
  priceDescription: string;
  quantity: number;
  status: string;
  reason: string;
};

export type IPartnerBanner = {
  image: string;
  brand: string;
};

export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type IAddress = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  country: string;
  city: string;
  state: string;
  phone: string;
  zipcode: string;
};

export interface PaymentDetails {
  method: string; // e.g., 'credit_card', 'paypal'
  status: string; // e.g., 'pending', 'completed', 'failed'
  transactionId: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CheckoutData {
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  paymentDetails: PaymentDetails;
  shippingAddress: IAddress;
  billingAddress: IAddress;
  status: string;
  orderId: string;
}

export type IPartnerBannerFile = {
  imageId: any;
  _id: string;
  title: string;
  image: File; // Use File type to represent the uploaded file
};

export type IContact = {
  _id: string;
  company: string;
  address: string;
  phone: string;
  workingHours: string;
  email: string;
};

export type IRazorOption = {
  amount: number;
  currency: string;
};

export type ISubscriber = {
  _id?: string;
  email: string;
  status: string;
};

export type IReview = {
  productId: string; // Reference to the product being reviewed
  userId: string; // Reference to the user who made the review
  rating: number; // Rating given by the user, e.g., 1-5 stars
  comment: string; // Review text
  createdAt: Date; // Date when the review was created
  updatedAt: Date; // Date when the review was last updated
  replies: IReply[]; // Array of replies to the review
};

export interface ILike {
  _id: string;
  userId: string;
  isLike: boolean;
  isUnlike: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IComment = {
  _id?: string;
  productId: string; // Reference to the product being reviewed
  userId: string;
  comment: string;
  rating: number;
  firstName?: string;
  lastName?: string;
  userAvatar?: string;
  replies?: IReply[];
  createdAt?: string;
  likes?: ILike[]; // Array of like actions
  unlikes?: ILike[]; // Array of unlike actions
};

export type IReply = {
  _id?: string;
  userId: string;
  comment: string;
  firstName?: string;
  lastName?: string;
};
