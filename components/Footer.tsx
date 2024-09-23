"use client";
import React, { useState } from "react";
import { Bot, Building2, HandCoins, Shield, Truck } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { useMessages, useTranslations } from "next-intl";
import { useCreateSubscriber } from "@/features/subscriber/use-add-subcriber";

const Footer = () => {
  const [email, setEmail] = useState("");
  const subscriberMutation = useCreateSubscriber();

  const t = useTranslations("footer");
  const messages = useMessages() as Record<string, any>; // Type assertion here
  const footerKeys = Object.keys(messages.footer || {}).filter(
    (key) => key !== "newsletter" && key !== "bottomText"
  );

  const handleNewsletter = () => {
    subscriberMutation.mutate(
      { email, status: "New" },
      {
        onSuccess: () => setEmail(""),
      }
    );
  };

  return (
    <footer>
      {/* Newsletter Section */}
      <div className="bg-gray-50 w-full py-4 flex items-center justify-center rounded-b-sm border">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <p className="font-semibold text-black">{t("newsletter.title")}</p>
          <Input
            className="w-full md:w-[300px]"
            placeholder={t("newsletter.placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="destructive"
            className="text-center"
            onClick={handleNewsletter}
            disabled={subscriberMutation.isPending || !email}
          >
            {t("newsletter.subscribeButton")}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-6 my-6 flex flex-col md:flex-row gap-6">
        {footerKeys.map((key) => (
          <div className="flex-1" key={key}>
            <h1 className="text-lg font-bold mb-3 flex gap-2">
              {key === "company" && <Building2 className="text-destructive" />}
              {key === "trust" && <Shield className="text-destructive" />}
              {key === "customerCare" && <Bot className="text-destructive" />}
              {key === "paymentMethod" && (
                <HandCoins className="text-destructive" />
              )}
              {key === "shippingMethod" && (
                <Truck className="text-destructive" />
              )}
              {t(`${key}.title`)}
            </h1>
            <div className="flex flex-col gap-2">
              {key === "company" &&
                messages.footer.company.links.map(
                  (link: any, index: number) => (
                    <Link href={link.url} key={index}>
                      {link.text}
                    </Link>
                  )
                )}
              {key === "trust" &&
                messages.footer.trust.links.map((link: any, index: number) => (
                  <Link href={link.url} key={index}>
                    {link.text}
                  </Link>
                ))}
              {key === "customerCare" &&
                messages.footer.customerCare.navItems.map(
                  (link: any, index: number) => (
                    <Link href={link.url} key={index}>
                      {link.text}
                    </Link>
                  )
                )}
              {key === "paymentMethod" && (
                <>
                  <Image
                    src={messages.footer.paymentMethod.image}
                    alt={t("paymentMethod.alt")}
                    width={250}
                    height={200}
                    loading="lazy"
                  />
                  {messages.footer.paymentMethod.methods.map(
                    (method: string, index: number) => (
                      <p key={index}>{method}</p>
                    )
                  )}
                </>
              )}
              {key === "shippingMethod" &&
                messages.footer.shippingMethod.providers.map(
                  (provider: any, index: number) => (
                    <div className="flex items-center gap-2" key={index}>
                      <Image
                        src={provider.logo}
                        alt={provider.name}
                        width={100}
                        height={100}
                        loading="lazy"
                      />
                      <p>{provider.name}</p>
                    </div>
                  )
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Bottom */}
      <div className="p-3 bg-gray-50 rounded-t-sm border">
        <p className="text-xs">© {t("bottomText")}</p>
      </div>
    </footer>
  );
};

export default Footer;
