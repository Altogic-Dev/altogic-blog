export default function Topic({ url, title, onClick }) {
  return (
    <button type="button" onClick={onClick} href={url}>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium tracking-sm bg-slate-400 text-white">
        {title}
      </span>
    </button>
  );
}
