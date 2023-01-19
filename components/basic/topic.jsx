import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Topic({ title, className }) {
  const router = useRouter();
  if (!router.asPath.includes(`/tag/${title?.replace(' ', '-')}`))
    return (
      <Link href={`/tag/${title.replace(' ', '-')}`}>
        <a>
          <span
            className={`${
              className ||
              'inline-flex items-center flex-shrink-0 px-2.5 py-1 rounded-full text-sm font-medium tracking-sm bg-slate-400 text-slate-50'
            }`}
          >
            {title}
          </span>
        </a>
      </Link>
    );
  return (
    <span
      className={`${
        className ||
        'inline-flex items-center flex-shrink-0 px-2.5 py-1 rounded-full text-sm font-medium tracking-sm bg-purple-500 text-slate-50'
      }`}
    >
      {title}
    </span>
  );
}
