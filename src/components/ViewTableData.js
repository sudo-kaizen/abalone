export default function ViewTableData(props) {
  const { profile, openProfileModal } = props;
  return (
    <td className="px-3 py-4 text-sm font-medium text-right phone:px-2 lg:px-4 whitespace-nowrap">
      <button
        onClick={(e) => openProfileModal(profile)}
        className="px-3 py-1 text-white bg-blue-400 rounded-sm focus:outline-none focus:ring-1 ring-gray-800"
      >
        View
      </button>
    </td>
  );
}
