import { useTranslations } from "next-intl";
import React from "react";

const Home = () => {
  const t = useTranslations("PhotoViewer");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default Home;
