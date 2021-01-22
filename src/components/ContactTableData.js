export default function ContactTableData(props) {
  const { PhoneNumber, Email } = props.profile;
  return (
    <td className="hidden px-3 py-4 md:table-cell whitespace-nowrap">
      <div className="text-sm text-gray-900">{PhoneNumber}</div>
      <div className="text-sm text-gray-500">{Email}</div>
    </td>
  );
}
