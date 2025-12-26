//check.jsx
export default function Checkbox({
    id,
    name,
    checked,
    onChange,
    label="",
    className = "w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600", classLabel = "ml-2 text-sm text-gray-700"}) {
  return (
    <div className="relative flex items-center cursor-pointer">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={className}
      />

      {label && (
        <label htmlFor={id} className={classLabel}>
          {label}
        </label>
      )}
    </div>
  );
}
