//check2.jsx
export default function CheckboxBall({
    name, checked, onChange,
    label="",
    classLabel1 = "relative flex items-center cursor-pointer", 
    classLabel2 = "ml-2 text-sm text-gray-700" 
  }) {
  return (
    <>
    <label className={classLabel1}>
        <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"/>
        <div className="relative w-9 h-5 bg-red-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 rtl:after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      {label && (
        <label htmlFor={name} className={classLabel2}>
          {label}
        </label>
      )}
    </label>
    </>
  );
}
