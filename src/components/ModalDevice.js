export default function ModalDevice(props) {
  const { MacAddress, Latitude, Longitude, URL } = props.modalProfile;
  return (
    <section className="mt-2 text-left phone:ml-2 sm:ml-4">
      <header className="inline-block px-2 py-1 mb-2 text-xs tracking-wide text-gray-500 uppercase bg-gray-200 rounded-md">
        Device
      </header>
      <dl className="flex">
        <dt className="mr-2">MAC Address:</dt>
        <dd className="text-gray-700">{MacAddress}</dd>
      </dl>
      <dl className="flex">
        <dt className="mr-2">Location:</dt>
        <dd className="text-gray-700">
          <span className="mr-1">{Longitude}&#176;,</span>{' '}
          <span className="">{Latitude}&#176; </span>
        </dd>
      </dl>
      <dl className="flex">
        <dt className="mr-2">URL:</dt>
        <dd className="text-blue-700">
          <a className="hover:underline" href={`http://${URL}`}>
            {' '}
            {URL}
          </a>
        </dd>
      </dl>
    </section>
  );
}
