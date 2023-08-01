import { Button } from "@/app/components/Button";
import { CheckMark } from "@/assets/icons/check-mark";
import Link from "next/link";

export default function Submitted() {
  return (
    <div className="container mx-auto flex h-screen flex-wrap items-center px-5 py-24">
      <div className="mx-auto mt-10 flex w-full flex-col rounded-lg bg-gray-100 p-8 md:mt-0 md:w-1/2 lg:mr-auto lg:w-2/6">
        <CheckMark className="mx-auto mb-4 h-12 w-12 text-green-500" />
        <h2 className="text-lg text-gray-700">
          Check your email to confirm your account.
        </h2>
        <p className="my-6 text-center text-base text-gray-700">OR</p>
        <Link href="/signin">
          <Button className="w-full text-base">Go to Sign In</Button>
        </Link>
      </div>
    </div>
  );
}
