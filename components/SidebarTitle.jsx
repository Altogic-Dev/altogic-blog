export default function SidebarTitle(props) {
  return (
    <h2
      className={`text-slate-700 text-xl ${props.spacing} font-medium tracking-sm`}
    >
      {props.title}
    </h2>
  );
}
