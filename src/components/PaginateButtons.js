export default function PaginateButtons(props) {
  const {
    prevDataSet,
    nextDataSet,
    paginateStart,
    paginateLimit,
    filteredProfiles,
  } = props;
  return (
    <div>
      <button
        onClick={prevDataSet}
        disabled={paginateStart === 0}
        className="px-3 py-1 mr-4 text-white bg-blue-400 rounded-sm disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-1 ring-gray-800"
      >
        Previous
      </button>
      <button
        disabled={paginateStart + paginateLimit > filteredProfiles.length}
        onClick={nextDataSet}
        className="px-3 py-1 text-white bg-blue-400 rounded-sm disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-1 ring-gray-800"
      >
        Next
      </button>
    </div>
  );
}
