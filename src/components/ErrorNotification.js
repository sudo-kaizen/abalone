export default function ErrorNotification() {
  return (
    <div className="flex flex-col items-center justify-center h-60">
      <div className="text-center max-w-prose">
        <span className="inline-block text-lg font-bold text-red-500">
          An error occured.
        </span>
        <span className="inline-block text-lg font-bold text-red-500">
          Please refresh the page to reload
        </span>
      </div>
    </div>
  );
}
