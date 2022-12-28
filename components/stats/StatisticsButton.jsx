import Button from '@/components/basic/button';

export default function StatisticsButton({
  text,
  onClick,
  first,
  last,
  selected,
}) {
  return (
    <Button
      onClick={onClick}
      className={`relative flex items-center justify-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium tracking-sm text-slate-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500${
        first ? ' rounded-l-md' : ''
      } ${last ? ' rounded-r-md' : ''} ${selected ? 'bg-purple-700 text-white ': ''} `}
    >
      {text}
    </Button>
  );
}
