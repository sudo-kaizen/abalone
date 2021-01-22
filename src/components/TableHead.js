export default function TableHead() {
  return (
    <>
      <caption className="sr-only">Transactions</caption>
      <thead id="thead">
        <tr className="">
          <th
            scope="col"
            className="sticky top-0 px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-200 phone:px-2 lg:px-4"
          >
            Bio
          </th>
          <th
            scope="col"
            className="sticky top-0 hidden px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-200 sm:table-cell"
          >
            Card details
          </th>
          <th
            scope="col"
            className="sticky top-0 px-3 py-2 text-xs font-medium tracking-wider text-center text-gray-500 uppercase bg-gray-200 phone:px-1 lg:px-4 phone:text-left"
          >
            Payment Method
          </th>
          <th
            scope="col"
            className="sticky top-0 hidden px-3 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-200 md:table-cell"
          >
            Contact
          </th>
          <th
            scope="col"
            className="sticky top-0 px-3 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase bg-gray-200 phone:px-2 lg:px-4"
          >
            View
          </th>
        </tr>
      </thead>
    </>
  );
}
