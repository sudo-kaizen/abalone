export default function ModalLogin(props) {
  const { UserName, LastLogin } = props.modalProfile;
  return (
    <section className="mt-2 text-left phone:ml-2 sm:ml-4">
      <header className="inline-block px-2 py-1 mb-2 text-xs tracking-wide text-gray-500 uppercase bg-gray-200 rounded-md">
        Login
      </header>
      <dl className="flex">
        <dt className="mr-2">Username:</dt>
        <dd className="text-gray-700">{UserName}</dd>
      </dl>
      <dl className="flex">
        <dt className="mr-2">Last login:</dt>
        <dd className="text-gray-700">{LastLogin}</dd>
      </dl>
    </section>
  );
}
