import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Upload, CheckCircle } from 'lucide-react';
import { banks } from '../../data/riderMockData';

export default function RiderSignup() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="max-w-[390px] w-full text-center">
          <CheckCircle size={64} className="text-emerald-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-3 text-gray-800">
            Application submitted!
          </h1>
          <p className="text-sm mb-8 text-gray-500">
            We'll review and activate your account within 24 hours. We'll notify you via email and
            WhatsApp.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full h-[52px] rounded-lg font-semibold bg-indigo-500 text-white"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-5 py-8 max-w-[390px] mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">
        Become a Rider
      </h1>
      <p className="text-sm mb-8 text-gray-500">
        Earn money between classes. Deliver on campus.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Photo Upload */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block text-gray-800">
            Upload a clear photo of yourself
          </label>
          <div className="w-32 h-32 mx-auto rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer">
            <div className="text-center">
              <Upload size={32} className="text-gray-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500">
                Tap to upload
              </p>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Full name"
            className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
            required
          />
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
            required
          />
          <input
            type="text"
            placeholder="Matric number"
            className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
            required
          />
        </div>

        {/* Bank Details */}
        <div className="space-y-4 mb-6">
          <select
            className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
            aria-label="Select bank"
            required
          >
            <option value="">Select bank</option>
            {banks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Account number"
            className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
            required
          />
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 mb-8">
          <input type="checkbox" className="mt-1" aria-label="I agree to the CampusEats Rider Terms" required />
          <p className="text-sm text-gray-500">
            I agree to the CampusEats Rider Terms
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-[52px] rounded-lg font-semibold bg-indigo-500 text-white"
        >
          Submit Application
        </button>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already a rider?{' '}
            <button
              type="button"
              onClick={() => navigate('/rider/login')}
              className="font-semibold text-indigo-500"
            >
              Login here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
