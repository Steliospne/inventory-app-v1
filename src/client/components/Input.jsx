/**
 * Creates an Input element with label
 */

const Input = ({
  type = 'text',
  id,
  name = id,
  required = true,
  autoComplete = id,
  onChange,
  LabelText,
  value = '',
}) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className='text-lg font-medium'>
        {LabelText}
      </label>
      <input
        type={type}
        name={name && name}
        id={id}
        autoComplete={autoComplete}
        onChange={onChange && onChange}
        required={required}
        value={value}
        className='mt-4 h-10 rounded-lg border border-emerald-300 p-2 px-4 py-5 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50'
      />
    </div>
  );
};

export default Input;
