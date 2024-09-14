"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Wrench,
  PhoneCall,
  Globe,
  BookOpen,
  Package,
  Repeat,
  ShieldCheck,
  MessageSquare,
  Clock,
  Users,
  FileText,
  Zap,
  Settings,
  HeartHandshake,
  ChevronRight,
} from "lucide-react";

export default function HelpAndSupport() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const supportServices = [
    {
      id: "technical-assistance",
      icon: Wrench,
      title: "Technical Assistance",
      shortDesc:
        "Expert guidance on installation, configuration, and troubleshooting",
      content:
        "Our team of seasoned professionals provides expert guidance on installation, configuration, and troubleshooting for all our automation products. Whether you're dealing with Siemens PLCs, DEIF engine controllers, or ComAp solutions, we're here to help you every step of the way.",
    },
    {
      id: "pre-sales",
      icon: PhoneCall,
      title: "Pre-Sales Consultation",
      shortDesc: "Personalized recommendations for your automation needs",
      content:
        "Get personalized recommendations and insights to help you choose the right automation solutions for your specific needs. Our experts will assess your operational requirements, budget constraints, and long-term goals to recommend the best products from our partner brands such as Siemens, Schneider, and ComAp.",
    },
    {
      id: "global-support",
      icon: Globe,
      title: "24/7 Global Support",
      shortDesc: "Round-the-clock assistance worldwide",
      content:
        "Access round-the-clock assistance from our strategically located support teams, no matter where you are in the world. Our global presence, with operations in Dubai, USA, China, India, and Germany, allows us to provide localized support while maintaining the same high level of service across all regions.",
    },
    {
      id: "installation-training",
      icon: Settings,
      title: "Installation & Training",
      shortDesc: "Comprehensive setup support and skill development",
      content:
        "Receive comprehensive installation support and tailored training programs to empower your team with the necessary skills. We work closely with your engineers and technicians to guide them through the setup process and offer hands-on training for everything from PLC programming to engine controller operation.",
    },
    {
      id: "documentation",
      icon: FileText,
      title: "Product Documentation",
      shortDesc: "Extensive library of guides and resources",
      content:
        "Access our extensive library of user manuals, technical guides, and up-to-date resources for all our products. We regularly update our knowledge base with the latest product releases, firmware updates, and industry best practices to help you get the most out of your automation solutions.",
    },
    {
      id: "support-packages",
      icon: Package,
      title: "Tailored Support Packages",
      shortDesc: "Flexible plans to meet your specific needs",
      content:
        "Choose from flexible support plans designed to meet your specific operational requirements and priorities. Whether you need ongoing remote monitoring, regular maintenance visits, or an on-demand technical support service, we offer customized packages to ensure you get the exact level of support you need.",
    },
    {
      id: "after-sales",
      icon: ShieldCheck,
      title: "After-Sales & Warranty",
      shortDesc: "Ongoing support and product guarantees",
      content:
        "Enjoy comprehensive after-sales support and warranty services to ensure long-term system performance. We offer warranty support for all products purchased from us, including Siemens, DEIF, Schneider, and ComAp solutions, and provide system health checks and performance assessments to maximize efficiency and longevity.",
    },
    {
      id: "feedback",
      icon: MessageSquare,
      title: "Customer Feedback",
      shortDesc: "Continuous improvement based on your input",
      content:
        "We value your input and continuously improve our services based on customer feedback and satisfaction evaluations. Your feedback helps us enhance our support services and ensure that we are always meeting your evolving needs in the fast-paced world of industrial automation.",
    },
  ];

  const faqItems = [
    {
      question: "What types of technical support do you offer?",
      answer:
        "We offer comprehensive technical support including installation assistance, configuration help, troubleshooting, software support, and system optimization for all our automation products from brands like Siemens, DEIF, Schneider, and ComAp.",
    },
    {
      question: "How can I access 24/7 support?",
      answer:
        "Our 24/7 global support is available via phone, email, and our online support portal. Contact details are provided upon purchase, and you can find them in your account dashboard or on our contact page.",
    },
    {
      question: "Do you offer on-site support?",
      answer:
        "Yes, we offer on-site support as part of our tailored support packages. This can include installation assistance, system health checks, and hands-on training for your team.",
    },
    {
      question: "What does the warranty cover?",
      answer:
        "Our warranty covers manufacturing defects and malfunctions under normal use for a specified period. The exact coverage and duration may vary by product. Please refer to the warranty information provided with your purchase or contact our support team for details.",
    },
    {
      question: "How can I schedule a training session for my team?",
      answer:
        "You can schedule a training session by contacting our customer support team. We offer both standard and customized training programs tailored to your team's needs and the specific products you're using.",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-16">
        <section className="text-center custom-bg py-4 space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text">
            Help & Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive assistance to ensure your success with our industrial
            automation solutions.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Our Support Services
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportServices.map((service) => (
              <Card
                key={service.id}
                className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <service.icon className="w-8 h-8 mr-3 text-primary" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.shortDesc}</p>
                  {expandedService === service.id ? (
                    <div className="mt-4">
                      <p>{service.content}</p>
                      <Button
                        variant="link"
                        onClick={() => setExpandedService(null)}
                        className="mt-2 p-0"
                      >
                        Read Less
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="link"
                      onClick={() => setExpandedService(service.id)}
                      className="p-0"
                    >
                      Read More <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">
                Why Choose Our Support?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>24/7 availability</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Expert technical assistance</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Comprehensive documentation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Tailored support packages</span>
              </div>
              <div className="flex items-center space-x-2">
                <HeartHandshake className="w-5 h-5 text-primary" />
                <span>Customer-centric approach</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <section className="text-center space-y-6 bg-card/50 backdrop-blur-sm p-8 rounded-lg">
          <h2 className="text-3xl font-semibold">Need Assistance?</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {`Our support team is ready to help you with any questions or issues
            you may have. Don't hesitate to reach out for prompt and expert
            assistance.`}
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="destructive">
              Contact Support
            </Button>
            <Button size="lg" variant="outline">
              View Knowledge Base
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
