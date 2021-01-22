export default function ModalBio(props) {
  const { LastName, FirstName, Gender } = props.modalProfile;
  return (
    <section className="mt-2 text-left phone:ml-2 sm:ml-4">
      <header className="inline-block px-2 py-1 mb-2 text-xs tracking-wide text-gray-500 uppercase bg-gray-200 rounded-md">
        Bio
      </header>
      <dl className="flex">
        <dt className="mr-2">Full name:</dt>
        <dd className="text-xl leading-6 text-left text-gray-700">
          <span className="inline-block mr-2 uppercase">{LastName}</span>
          <span className="mr-2">{FirstName}</span>
        </dd>
      </dl>
      <dl className="flex">
        <dt className="mr-2">Gender:</dt>
        <dd className="text-gray-700">{Gender}</dd>
      </dl>
    </section>
  );
}
