const Dropdown = ({
  options,
  selectedOption,
  newOption,
  isAddingNew,
  onSelectChange,
  onNewOptionChange,
  onAddNewOption,
}) => {
  return (
    <>
      <select
        id='category'
        name='category'
        value={selectedOption}
        onChange={onSelectChange}
        className='mt-4 w-full rounded-md border border-emerald-300 p-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50'
      >
        <option value=''>Select an option</option>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          ))}
        <option value='add_new'>Add new option</option>
      </select>

      {isAddingNew && (
        <div className='mt-2 flex items-center space-x-2'>
          <input
            type='text'
            id='new_category_option'
            value={newOption.name}
            onChange={onNewOptionChange}
            placeholder='Enter new option'
            className='flex-grow rounded-md border border-emerald-300 p-2 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50'
          />
          <button
            type='button'
            onClick={onAddNewOption}
            className='rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50'
          >
            Add
          </button>
        </div>
      )}
      {selectedOption && (
        <p className='mt-4 text-emerald-700'>You selected: {selectedOption}</p>
      )}
    </>
  );
};

export default Dropdown;
