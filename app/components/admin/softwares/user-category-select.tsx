interface UserCategoryCheckboxGroupProps {
  userCategories: any[]; // List of all categories
  selectedIds: string[]; // Selected category IDs
  onChange: (value: string[], fieldName: string) => void; // Same signature as before
}

export const UserCategorySelect: React.FC<UserCategoryCheckboxGroupProps> = ({
  userCategories,
  selectedIds,
  onChange,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let updated = [];

    if (e.target.checked) {
      updated = [...selectedIds, value];
    } else {
      updated = selectedIds.filter((id) => id !== value);
    }

    onChange(updated, "userCategoryIds");
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-black">
        User categories <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-wrap gap-4">
        {userCategories.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              value={item.id}
              checked={selectedIds.includes(item.id)}
              onChange={handleCheckboxChange}
              className="accent-blue-600 w-4 h-4"
            />
            <span>{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
