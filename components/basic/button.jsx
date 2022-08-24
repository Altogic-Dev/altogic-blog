export default function Button({ primaryColor, children, onClick }) {
  if (primaryColor) {
    return (
      <button
        onClick={onClick}
        type="button"
        className="inline-flex items-center justify-center px-[14px] py-2 text-sm font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center justify-center px-[14px] py-2 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
    >
      {children}
    </button>
  );
}
