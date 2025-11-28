//check2.jsx
export default function CheckboxBall({
    id, name,
    checked, onChange,
    label="",
    className = '' ,
    classLabel1 = "relative flex items-center cursor-pointer", classLabel2 = "ml-2 text-sm text-gray-700" }) {
  return (
    <>
    <label className={classLabel1}>
        <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"/>
        <div className="relative w-9 h-5 bg-red-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      {label && (
        <label htmlFor={id} className={classLabel2}>
          {label}
        </label>
      )}
    </label>
    </>
  );
}
