import PropTypes from 'prop-types';

TextInputFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default function TextInputFilter(props) {
  const { value, onInputChange, id, placeholder, children } = props;
  return (
    <>
      <label
        className="text-sm font-semibold tracking-wide text-gray-600 phone:w-full"
        htmlFor={id}
      >
        {children}
        <input
          value={value}
          onChange={onInputChange}
          type="text"
          id={id}
          className="flex-1 w-full px-2 py-1 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          placeholder={placeholder}
        />
      </label>
    </>
  );
}
