interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ onConfirm, onCancel }: LogoutModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-1">Log out?</h3>
        <p className="text-sm text-gray-500 mb-6">You'll need to log back in to place orders.</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-12 rounded-xl font-semibold border border-gray-200 text-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-12 rounded-xl font-semibold bg-red-500 text-white"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
