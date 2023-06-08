import Link from "next/link";
import { Logo } from "../components/Logo";
import { PATHS } from "../paths";
import { Button } from "../components/Button";

export default function Login() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container h-screen px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col lg:mr-auto w-full mt-10 md:mt-0 mx-auto">
          <div className="flex justify-center items-center mb-6">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Sign Up
          </h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <Button>Sign up</Button>
          <p className="text-xs text-gray-500 mt-3">
            Already have an account?{" "}
            <Link href={PATHS.SIGNIN} className="text-red-600">
              Sign in
            </Link>
          </p>
        </div>
        <div className="hidden lg:block lg:w-3/5 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Lorem ipsum
          </h1>
          <p className="leading-relaxed mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            placerat dapibus quam non pulvinar. Integer nisl lorem, varius et
            enim sed, facilisis condimentum leo. Praesent ultricies ullamcorper
            nisi eu pellentesque. Vestibulum magna velit, lacinia nec dapibus
            tincidunt, varius et augue.
          </p>
        </div>
      </div>
    </section>
  );
}
