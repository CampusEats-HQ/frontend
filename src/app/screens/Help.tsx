import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronDown, MessageCircle, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

const faqs = [
  {
    category: 'Orders',
    questions: [
      {
        q: 'How do I track my order?',
        a: 'After placing an order, you\'ll see a "Track Order" button on the success page. You can also track it from your order history.',
      },
      {
        q: 'Can I cancel my order?',
        a: 'You can cancel within 2 minutes of placing the order. After that, contact the restaurant directly or our support team.',
      },
      {
        q: 'What if my order is late?',
        a: 'Check the tracking page first. If it\'s significantly delayed, contact support and we\'ll help resolve it.',
      },
    ],
  },
  {
    category: 'Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept card payments, bank transfers, and cash on delivery for campus addresses.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes! We use industry-standard encryption to protect all payment information.',
      },
      {
        q: 'How do refunds work?',
        a: 'Refunds are processed within 3-5 business days to your original payment method.',
      },
    ],
  },
  {
    category: 'Delivery',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Average delivery time is 15-25 minutes depending on restaurant location and order complexity.',
      },
      {
        q: 'Can I change my delivery location?',
        a: 'You can update before checkout. After placing the order, contact support immediately.',
      },
      {
        q: 'Do you deliver outside campus?',
        a: 'Currently, we only deliver within University of Lagos campus for student safety and speed.',
      },
    ],
  },
  {
    category: 'Account',
    questions: [
      {
        q: 'How do I verify my student status?',
        a: 'Use your official Unilag email address (@students.unilag.edu.ng) when signing up.',
      },
      {
        q: 'I forgot my password',
        a: 'Click "Forgot Password" on the login screen and follow the email instructions.',
      },
    ],
  },
];

export default function Help() {
  const navigate = useNavigate();
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4 flex items-center border-b border-gray-200">
        <button onClick={() => navigate('/profile')} className="mr-4">
          <ArrowLeft size={24} style={{ color: '#1F2937' }} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: '#1F2937' }}>
          Help & Support
        </h1>
      </div>

      <div className="px-6 py-6 max-w-4xl mx-auto">
        {/* Quick Contact */}
        <div className="rounded-lg p-5 mb-8" style={{ backgroundColor: '#EEF2FF' }}>
          <h2 className="font-bold text-lg mb-3" style={{ color: '#1F2937' }}>
            Need immediate help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setShowContactForm(true)}
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: 'white' }}
            >
              <MessageCircle size={20} style={{ color: '#6366F1' }} />
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>Live Chat</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>Reply in ~2 mins</p>
              </div>
            </button>
            <a
              href="mailto:support@campuseats.ng"
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: 'white' }}
            >
              <Mail size={20} style={{ color: '#6366F1' }} />
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>Email Us</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>support@campuseats.ng</p>
              </div>
            </a>
            <a
              href="tel:+2348012345678"
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: 'white' }}
            >
              <Phone size={20} style={{ color: '#6366F1' }} />
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>Call Us</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>0801 234 5678</p>
              </div>
            </a>
          </div>
        </div>

        {/* FAQs */}
        <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2937' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((category, catIndex) => (
            <div key={catIndex}>
              <h3 className="font-bold text-base mb-3" style={{ color: '#6366F1' }}>
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.questions.map((faq, qIndex) => {
                  const key = `${catIndex}-${qIndex}`;
                  const isExpanded = expandedQuestion === key;
                  return (
                    <div
                      key={key}
                      className="rounded-lg border overflow-hidden"
                      style={{ borderColor: '#E0E0E0' }}
                    >
                      <button
                        onClick={() => setExpandedQuestion(isExpanded ? null : key)}
                        className="w-full flex items-start justify-between p-4 text-left hover:bg-gray-50"
                      >
                        <p className="font-semibold text-sm flex-1 pr-4" style={{ color: '#1F2937' }}>
                          {faq.q}
                        </p>
                        <ChevronDown
                          size={20}
                          style={{
                            color: '#6B7280',
                            transform: isExpanded ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.2s',
                          }}
                        />
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4">
                          <p className="text-sm" style={{ color: '#6B7280' }}>
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="mt-8 p-6 rounded-lg text-center" style={{ backgroundColor: '#F8F9FA' }}>
          <p className="text-base font-semibold mb-2" style={{ color: '#1F2937' }}>
            Still need help?
          </p>
          <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
            Can't find what you're looking for? Send us a message.
          </p>
          <button
            onClick={() => setShowContactForm(true)}
            className="px-6 h-11 rounded-lg font-semibold"
            style={{ backgroundColor: '#6366F1', color: 'white' }}
          >
            Contact Support
          </button>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4" style={{ color: '#1F2937' }}>
              Send us a message
            </h2>

            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1F2937' }}>
                  Subject
                </label>
                <select
                  className="w-full h-12 px-4 rounded-lg border"
                  style={{ borderColor: '#E0E0E0' }}
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="order">Order Issue</option>
                  <option value="payment">Payment Problem</option>
                  <option value="delivery">Delivery Delay</option>
                  <option value="refund">Refund Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1F2937' }}>
                  Order ID (if applicable)
                </label>
                <input
                  type="text"
                  placeholder="ORD-1234"
                  className="w-full h-12 px-4 rounded-lg border"
                  style={{ borderColor: '#E0E0E0' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1F2937' }}>
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe your issue in detail..."
                  className="w-full px-4 py-3 rounded-lg border resize-none"
                  style={{ borderColor: '#E0E0E0' }}
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 h-12 rounded-lg font-semibold"
                  style={{ backgroundColor: '#F8F9FA', color: '#1F2937' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-12 rounded-lg font-semibold"
                  style={{ backgroundColor: '#6366F1', color: 'white' }}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
