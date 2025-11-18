//notification.jsx
import { usePage } from "@inertiajs/inertia-react";

export function useFlash() {
  const { flash = {} } = usePage().props;

  if (flash.success) {
    return { message: flash.success, type: 'success' };
  }
  if (flash.error) {
    return { message: flash.error, type: 'error' };
  }
  if (flash.warning) {
    return { message: flash.warning, type: 'warning' };
  }
  if (flash.message) {
    return { message: flash.message, type: 'info' };
  }

  return null;
}

export default function AppNotification({ type, message }) {
  const colors = {
    success: 'bg-green-500',
    error:   'bg-rose-500',
    warning: 'bg-yellow-500',
    info:    'bg-blue-500',
  };

  if (!message) return null;

  return (
    <div className={`absolute top-24 right-6 ${colors[type]} p-2 rounded-md shadow-lg text-sm text-white`}>
      {message}
    </div>
  );
}
