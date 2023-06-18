import { Button } from "@/app/components/Button";
import { CheckMark } from "@/assets/icons/check-mark";
import Link from "next/link";

export default function Submitted() {
  return (
    <div className="container h-screen px-5 py-24 mx-auto flex flex-wrap items-center">
      <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col lg:mr-auto w-full mt-10 md:mt-0 mx-auto">
        <CheckMark className="w-12 h-12 text-green-500 mb-4 mx-auto" />
        <h2 className="text-lg text-gray-700">
          Check your email to confirm your account.
        </h2>
        <p className="text-center text-base my-6 text-gray-700">OR</p>
        <Link href="/signin">
          <Button className="text-base w-full">Go to Sign In</Button>
        </Link>
      </div>
    </div>
  );
}
