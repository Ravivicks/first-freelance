import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center w-full justify-center my-16">
      <SignIn />;
    </div>
  );
}
