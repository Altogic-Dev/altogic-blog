export default function SidebarTitle({ spacing, title }) {
  return (
    <h2 className={`text-slate-700 text-xl ${spacing} font-medium tracking-sm`}>
      {title}
    </h2>
  );
}
