//thTableOrder.jsx
import {IconVUpDown} from "@icons/actions/v";

export default function AppThTableOrder({
    handleSort,label
  }) {

  return (
    <th scope="col" className="p-4 cursor-pointer" onClick={handleSort}>
      <div className="flex items-center">
        <IconVUpDown />
        {label}
      </div>
    </th>
)}
