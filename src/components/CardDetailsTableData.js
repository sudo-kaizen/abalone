export default function CardDetailsTableData(props) {
  const { CreditCardType, CreditCardNumber } = props.profile;

  const formatCardNumber = (cardNumber) => {
    return cardNumber.split('').reduce((accum, numStr, indx) => {
      const isMultOf4 = (indx + 1) % 4 === 0 && indx !== 0;
      const newStr = isMultOf4 ? `${accum}${numStr} ` : `${accum}${numStr}`;
      return newStr;
    }, '');
  };

  return (
    <td className="hidden px-3 py-4 sm:table-cell whitespace-nowrap">
      <div className="text-sm text-gray-900">{CreditCardType}</div>
      <div className="text-sm text-gray-500">
        {formatCardNumber(CreditCardNumber)}
      </div>
    </td>
  );
}
