"use client";
import Loader from "@/components/Loader";
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Component() {
  const { locale } = useParams();
  useFetchStaticData(locale as string, "tac");
  const {
    data: staticData,
    isLoading: staticLoading,
    error,
  } = useStaticDataStore();
  if (staticLoading) {
    return <Loader />;
  }
  return (
    <div className="bg-background text-foreground">
      <div className=" relative h-[300px] w-full my-4 ">
        <Image
          src="/images/term1.jpg"
          alt="term"
          fill
          className="object-fill rounded-md shadow-xl"
        />
      </div>
      <main className="container mx-auto max-w-5xl py-12 px-4 md:px-6">
        <section className="mb-8">
          <p className="mb-4">
            {staticData
              ? staticData?.termAndConditions?.paragraphs?.[0]
              : `For the purpose of these Terms and Conditions, The term "we", "us",
            "our" used anywhere on this page shall mean PROSAFE AUTOMATION,
            whose registered/operational office is B-1/13, RAGHU NAGAR, PANKHA
            ROAD, Near JANAK CINEMA,, New Delhi-110045 South West Delhi DELHI
            110045 . "you", “your”, "user", “visitor” shall mean any natural or
            legal person who is visiting our website and/or agreed to purchase
            from us.`}
          </p>
          <h2 className="font-semibold text-lg my-4">
            {staticData
              ? staticData?.termAndConditions?.heading
              : `Your use of the website and/or purchase from us are governed by
            following Terms and Conditions:`}
          </h2>
          <ul className="list-decimal mb-4 space-y-4">
            {staticData &&
              staticData?.termAndConditions?.list?.map(
                (item: any, index: number) => <li key={index}>{item}</li>
              )}
          </ul>
        </section>
      </main>
    </div>
  );
}
