const EditCategory = ({
  openUpdateForm,
  setOpenUpdateForm,
  updatedCategory,
  setUpdatedCategory,
  updateMutation,
}) => {
  return (
    <div
      className={`absolute w-full max-w-md bg-zinc-100 ${openUpdateForm ? 'block' : 'hidden'}`}
    >
      <div className='flex flex-col justify-center gap-4 rounded-lg border-2 border-zinc-300 p-8 shadow-md'>
        <label htmlFor='updateCategory' className='text-lg font-medium'>
          Update Category:
        </label>
        <input
          type='text'
          id='updateCategory'
          name='updateCategory'
          value={updatedCategory.value}
          onChange={(e) =>
            setUpdatedCategory({
              ...updatedCategory,
              value: e.target.value,
            })
          }
          className='h-10 rounded-lg px-4 py-5 focus:outline-offset-1'
        />
        <div className='flex items-center justify-center gap-2'>
          <button
            className='flex-1 rounded-lg bg-emerald-300 py-2 font-semibold hover:bg-emerald-200'
            onClick={async () => {
              try {
                await updateMutation.mutateAsync(updatedCategory);
                setUpdatedCategory({ id: '', value: '' });
                setOpenUpdateForm(!openUpdateForm);
              } catch (error) {
                console.error('Error updating category:', error);
              }
            }}
          >
            Submit
          </button>
          <button
            onClick={() => setOpenUpdateForm(!openUpdateForm)}
            className='flex-1 rounded-lg bg-red-400 py-2 font-semibold hover:bg-red-300'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
