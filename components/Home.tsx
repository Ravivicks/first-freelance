import { useGetEmail } from "@/features/email/use-get-email";
import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "./ui/button";

const Home = () => {
  const t = useTranslations("PhotoViewer");
  const { refetch, isLoading, isError, data, error } = useGetEmail();

  const handleSendEmail = () => {
    refetch();
  };

  return (
    <div>
      <Button onClick={handleSendEmail}>Send email</Button>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default Home;
