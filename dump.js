{/* <label
  className="text-sm font-semibold tracking-wide text-gray-600 "
  htmlFor="payment-method-filter-input"
>
  Payment method
  <select
    onChange={(e) => setFilterPaymentMethod(e.target.value)}
    id="payment-method-filter-input"
    className="block px-3 py-2 uppercase bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
    name="payment-method-filter-input"
  >
    <option value="">All</option>
    {Array.from(paymentMethods.values())
      .sort()
      .map((paymentMethod) => (
        <option
          key={paymentMethod}
          className="uppercase"
          value={paymentMethod}
        >
          {paymentMethod}
        </option>
      ))}
  </select>
</label> */}

{/* <label
  className="text-sm font-semibold tracking-wide text-gray-600 "
  htmlFor="gender-filter-input"
>
  Gender
  <select
    onChange={(e) => setFilterGender(e.target.value)}
    id="gender-filter-input"
    className="block px-3 py-2 uppercase bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
    name="gender"
  >
    <option value="">All</option>
    {Array.from(genders.values())
      .sort()
      .map((gender) => (
        <option key={gender} value={gender}>
          {gender}
        </option>
      ))}
  </select>
</label> */}