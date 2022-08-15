export default function Footer() {
  return (
    <footer className="bg-slate-100 px-4 lg:px-8 py-8 md:py-12 mb-[72px] lg:mb-0">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <a href="/">
          <span className="sr-only">Altogic</span>
          <img
            className="w-[114px] h-[39px] sm:w-[135px] sm:h-[46px]"
            src="./logo.svg"
            alt=""
          />
        </a>
        <span className="text-slate-400 text-xs sm:text-base tracking-sm">
          © 2022 Algotic. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
