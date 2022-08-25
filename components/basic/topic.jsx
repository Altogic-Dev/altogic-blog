export default function Topic({ url, title, onClick }) {
  return (
    <button type="button" onClick={onClick} href={url}>
      <span className="inline-flex items-center flex-shrink-0 px-2.5 py-1 rounded-full text-sm font-medium tracking-sm bg-slate-400 text-slate-50"
>
        {title}
      </span>
    </button>
  );
}
