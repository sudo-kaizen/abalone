import { useEffect, useState } from 'react';
import { getRecords } from '../utils/api';
import OverlayContainer from '../components/OverlayContainer';
import './Home.css';

export default function Home(props) {
  const [profiles, setProfiles] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState(new Map());
  const [genders, setGenders] = useState(new Map());
  const [filterName, setFilterName] = useState('');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [isOverlayVisible, toggleIsOverlayVisible] = useState(false);
  const [paginateStart, setPaginateStart] = useState(0);
  const [modalProfile, setModalProfile] = useState({});
  const paginateLimit = 20;
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getRecords(signal)
      .then(({ records, size }) => {
        const mappedProfiles = records.profiles.map((profile) => {
          return {
            ...profile,
            FullName: `${profile.LastName} ${profile.FirstName}`,
            FormattedCCNumber: formatCardNumber(profile.CreditCardNumber),
          };
        });
        setPaymentMethodsSelectOptions(records.profiles);
        setGenderSelectOptions(records.profiles);
        setProfiles(mappedProfiles);
      })
      .catch((err) => {});
    return () => {
      controller.abort();
    };
  }, []);

  const setPaymentMethodsSelectOptions = (profiles) => {
    for (let profile of profiles) {
      setPaymentMethods((paymentMethods) =>
        paymentMethods.set(profile.PaymentMethod, profile.PaymentMethod)
      );
    }
  };

  const setGenderSelectOptions = (profiles) => {
    for (let profile of profiles) {
      setGenders((genders) =>
        genders.set(profile.Gender, profile.Gender)
      );
    }
  };

  const formatCardNumber = (cardNumber) => {
    return cardNumber.split('').reduce((accum, numStr, indx) => {
      const isMultOf4 = (indx + 1) % 4 === 0 && indx !== 0;
      const newStr = isMultOf4 ? `${accum}${numStr} ` : `${accum}${numStr}`;
      return newStr;
    }, '');
  };

  const toggleModal = () => {
    toggleIsOverlayVisible((isOverlayVisible) => !isOverlayVisible);
  };

  const nextDataSet = () => {
    setPaginateStart((paginateStart) => paginateStart + paginateLimit);
    document.getElementById('thead').scrollIntoView();
  };

  const prevDataSet = () => {
    setPaginateStart((paginateStart) => paginateStart - paginateLimit);
    document.getElementById('thead').scrollIntoView();

  };

  return (
    <div className=" bg-gray-50 h-full">
      <div className="py-4 mx-auto bg-gray-200">
        <div className="flex flex-col w-full text-center">
          <h1 className="mb-2 text-3xl font-medium text-gray-700 sm:text-4xl">
            Patients Transactions Records
          </h1>
        </div>
      </div>
      {profiles.length ? (
        <div className="flex flex-col mb-10">
          <div className="flex phone:mx-3 mx-4 mt-4">
            <form className="flex flex-col w-full md:flex-row md:justify-between ">
              <div className="w-full sm:pl-3 sm:max-w-xs">
                <label
                  className="text-gray-600 font-semibold text-sm tracking-wide phone:w-full"
                  htmlFor="name-filter-input"
                >
                  Filter by name
                  <input
                    onChange={(e) => setFilterName(e.target.value)}
                    type="text"
                    id="name-filter-input"
                    className=" rounded-md border-transparent flex-1 appearance-none border border-gray-300 w-full py-1 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    placeholder="Name"
                  />
                </label>
              </div>

              <div className="flex flex-nowrap justify-between sm:pr-3 ">
                <div className="sm:pl-3 md:mr-4 md:pl-0">
                  <label
                    className="text-gray-600 font-semibold text-sm tracking-wide "
                    htmlFor="payment-method-filter-input"
                  >
                    Payment method
                    <select
                      onChange={(e) => setFilterPaymentMethod(e.target.value)}
                      id="payment-method-filter-input"
                      className="block uppercase py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
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
                  </label>
                </div>
                <div>
                  <label
                    className="text-gray-600 font-semibold text-sm tracking-wide "
                    htmlFor="gender-filter-input"
                  >
                    Gender
                    <select
                      onChange={(e) => setFilterGender(e.target.value)}
                      id="gender-filter-input"
                      className="block uppercase  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      name="animals"
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
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className="overflow-x-auto phone:mx-3 mx-4 my-4">
            <div className="py-2 align-middle inline-block min-w-full sm:px-3">
              <div className="table-container shadow overflow-hidden max-h-96 overflow-y-auto border-b border-blue-100 rounded-lg rounded-b-sm">
                <table className="min-w-full ">
                  <caption className="sr-only">Transactions</caption>
                  <thead id="thead">
                    <tr className="">
                      <th
                        scope="col"
                        className="sticky top-0 bg-gray-200  phone:px-2 px-3 lg:px-4  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Bio
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 bg-gray-200  hidden sm:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Card details
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 bg-gray-200  phone:px-1 px-3 lg:px-4 py-2 phone:text-left text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Payment Method
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 bg-gray-200  hidden md:table-cell px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 bg-gray-200  text-right phone:px-2 px-3 lg:px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        View
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {profiles
                      .filter((profile) => {
                        return profile.FullName.toLowerCase().includes(
                          filterName.toLowerCase()
                        );
                      })
                      .filter((profile) => {
                        return filterPaymentMethod
                          ? profile.PaymentMethod === filterPaymentMethod
                          : profile;
                      })
                      .filter((profile) => {
                        return filterGender
                          ? profile.Gender === filterGender
                          : profile;
                      })
                      .sort((p1, p2) => {
                        if (p1.LastName > p2.LastName) {
                          return 1;
                        }
                        if (p1.LastName < p2.LastName) {
                          return -1;
                        }
                        return 0;
                      })
                      .slice(paginateStart, paginateStart + paginateLimit)
                      .map((profile) => {
                        return (
                          <tr key={profile.Email} className="hover:bg-gray-100">
                            <td className="phone:px-2 px-3 lg:px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="">
                                  <div className="text-sm font-medium text-gray-900">
                                    <span className="uppercase">
                                      {profile.LastName}
                                    </span>{' '}
                                    <span>{profile.FirstName}</span>
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {profile.Gender}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="hidden sm:table-cell px-3 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {profile.CreditCardType}
                              </div>
                              <div className="text-sm text-gray-500">
                                {profile.FormattedCCNumber}
                              </div>
                            </td>
                            <td className="phone:px-1 lg:px-4 py-4 whitespace-nowrap phone:text-left text-center">
                              <div className="text-sm text-gray-900 uppercase">
                                {profile.PaymentMethod}
                              </div>
                            </td>
                            <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {profile.PhoneNumber}
                              </div>
                              <div className="text-sm text-gray-500">
                                {profile.Email}
                              </div>
                            </td>
                            <td className="phone:px-2 px-3 lg:px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={(e) => {
                                  setModalProfile(profile);
                                  toggleModal();
                                }}
                                className="rounded-sm px-3 py-1 bg-blue-400 text-white focus:outline-none focus:ring-1 ring-gray-800"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mx-4">
            <div className="px-3 flex justify-center">
              <div>
                <button
                  onClick={prevDataSet}
                  disabled={paginateStart === 0}
                  className="disabled:cursor-not-allowed  disabled:opacity-50 rounded-sm px-3 mr-4 py-1 bg-blue-400 text-white focus:outline-none focus:ring-1 ring-gray-800"
                >
                  Previous
                </button>
                <button
                  disabled={paginateStart + paginateLimit > profiles.length}
                  onClick={nextDataSet}
                  className="disabled:cursor-not-allowed  disabled:opacity-50 rounded-sm px-3 py-1 bg-blue-400 text-white focus:outline-none focus:ring-1 ring-gray-800"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
      {isOverlayVisible ? (
        <OverlayContainer>
          <div
            className="dialog phone:min-w-full bg-white rounded-md shadow-xl overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <span id="modal-headline" className="sr-only">
              Client details
            </span>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex flex-col sm:items-start">
                <section className="mt-2 phone:ml-2 sm:ml-4 text-left">
                  <header className="uppercase inline-block px-2 text-xs mb-2 bg-gray-200 text-gray-500 rounded-md tracking-wide py-1">
                    Bio
                  </header>
                  <dl className="flex">
                    <dt className="mr-2">Full name:</dt>
                    <dd className="text-xl text-left leading-6 text-gray-700">
                      <span className="uppercase inline-block mr-2">
                        {modalProfile.LastName}
                      </span>
                      <span className="mr-2">{modalProfile.FirstName}</span>
                    </dd>
                  </dl>
                  <dl className="flex">
                    <dt className="mr-2">Gender:</dt>
                    <dd className="text-gray-700">{modalProfile.Gender}</dd>
                  </dl>
                </section>
                <section className="mt-2 phone:ml-2 sm:ml-4 text-left">
                  <header className="uppercase inline-block px-2 text-xs mb-2 bg-gray-200 text-gray-500 rounded-md tracking-wide py-1">
                    Login
                  </header>
                  <dl className="flex">
                    <dt className="mr-2">Username:</dt>
                    <dd className="text-gray-700">{modalProfile.UserName}</dd>
                  </dl>
                  <dl className="flex">
                    <dt className="mr-2">Last login:</dt>
                    <dd className="text-gray-700">{modalProfile.LastLogin}</dd>
                  </dl>
                </section>
                <section className="mt-2 phone:ml-2 sm:ml-4 text-left">
                  <header className="uppercase inline-block px-2 text-xs mb-2 bg-gray-200 text-gray-500 rounded-md tracking-wide py-1">
                    Payment details
                  </header>
                  <dl className="flex">
                    <dt className="mr-2">Paid using:</dt>
                    <dd className="text-gray-700 uppercase">
                      {modalProfile.PaymentMethod}
                    </dd>
                  </dl>
                  <dl className="flex">
                    <dt className="mr-2">Card type:</dt>
                    <dd className="text-gray-700 capitalize">
                      {modalProfile.CreditCardType}
                    </dd>
                  </dl>
                  <dl className="flex">
                    <dt className="mr-2">Card number:</dt>
                    <dd className="text-gray-700 uppercase">
                      {modalProfile.FormattedCCNumber}
                    </dd>
                  </dl>
                </section>
                <section className="mt-2 phone:ml-2 sm:ml-4 text-left">
                  <header className="uppercase inline-block px-2 text-xs mb-2 bg-gray-200 text-gray-500 rounded-md tracking-wide py-1">
                    Contact
                  </header>
                  <dl className="flex">
                    <dt className="mr-2">Email:</dt>
                    <dd className="text-gray-700 ">
                      {modalProfile.Email}
                    </dd>
                  </dl>
                  <dl className="flex">
                    <dt className="mr-2">Phone:</dt>
                    <dd className="text-gray-700">
                      {modalProfile.PhoneNumber}
                    </dd>
                  </dl>
                  <dl className="flex">
                    <dt className="mr-2">Domain name:</dt>
                    <dd className="text-blue-700">
                      <a
                        className="hover:underline"
                        href={`http://${modalProfile.DomainName}`}
                      >
                        {' '}
                        {modalProfile.DomainName}
                      </a>
                    </dd>
                  </dl>
                </section>
                <section className="mt-2 phone:ml-2 sm:ml-4 text-left">
                  <header className="uppercase inline-block px-2 text-xs mb-2 bg-gray-200 text-gray-500 rounded-md tracking-wide py-1">
                    Device
                  </header>
                  <dl className="flex">
                    <dt className="mr-2">MAC Address:</dt>
                    <dd className="text-gray-700">{modalProfile.MacAddress}</dd>
                  </dl>
                  <dl className="flex">
                    <dt className="mr-2">Location:</dt>
                    <dd className="text-gray-700">
                      <span className="mr-1">
                        {modalProfile.Longitude}&#176;,
                      </span>{' '}
                      <span className="">{modalProfile.Latitude}&#176; </span>
                    </dd>
                  </dl>
                  <dl className="flex">
                    <dt className="mr-2">URL:</dt>
                    <dd className="text-blue-700">
                      <a
                        className="hover:underline"
                        href={`http://${modalProfile.URL}`}
                      >
                        {' '}
                        {modalProfile.URL}
                      </a>
                    </dd>
                  </dl>
                </section>
                <div className="w-full my-4">
                  <button onClick={toggleModal} className="px-6 py-2 bg-red-400 rounded-md text-white text-xl">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </OverlayContainer>
      ) : null}
    </div>
  );
}
