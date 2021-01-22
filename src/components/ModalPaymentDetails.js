export default function ModalPaymentDetails(props) {
  const {
    PaymentMethod,
    CreditCardType,
    CreditCardNumber,
  } = props.modalProfile;

  const formatCardNumber = (cardNumber) => {
    return cardNumber.split('').reduce((accum, numStr, indx) => {
      const isMultOf4 = (indx + 1) % 4 === 0 && indx !== 0;
      const newStr = isMultOf4 ? `${accum}${numStr} ` : `${accum}${numStr}`;
      return newStr;
    }, '');
  };

  return (
    <section className="mt-2 text-left phone:ml-2 sm:ml-4">
      <header className="inline-block px-2 py-1 mb-2 text-xs tracking-wide text-gray-500 uppercase bg-gray-200 rounded-md">
        Payment details
      </header>
      <dl className="flex">
        <dt className="mr-2">Paid using:</dt>
        <dd className="text-gray-700 uppercase">{PaymentMethod}</dd>
      </dl>
      <dl className="flex">
        <dt className="mr-2">Card type:</dt>
        <dd className="text-gray-700 capitalize">{CreditCardType}</dd>
      </dl>
      <dl className="flex">
        <dt className="mr-2">Card number:</dt>
        <dd className="text-gray-700 uppercase">
          {formatCardNumber(CreditCardNumber)}
        </dd>
      </dl>
    </section>
  );
}
