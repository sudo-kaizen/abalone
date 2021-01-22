export default function Header(props) {
  return (
    <div className="py-4 mx-auto bg-gradient-to-r from-green-400 to-blue-500 ">
      <div className="flex flex-col w-full text-center">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl md:py-4">
          {props.title}
        </h1>
      </div>
    </div>
  );
}
