"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";
import Loader from "@/components/Loader";

export default function InstallationAssistance() {
  const { locale } = useParams();
  useFetchStaticData(locale as string, "ia");
  const { data: staticData, isLoading } = useStaticDataStore();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto md:px-4 px-1 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {staticData
          ? staticData?.installationAssistance?.title
          : `Installation Assistance`}
      </h1>

      <Card className="mb-8 custom-bg">
        <CardHeader>
          <CardTitle>
            {staticData
              ? staticData?.installationAssistance?.subTitle
              : `Expert Installation Support for Your Automation Systems`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {staticData
              ? staticData?.installationAssistance?.intro
              : ` At Automation eCom Global, we understand that successful
            installation is critical to the performance and longevity of your
            industrial automation systems. That's why we provide comprehensive
            Installation Assistance to ensure that your new PLCs, HMIs, drives,
            and engine controllers are set up and configured correctly, right
            from the start. Whether you're installing a complex Siemens PLC
            system, integrating a DEIF engine controller, or deploying a
            full-scale automation solution, our expert team is here to support
            you every step of the way.`}
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="expert-guidance" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
          {staticData?.installationAssistance?.tabs ? (
            Object?.keys(staticData?.installationAssistance?.tabs).map(
              (key) => (
                <TabsTrigger key={key} value={key}>
                  {staticData?.installationAssistance?.tabs[key].tab}
                </TabsTrigger>
              )
            )
          ) : (
            <>
              <TabsTrigger value="expert-guidance">Expert Guidance</TabsTrigger>
              <TabsTrigger value="support-options">Support Options</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
            </>
          )}
        </TabsList>
        {staticData?.installationAssistance?.tabs && staticData ? (
          Object?.entries(staticData?.installationAssistance?.tabs).map(
            ([key, tab]: [key: any, tab: any]) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardHeader>
                    <CardTitle>{tab.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{tab.content}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            )
          )
        ) : (
          <>
            <TabsContent value="expert-guidance">
              <Card>
                <CardHeader>
                  <CardTitle>
                    1. Expert Guidance from Certified Technicians
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    {`Our installation assistance services are led by a team of
                certified technicians and engineers with extensive experience in
                industrial automation systems. We specialize in the installation
                of products from leading brands such as Siemens, Schneider,
                DEIF, and ComAp, ensuring that your equipment is installed
                according to the highest industry standards.`}
                  </p>
                  <p className="mt-2">
                    {`Whether you're a seasoned technician or new to industrial
                automation, our team will provide step-by-step guidance to
                ensure a smooth and successful installation process. We tailor
                our assistance to your specific requirements, offering support
                for both simple system installations and complex,
                multi-component setups.`}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="support-options">
              <Card>
                <CardHeader>
                  <CardTitle>
                    2. On-Site and Remote Installation Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    {`At Automation eCom Global, we offer flexible installation
                support options to meet the unique needs of our global
                customers. Depending on your project scope and location, we
                provide both on-site installation assistance and remote support
                to ensure your systems are installed and configured properly.`}
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-2">
                    <li>
                      <strong>On-Site Support:</strong>{" "}
                      {`For large-scale
                  installations or critical systems that require hands-on
                  expertise, our certified technicians can travel to your
                  facility to provide direct installation support. We work with
                  your team to install, configure, and test your new equipment,
                  ensuring that all components are properly integrated and
                  functioning as expected.`}
                    </li>
                    <li>
                      <strong>Remote Support:</strong>{" "}
                      {`In many cases, installation
                  can be completed with the guidance of our expert team via
                  remote support. We provide real-time instructions and
                  troubleshooting over the phone or via video conferencing,
                  guiding you through every step of the process. Remote
                  installation support is an ideal solution for smaller projects
                  or locations where on-site assistance may not be feasible.`}
                    </li>
                  </ul>
                  <p className="mt-2">
                    {`Regardless of the method, our goal is to ensure that your
                systems are installed correctly, efficiently, and with minimal
                downtime.`}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>
                    3. Detailed Installation Manuals and Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    {`We understand that having the right documentation is key to a
                successful installation. That's why Automation eCom Global
                provides detailed installation manuals and technical guides for
                every product we offer. Whether you're installing a Siemens
                S7-1200 PLC, a Schneider HMI, or a DEIF controller, our
                resources will guide you through the installation process
                step-by-step.`}
                  </p>
                  <p className="mt-2">Our technical documentation includes:</p>
                  <ul className="list-disc list-inside mt-2 space-y-2">
                    <li>Wiring diagrams</li>
                    <li>Configuration guidelines</li>
                    <li>Software setup instructions</li>
                    <li>Best practices for optimizing performance</li>
                  </ul>
                  <p className="mt-2">
                    {`We also provide access to a library of installation videos and
                online resources that offer visual guidance, helping you
                understand the installation process more easily. Our goal is to
                empower your team with the knowledge and tools needed to
                complete the installation efficiently and confidently.`}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="configuration">
              <Card>
                <CardHeader>
                  <CardTitle>4. Configuration and Testing Assistance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    {`Installation is only the first step—proper configuration and
                testing are essential to ensure that your systems function
                correctly and meet your operational needs. At Automation eCom
                Global, we offer comprehensive configuration assistance to help
                you set up your systems according to your exact specifications.`}
                  </p>
                  <p className="mt-2">
                    {`Our team will guide you through the process of configuring PLCs,
                HMIs, drives, and other automation components to ensure that
                they are optimized for your specific applications. We also
                provide testing assistance, helping you verify that all
                components are functioning as expected before your systems go
                live.`}
                  </p>
                  <p className="mt-2">
                    {`From parameter settings to network configurations, we cover
                every aspect of the setup process to ensure that your systems
                are ready to perform at their best. If any issues arise during
                testing, our technicians are available to troubleshoot and
                resolve them promptly, minimizing any potential delays.`}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>

      {staticData ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {staticData?.installationAssistance?.additionalServices?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staticData?.installationAssistance?.additionalServices?.items?.map(
                (item: any, index: number) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold">
                      {item.split(":")[0]}
                    </h3>
                    <p>{item.split(":")[1]}</p>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Additional Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">
                  5. Customization and Integration Support
                </h3>
                <p>
                  {`Many industrial automation systems require custom configurations
                or integration with existing equipment. At Automation eCom
                Global, we offer specialized support for customized
                installations, ensuring that your new systems integrate
                seamlessly with your current infrastructure.`}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  6. Training for Your Team
                </h3>
                <p>
                  {`In addition to installation assistance, Automation eCom Global
                provides training programs to ensure that your team is fully
                equipped to operate and maintain your new automation systems. We
                offer both on-site and remote training options, depending on
                your location and needs.`}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  7. Ongoing Support After Installation
                </h3>
                <p>
                  {`Our commitment to your success doesn't end with installation. At
                Automation eCom Global, we provide ongoing technical support to
                ensure that your systems continue to perform at their best long
                after they are installed.`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {staticData ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {staticData?.installationAssistance?.whyChoose?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {staticData?.installationAssistance?.whyChoose?.items?.map(
                (item: any, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              Why Choose Automation eCom Global for Installation Assistance?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>
                {`Certified technicians: Our team of experts ensures that your
              systems are installed and configured according to the highest
              industry standards.`}
              </li>
              <li>
                {`Flexible support: We offer both on-site and remote installation
              assistance to accommodate your project needs.`}
              </li>
              <li>
                {`Comprehensive documentation: Our detailed installation manuals and
              resources guide you through every step of the process.`}
              </li>
              <li>
                {`Custom configuration support: We help you customize and integrate
              your systems for seamless operation with existing equipment.`}
              </li>
              <li>
                {`Ongoing training and support: We provide training programs to
              equip your team with the skills needed to operate and maintain
              your systems.`}
              </li>
              <li>
                {`Post-installation support: We offer continuous technical
              assistance to ensure long-term system performance and reliability.`}
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
