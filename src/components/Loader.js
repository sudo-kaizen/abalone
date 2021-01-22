export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-60">
      <div className="w-20 h-20 lds-ripple">
        <div className="border-4 border-blue-500 rounded-full"></div>
        <div className="border-4 border-yellow-500 rounded-full"></div>
      </div>
      <span className="inline-block text-lg font-bold">
        Loading profiles...
      </span>
    </div>
  );
}
