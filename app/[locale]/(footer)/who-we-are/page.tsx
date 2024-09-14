import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Globe, Cpu, Users, Zap } from "lucide-react";
import Image from "next/image";

export default function WhoWeAre() {
  return (
    <div className="container mx-auto px-2 py-8 space-y-12">
      <section className="text-center space-y-4 custom-bg py-5 rounded-md">
        <h1 className="text-4xl font-bold tracking-tight">Who We Are</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Automation eCom Global: Your forward-thinking leader in industrial
          automation, with a global footprint spanning Dubai, USA, China, India,
          and Germany.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center justify-between">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Our Global Presence</h2>
          <p className="text-muted-foreground">
            We cater to diverse industries such as manufacturing, energy,
            infrastructure, and process automation across key markets worldwide.
            Our extensive network ensures that we deliver cutting-edge,
            high-quality solutions that are both reliable and scalable.
          </p>
        </div>
        <Image
          src="/footer/hiring.png?height=400&width=600"
          alt="Global map showing Automation eCom Global's presence"
          width={600}
          height={300}
          className="rounded-lg object-cover"
        />
      </section>

      <Separator />

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Our Expertise</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Globe,
              title: "Global Reach",
              description:
                "Serving key markets in Dubai, USA, China, India, and Germany",
            },
            {
              icon: Cpu,
              title: "Premium Products",
              description:
                "Specializing in Siemens, DEIF, Schneider, and ComAp solutions",
            },
            {
              icon: Users,
              title: "Industry Knowledge",
              description:
                "Tailored solutions for manufacturing, energy, and more",
            },
            {
              icon: Zap,
              title: "Cutting-Edge Tech",
              description: "Integrating Industry 4.0 and IoT-based solutions",
            },
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6 text-center space-y-4">
                <item.icon className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">
          Our Product Range
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-2xl font-semibold">Automation Solutions</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Programmable Logic Controllers (PLCs)</li>
                <li>Human-Machine Interfaces (HMIs)</li>
                <li>Drives and Engine Controllers</li>
                <li>Power Supplies and Critical Components</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-2xl font-semibold">Featured Brands</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Siemens German-made PLCs and HMIs</li>
                <li>DEIF Engine Controllers</li>
                <li>Schneider Automation Solutions</li>
                <li>ComAp Engine Controllers</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Expertise",
              description:
                "Years of experience in industrial automation across various sectors",
            },
            {
              title: "Quality",
              description:
                "Partnerships with world-renowned brands ensuring high-quality solutions",
            },
            {
              title: "Support",
              description:
                "Comprehensive customer service and technical support worldwide",
            },
            {
              title: "Innovation",
              description:
                "Continuous integration of Industry 4.0 technologies and IoT solutions",
            },
            {
              title: "Cost-Effective",
              description:
                "Best discounts on premium products without compromising on quality",
            },
            {
              title: "Global Delivery",
              description:
                "Fast and secure product delivery to clients worldwide",
            },
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6 text-center space-y-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center space-y-4 bg-gradient-to-r from-green-100 to-blue-100 border-none shadow-lg p-8 rounded-lg">
        <h2 className="text-3xl font-semibold">
          Partner with Automation eCom Global
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          {`We're more than a supplier—we're a trusted partner dedicated to your
          operational success. Invest in a partnership that will help your
          business grow, optimize processes, and stay competitive in an
          increasingly automated world.`}
        </p>
        <Button variant="destructive">Contact Us Today</Button>
      </section>
    </div>
  );
}
