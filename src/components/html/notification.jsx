// notification.jsx
import { useState, useEffect } from "react";

export function useFlash() {
  const [flash, setFlash] = useState(null);

  const notify = (message, type = 'info', duration = 3000) => {
    setFlash({ message, type });

    if (duration) {
      setTimeout(() => setFlash(null), duration);
    }
  };

  return [flash, notify];
}

export default function AppNotification({ type, message }) {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-rose-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  if (!message) return null;

  return (
    <div className={`absolute top-24 right-6 ${colors[type]} p-2 rounded-md shadow-lg text-sm text-white`}>
      {message}
    </div>
  );
}
