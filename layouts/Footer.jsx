import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <ul
        className="hidden lg:flex flex-wrap items-center text-xs mt-3 text-gray-500 "
        style={{ listStyle: 'none' }}
      >
        <li className="pr-2 pt-2">
          <Link href="/privacy">Privacy</Link>
        </li>
        <li className="pr-2 pt-2">
          <Link href="/terms">Terms</Link>
        </li>
        <li className="pr-2 pt-2">
          <Link href="https://www.altogic.com">Altogic</Link>
        </li>
      </ul>
    </footer>
  );
}
