export default function BioTableData(props) {
  const { LastName, FirstName, Gender } = props.profile;
  return (
    <td className="px-3 py-4 phone:px-2 lg:px-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="">
          <div className="text-sm font-medium text-gray-900">
            <span className="uppercase">{LastName}</span>{' '}
            <span>{FirstName}</span>
          </div>
          <div className="text-sm text-gray-500">{Gender}</div>
        </div>
      </div>
    </td>
  );
}
