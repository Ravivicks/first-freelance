import Image from "next/image";

export default function Component() {
  return (
    <div className="bg-background text-foreground">
      <div className=" relative h-[300px] w-full my-4 ">
        <Image
          src="/images/privacy-policy-banner.jpg"
          alt="term"
          fill
          className="object-fill rounded-xl shadow-xl"
        />
      </div>
      <div className="container mx-auto px-4 md:px-6 max-w-5xl py-12 md:py-16">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect personal information that you provide to us, such as
              your name, email address, shipping address, and payment
              information when you make a purchase on our website. We also
              collect information about your browsing and shopping behavior,
              such as the products you view, the items you add to your cart, and
              the purchases you make.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground">
              We use your personal information to process your orders, send you
              order confirmations and updates, and to provide customer support.
              We also use your information to personalize your shopping
              experience and to send you marketing communications about our
              products and services, unless you have opted out of receiving such
              communications.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">
              How We Protect Your Information
            </h2>
            <p className="text-muted-foreground">
              We take the security of your personal information seriously and
              have implemented various security measures to protect it,
              including encryption of your payment information and limiting
              access to your data to only those employees who need it to perform
              their job duties. We also regularly review and update our security
              practices to ensure they remain effective.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, correct, or delete the personal
              information we have about you. You can also opt out of receiving
              marketing communications from us at any time. If you have any
              questions or concerns about our privacy practices, please contact
              us at privacy@example.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
