export default function PaymentMethodTableData(props) {
  const { PaymentMethod } = props.profile;
  return (
    <td className="py-4 text-center phone:px-1 lg:px-4 whitespace-nowrap phone:text-left">
      <div className="text-sm text-gray-900 uppercase">{PaymentMethod}</div>
    </td>
  );
}
