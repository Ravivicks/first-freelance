import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-20 lg:py-24 bg-[url('/images/bg-con.jpg?height=200&width=1600')] h-[300px] bg-cover bg-center my-4 rounded-2xl">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Get in Touch
            </h1>
            <p className="text-gray-300 md:text-xl ">
              Have a question or need help? Fill out the form below and our team
              will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-6 border p-5 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Contact Us
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@acme.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="(123) 456-7890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="How can we help you?"
                />
              </div>
              <Button type="submit" className="bg-destructive">
                Send Message
              </Button>
            </form>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <LocateIcon className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">PROSAFE AUTOMATION.</p>
                  <p className="text-muted-foreground">
                    B-1/13, RAGHU NAGAR, PANKHA ROAD, Near JANAK CINEMA, South
                    West Delhi-110045
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <PhoneIcon className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">+91-9560796132 </p>
                  <p className="text-muted-foreground">Mon-Sat, 9am-8pm</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MailIcon className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">sales@prosafeautomation.com</p>
                  <p className="text-muted-foreground">
                    We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function LocateIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
