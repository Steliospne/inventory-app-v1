import Input from '../components/Input';

const NewCategory = ({
  openEditForm,
  creationMutation,
  setNewCategory,
  setOpenEditForm,
  newCategory,
}) => {
  const handleMutateCategories = async () => {
    try {
      await creationMutation.mutateAsync(newCategory);
      setNewCategory('');
      setOpenEditForm(!openEditForm);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div
      className={`absolute w-full max-w-md bg-zinc-100 ${openEditForm ? 'block' : 'hidden'}`}
    >
      <div className='flex flex-col gap-4 rounded-lg border-2 border-zinc-300 p-8 shadow-md'>
        <Input
          id='newCategory'
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          LabelText='New Category:'
        />

        <div className='flex items-center justify-center gap-2'>
          <button
            className='flex-1 rounded-lg bg-emerald-300 py-2 font-semibold hover:bg-emerald-200'
            onClick={handleMutateCategories}
          >
            Submit
          </button>
          <button
            onClick={() => {
              setOpenEditForm(!openEditForm);
              setNewCategory('');
            }}
            className='flex-1 rounded-lg bg-red-400 py-2 font-semibold hover:bg-red-300'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
