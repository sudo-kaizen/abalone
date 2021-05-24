import React, { useEffect, useState } from 'react';
import './Home.css';
import {
  Header,
  OverlayContainer,
  TableHead,
  BioTableData,
  CardDetailsTableData,
  PaginateButtons,
  ViewTableData,
  ContactTableData,
  TextInputFilter,
  PaymentMethodTableData,
  ProfileModal,
  Loader,
  ErrorNotification,
} from '../components';
import { useDropdown } from '../hooks';

let apiBaseUrl;
if (process.env.NODE_ENV === 'development') {
  apiBaseUrl = 'http://localhost:3001';
} else {
  apiBaseUrl = 'https://vercel-testbed.vercel.app/api/profiles';
}

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [
    paymentMethodFilter,
    PaymentMethodDropdownFilter,
    setPaymentMethodOptions,
  ] = useDropdown('Payment methods', 'payment-method-input-filter', '');
  const [genderFilter, GenderDropdownFilter, setGenderOptions] = useDropdown(
    'Gender',
    'gender-input-filter',
    ''
  );
  const [filterName, setFilterName] = useState('');
  const [isOverlayVisible, toggleIsOverlayVisible] = useState(false);
  const [paginateStart, setPaginateStart] = useState(0);
  const [modalProfile, setModalProfile] = useState({});
  const [loadingError, setLoadingError] = useState(null);
  const paginateLimit = 20;

  function generateDropdownOptions(profiles, objProp) {
    const optionsMap = new Map();
    profiles.forEach((profile) => {
      optionsMap.set(profile[objProp], profile[objProp]);
    });
    return Array.from(optionsMap.values()).sort();
  }

  function createUiProfile(profile) {
    return {
      ...profile,
      FullName: `${profile.LastName} ${profile.FirstName}`,
    };
  }

  function handleOnFilterNameChange(e) {
    setFilterName(e.target.value);
  }

  function filterByName(profile) {
    return profile.FullName.toLowerCase().includes(filterName.toLowerCase());
  }

  function filterDropdownBy(prop, filterString) {
    return (profile) => {
      return filterString.length === 0
        ? true
        : filterString.toLowerCase() === profile[prop].toLowerCase();
    };
  }

  function sortNameAsc(p1, p2) {
    if (p1.LastName > p2.LastName) {
      return 1;
    }
    if (p1.LastName < p2.LastName) {
      return -1;
    }
    return 0;
  }

  let filteredProfiles = profiles
    .filter(filterByName)
    .filter(filterDropdownBy('PaymentMethod', paymentMethodFilter))
    .filter(filterDropdownBy('Gender', genderFilter))
    .sort(sortNameAsc);

  async function getRecords() {
    try {
      const resp = await fetch(`${apiBaseUrl}`, {
        method: 'GET',
      });
      if (process.env.NODE_ENV === 'development') {
        const records = await resp.json();
        const jsonData = {
          records,
          size: records.profiles.length,
          status: 'success',
        };
        return jsonData;
      } else {
        const jsonData = await resp.json();
        if (jsonData.status !== 'success') {
          throw new Error('An error occured while fetching data');
        } else {
          return jsonData;
        }
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  useEffect(() => {
    getRecords()
      .then(({ records }) => {
        const mappedProfiles = records.profiles.map(createUiProfile);
        setPaymentMethodOptions(
          generateDropdownOptions(mappedProfiles, 'PaymentMethod')
        );
        setGenderOptions(generateDropdownOptions(mappedProfiles, 'Gender'));
        setProfiles(mappedProfiles);
      })
      .catch((err) => {
        setLoadingError(err);
      });
    return () => {};
  }, [setPaymentMethodOptions, setGenderOptions]);

  useEffect(() => {
    setPaginateStart(0);
  }, [filterName, paymentMethodFilter, genderFilter]);

  const handleOpenProfileModal = (profile) => {
    setModalProfile(profile);
    toggleModal();
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
    <div className="h-full bg-gray-50">
      <Header title="Transactions Records" />
      {profiles.length === 0 && loadingError !== null ? (
        <ErrorNotification />
      ) : null}
      {profiles.length === 0 && loadingError === null ? <Loader /> : null}
      {profiles.length ? (
        <div className="flex flex-col mb-10">
          <div className="flex mx-4 mt-4 phone:mx-3">
            <form className="flex flex-col w-full md:flex-row md:justify-between ">
              <div className="w-full sm:pl-3 sm:max-w-xs">
                <TextInputFilter
                  value={filterName}
                  onInputChange={handleOnFilterNameChange}
                  id="name-input-filter"
                  placeholder="Patient's name"
                >
                  Search
                </TextInputFilter>
              </div>
              <div className="flex justify-between flex-nowrap sm:pr-3 ">
                <div className="sm:pl-3 md:mr-4 md:pl-0">
                  <PaymentMethodDropdownFilter />
                </div>
                <div>
                  <GenderDropdownFilter />
                </div>
              </div>
            </form>
          </div>
          {/* Table */}
          <div className="mx-4 my-4 overflow-x-auto phone:mx-3">
            <div className="inline-block min-w-full py-2 align-middle sm:px-3">
              <div className="overflow-hidden overflow-y-auto border-b border-gray-100 rounded-lg rounded-b-sm shadow table-container max-h-96">
                <table className="min-w-full ">
                  <TableHead />
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProfiles.length ? (
                      filteredProfiles
                        .slice(paginateStart, paginateStart + paginateLimit)
                        .map((profile) => {
                          return (
                            <tr
                              key={profile.Email}
                              className="hover:bg-gray-100"
                            >
                              <BioTableData profile={profile} />
                              <CardDetailsTableData profile={profile} />
                              <PaymentMethodTableData profile={profile} />
                              <ContactTableData profile={profile} />
                              <ViewTableData
                                openProfileModal={handleOpenProfileModal}
                                profile={profile}
                              />
                            </tr>
                          );
                        })
                    ) : (
                      <tr className="text-center ">
                        <td className="py-4" colSpan="5">
                          Aww! No results for that filter
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Footer with buttons and table results info */}
          <div className="mx-4">
            <div className="flex justify-between px-3 phone:px-0 phone:text-sm">
              <div>
                Showing{' '}
                {filteredProfiles.length ? paginateStart + 1 : paginateStart} to{' '}
                {paginateStart +
                  filteredProfiles.slice(
                    paginateStart,
                    paginateStart + paginateLimit
                  ).length}{' '}
                of {filteredProfiles.length} profiles
              </div>
              <PaginateButtons
                prevDataSet={prevDataSet}
                nextDataSet={nextDataSet}
                paginateStart={paginateStart}
                paginateLimit={paginateLimit}
                filteredProfiles={filteredProfiles}
                profiles={profiles}
              />
            </div>
          </div>
        </div>
      ) : null}
      {isOverlayVisible ? (
        <OverlayContainer>
          <ProfileModal toggleModal={toggleModal} modalProfile={modalProfile} />
        </OverlayContainer>
      ) : null}
    </div>
  );
}
