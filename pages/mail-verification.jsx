import Head from "next/head";

export default function Login() {
  return (
    <div>
      <Head>
        <title>Altogic Forum App Mail Verifitacion</title>
        <meta
          name="description"
          content="Altogic Forum App Mail Verification"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-screen">
        <a
          href="https://www.altogic.com/"
          className="flex fixed bottom-3 right-3 sm:bottom-8 sm:right-8 z-50"
          target="_blank"
        >
          <img src="./powered-by-altogic.svg" alt="" />
        </a>
        <div className="grid xl:grid-cols-2 h-full">
          <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-lg lg:w-[360px]">
              <div className="text-center">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6 ring-8 ring-purple-50">
                  <svg
                    className="w-7 h-7 text-purple-600"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.1406 4.66669H7.93301C5.97282 4.66669 4.99273 4.66669 4.24404 5.04816C3.58547 5.38372 3.05004 5.91915 2.71448 6.57772C2.33301 7.32641 2.33301 8.3065 2.33301 10.2667V17.7334C2.33301 19.6935 2.33301 20.6736 2.71448 21.4223C3.05004 22.0809 3.58547 22.6163 4.24404 22.9519C4.99273 23.3334 5.97282 23.3334 7.93301 23.3334H20.0663C22.0265 23.3334 23.0066 23.3334 23.7553 22.9519C24.4139 22.6163 24.9493 22.0809 25.2849 21.4223C25.6663 20.6736 25.6663 19.6935 25.6663 17.7334V11.6667M2.33301 8.16669L11.8587 14.8347C12.6301 15.3747 13.0158 15.6446 13.4353 15.7492C13.8059 15.8416 14.1935 15.8416 14.564 15.7492C14.9836 15.6446 15.3692 15.3747 16.1406 14.8347L20.0663 11.6667"
                      stroke="#6D28D9"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M22.333 8.16669C22.333 8.71897 22.7807 9.16669 23.333 9.16669C23.8853 9.16669 24.333 8.71897 24.333 8.16669H22.333ZM24.333 1.16669C24.333 0.614402 23.8853 0.166687 23.333 0.166687C22.7807 0.166687 22.333 0.614402 22.333 1.16669H24.333ZM19.833 3.66669C19.2807 3.66669 18.833 4.1144 18.833 4.66669C18.833 5.21897 19.2807 5.66669 19.833 5.66669V3.66669ZM26.833 5.66669C27.3853 5.66669 27.833 5.21897 27.833 4.66669C27.833 4.1144 27.3853 3.66669 26.833 3.66669V5.66669ZM24.333 8.16669V1.16669H22.333V8.16669H24.333ZM19.833 5.66669H26.833V3.66669H19.833V5.66669Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <h1 className="mb-4 text-3xl font-bold text-slate-800">
                  Check your email
                </h1>
                <p className="mb-6 text-base tracking-sm text-slate-500">
                  We sent a verification link to <br />{" "}
                  <span className="text-slate-700">sayhi@hithemes.io</span>
                </p>
                <p className="mb-8 text-center text-sm text-slate-500 tracking-sm">
                  Didn’t receive the email?{" "}
                  <a
                    href="/login"
                    className="font-medium text-purple-700 tracking-sm hover:text-purple-500"
                  >
                    Click to resend
                  </a>
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium tracking-sm text-slate-500"
                >
                  <svg
                    className="w-5 h-5 text-slate-500"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.3332 10H4.6665M4.6665 10L10.4998 15.8333M4.6665 10L10.4998 4.16667"
                      stroke="currentColor"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Back to login
                </a>
              </div>
            </div>
          </div>
          <div className="hidden xl:block relative">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="./login.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
