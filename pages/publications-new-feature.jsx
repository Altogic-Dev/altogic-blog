import Head from "next/head";
import Layout from "../components/Layout";
import Sections from "../components/Sections";

export default function PublicationsNewFeature() {
  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publications New Feature</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications New Feature"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
          <div className="flex flex-col gap-4 mt-8 mb-[80px] md:mt-[60px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
              <h1 className="text-slate-700 mb-8 md:mb-0 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                New feature page
              </h1>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div>
            <form action="" className="mb-24">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-slate-700 mb-3 text-lg"
                  >
                    Title*
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Type a title for your feature page"
                      className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="link"
                    className="block text-slate-700 mb-3 text-lg"
                  >
                    Link*
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="link"
                      id="link"
                      placeholder="Type a custom link for your feature page"
                      className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                    <p className="mt-1.5 text-sm text-slate-500">
                      Link: algotic.com/hithemes/...
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-slate-700 mb-3 text-lg"
                  >
                    Description*
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Type a short description"
                      className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                    <p className="mt-1.5 text-sm text-slate-500">
                      The description is used on search engine results pages.
                      Good descriptions summarize the page and are about 160
                      characters long.
                    </p>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 items-end gap-8">
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-slate-700 mb-3 text-lg"
                    >
                      Header logo*
                    </label>
                    <p className="text-slate-500 text-sm">
                      This image replaces the title at the top of your feature
                      page. It should be at least 1200px wide and 350px tall.
                      <br />
                      <br />
                      Use SVG, PNG, JPG or GIF
                    </p>
                  </div>
                  <div className="flex items-center justify-center max-w-[280px] max-h-[104px] py-4 px-6 border border-gray-300 rounded-md">
                    <div className="text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-gray-100 ring-8 ring-gray-50">
                        <svg
                          className="w-5 h-5 text-slate-700"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.5 21V16M3.5 6V1M1 3.5H6M1 18.5H6M12 2L10.2658 6.50886C9.98381 7.24209 9.84281 7.60871 9.62353 7.91709C9.42919 8.1904 9.1904 8.42919 8.91709 8.62353C8.60871 8.8428 8.24209 8.98381 7.50886 9.26582L3 11L7.50886 12.7342C8.24209 13.0162 8.60871 13.1572 8.91709 13.3765C9.1904 13.5708 9.42919 13.8096 9.62353 14.0829C9.84281 14.3913 9.98381 14.7579 10.2658 15.4911L12 20L13.7342 15.4911C14.0162 14.7579 14.1572 14.3913 14.3765 14.0829C14.5708 13.8096 14.8096 13.5708 15.0829 13.3765C15.3913 13.1572 15.7579 13.0162 16.4911 12.7342L21 11L16.4911 9.26582C15.7579 8.98381 15.3913 8.8428 15.0829 8.62353C14.8096 8.42919 14.5708 8.1904 14.3765 7.91709C14.1572 7.60871 14.0162 7.24209 13.7342 6.50886L12 2Z"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-purple-700 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                        >
                          <span>Click to upload</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="text-slate-600 pl-1">or drag and drop</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="mb-20">
          <div className="relative max-w-screen-xl mx-auto mb-6">
            <div
              className="absolute inset-0 flex items-center px-4 lg:px-8"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-[14px] py-2 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <svg
                  className="w-5 h-5 text-slate-500"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8346 4.16667C10.8346 3.70643 10.4615 3.33333 10.0013 3.33333C9.54106 3.33333 9.16797 3.70643 9.16797 4.16667H10.8346ZM9.16797 15.8333C9.16797 16.2936 9.54106 16.6667 10.0013 16.6667C10.4615 16.6667 10.8346 16.2936 10.8346 15.8333H9.16797ZM4.16797 9.16667C3.70773 9.16667 3.33464 9.53976 3.33464 10C3.33464 10.4602 3.70773 10.8333 4.16797 10.8333V9.16667ZM15.8346 10.8333C16.2949 10.8333 16.668 10.4602 16.668 10C16.668 9.53976 16.2949 9.16667 15.8346 9.16667V10.8333ZM9.16797 4.16667V15.8333H10.8346V4.16667H9.16797ZM4.16797 10.8333H15.8346V9.16667H4.16797V10.8333Z"
                    fill="#64748B"
                  />
                </svg>
                Add Section
              </button>
            </div>
          </div>
          <div>
            <Sections />
          </div>
        </div>
      </Layout>
    </div>
  );
}
