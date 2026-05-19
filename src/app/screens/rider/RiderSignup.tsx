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
          <CheckCircle size={64} style={{ color: '#10B981', margin: '0 auto 24px' }} />
          <h1 className="text-2xl font-bold mb-3" style={{ color: '#1F2937' }}>
            Application submitted!
          </h1>
          <p className="text-sm mb-8" style={{ color: '#6B7280' }}>
            We'll review and activate your account within 24 hours. We'll notify you via email and
            WhatsApp.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full h-[52px] rounded-lg font-semibold"
            style={{ backgroundColor: '#6366F1', color: 'white' }}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-5 py-8 max-w-[390px] mx-auto">
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#1F2937' }}>
        Become a Rider
      </h1>
      <p className="text-sm mb-8" style={{ color: '#6B7280' }}>
        Earn money between classes. Deliver on campus.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Photo Upload */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block" style={{ color: '#1F2937' }}>
            Upload a clear photo of yourself
          </label>
          <div
            className="w-32 h-32 mx-auto rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer"
            style={{ borderColor: '#E0E0E0', backgroundColor: '#F8F9FA' }}
          >
            <div className="text-center">
              <Upload size={32} style={{ color: '#6B7280', margin: '0 auto 8px' }} />
              <p className="text-xs" style={{ color: '#6B7280' }}>
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
            className="w-full h-[52px] px-4 rounded-lg"
            style={{ backgroundColor: '#F8F9FA' }}
            required
          />
          <input
            type="email"
            placeholder="Unilag email"
            className="w-full h-[52px] px-4 rounded-lg"
            style={{ backgroundColor: '#F8F9FA' }}
            required
          />
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full h-[52px] px-4 rounded-lg"
            style={{ backgroundColor: '#F8F9FA' }}
            required
          />
          <input
            type="text"
            placeholder="Matric number"
            className="w-full h-[52px] px-4 rounded-lg"
            style={{ backgroundColor: '#F8F9FA' }}
            required
          />
        </div>

        {/* Bank Details */}
        <div className="space-y-4 mb-6">
          <select
            className="w-full h-[52px] px-4 rounded-lg"
            style={{ backgroundColor: '#F8F9FA' }}
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
            className="w-full h-[52px] px-4 rounded-lg"
            style={{ backgroundColor: '#F8F9FA' }}
            required
          />
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 mb-8">
          <input type="checkbox" className="mt-1" required />
          <p className="text-sm" style={{ color: '#6B7280' }}>
            I agree to the CampusEats Rider Terms
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-[52px] rounded-lg font-semibold"
          style={{ backgroundColor: '#6366F1', color: 'white' }}
        >
          Submit Application
        </button>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Already a rider?{' '}
            <button
              type="button"
              onClick={() => navigate('/rider/login')}
              className="font-semibold"
              style={{ color: '#6366F1' }}
            >
              Login here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
