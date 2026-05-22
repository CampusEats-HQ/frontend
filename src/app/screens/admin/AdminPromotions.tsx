import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Bell, User, LayoutDashboard, ClipboardList, Users, DollarSign, Megaphone, Plus, Pencil, Trash2, X } from 'lucide-react';
import { adminService } from '../../services/admin';
import type { Promo } from '../../services/admin';
import { toast } from 'sonner';

const BG_OPTIONS = [
  { label: 'Amber', value: 'from-amber-100 to-[#FDE68A]' },
  { label: 'Indigo', value: 'from-indigo-100 to-[#C7D2FE]' },
  { label: 'Emerald', value: 'from-emerald-100 to-[#A7F3D0]' },
  { label: 'Rose', value: 'from-rose-100 to-[#FECDD3]' },
];

const EMPTY_FORM = { emoji: '', title: '', subtitle: '', bg: BG_OPTIONS[0].value, active: true };

export default function AdminPromotions() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Promo | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminService.getPromos()
      .then((res) => setPromos(res.promos))
      .catch(() => toast.error('Failed to load promotions'))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (promo: Promo) => {
    setEditing(promo);
    setForm({ emoji: promo.emoji, title: promo.title, subtitle: promo.subtitle, bg: promo.bg, active: promo.active });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const request = editing
      ? adminService.updatePromo(editing.id, form)
      : adminService.createPromo(form);

    request
      .then((saved) => {
        if (editing) {
          setPromos((prev) => prev.map((p) => (p.id === editing.id ? saved : p)));
          toast.success('Promo updated');
        } else {
          setPromos((prev) => [...prev, saved]);
          toast.success('Promo created');
        }
        setShowModal(false);
      })
      .catch(() => toast.error('Failed to save promo'))
      .finally(() => setSaving(false));
  };

  const handleDelete = (promo: Promo) => {
    if (!confirm(`Delete "${promo.title}"?`)) return;
    adminService.deletePromo(promo.id)
      .then(() => {
        setPromos((prev) => prev.filter((p) => p.id !== promo.id));
        toast.success('Promo deleted');
      })
      .catch(() => toast.error('Failed to delete promo'));
  };

  const handleToggleActive = (promo: Promo) => {
    adminService.updatePromo(promo.id, { active: !promo.active })
      .then((updated) => {
        setPromos((prev) => prev.map((p) => (p.id === promo.id ? updated : p)));
        toast.success(updated.active ? 'Promo activated' : 'Promo paused');
      })
      .catch(() => toast.error('Failed to update promo'));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Bar */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-gray-800">CampusEats Admin</h1>
            <nav className="hidden lg:flex gap-4">
              <Link to="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <LayoutDashboard size={18} className="text-gray-500" />
                <span className="text-sm text-gray-500">Dashboard</span>
              </Link>
              <Link to="/admin/orders" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <ClipboardList size={18} className="text-gray-500" />
                <span className="text-sm text-gray-500">Orders</span>
              </Link>
              <Link to="/admin/people" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <Users size={18} className="text-gray-500" />
                <span className="text-sm text-gray-500">People</span>
              </Link>
              <Link to="/admin/analytics" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <span className="text-sm text-gray-500">Analytics</span>
              </Link>
              <Link to="/admin/finance" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <DollarSign size={18} className="text-gray-500" />
                <span className="text-sm text-gray-500">Finance</span>
              </Link>
              <Link to="/admin/promotions" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-indigo-500">
                <Megaphone size={18} />
                <span className="text-sm font-medium">Promotions</span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="relative" aria-label="Notifications">
              <Bell size={20} className="text-gray-500" />
            </button>
            <button type="button" aria-label="Profile">
              <User size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Promotions</h2>
              <p className="text-sm text-gray-500 mt-1">Manage the banner slides shown on the customer home screen</p>
            </div>
            <button
              type="button"
              onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium"
            >
              <Plus size={16} />
              New Promo
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : promos.length === 0 ? (
            <div className="text-center py-20">
              <Megaphone size={48} className="text-gray-200 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-800 mb-1">No promotions yet</p>
              <p className="text-sm text-gray-500 mb-6">Create your first banner slide to show on the home screen</p>
              <button type="button" onClick={openCreate} className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium">
                Create Promo
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {promos.map((promo) => (
                <div key={promo.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {/* Preview */}
                  <div className={`p-5 bg-gradient-to-br ${promo.bg}`}>
                    <p className="text-base font-semibold text-gray-800">{promo.emoji} {promo.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{promo.subtitle}</p>
                  </div>
                  {/* Actions */}
                  <div className="px-4 py-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(promo)}
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        promo.active ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {promo.active ? 'Active' : 'Paused'}
                    </button>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(promo)}
                        aria-label="Edit promo"
                        className="p-2 rounded-lg hover:bg-gray-100"
                      >
                        <Pencil size={15} className="text-gray-500" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(promo)}
                        aria-label="Delete promo"
                        className="p-2 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 size={15} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800">{editing ? 'Edit Promo' : 'New Promo'}</h3>
              <button type="button" onClick={() => setShowModal(false)} aria-label="Close modal">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Live preview */}
            <div className={`rounded-xl p-4 mb-5 bg-gradient-to-br ${form.bg}`}>
              <p className="text-sm font-semibold text-gray-800">{form.emoji || '✨'} {form.title || 'Your title here'}</p>
              <p className="text-xs text-gray-500 mt-0.5">{form.subtitle || 'Your subtitle here'}</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex gap-3">
                <div className="w-20">
                  <label className="text-xs font-medium text-gray-700 block mb-1">Emoji</label>
                  <input
                    type="text"
                    value={form.emoji}
                    onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                    placeholder="🔥"
                    className="w-full h-10 px-3 rounded-lg bg-gray-50 text-center text-lg"
                    maxLength={2}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-700 block mb-1">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Delivered in 20 mins"
                    className="w-full h-10 px-3 rounded-lg bg-gray-50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="Hot & fresh to your hostel"
                  className="w-full h-10 px-3 rounded-lg bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Background colour</label>
                <div className="flex gap-2">
                  {BG_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm({ ...form, bg: opt.value })}
                      className={`flex-1 h-8 rounded-lg bg-gradient-to-br ${opt.value} border-2 transition-all ${
                        form.bg === opt.value ? 'border-indigo-500' : 'border-transparent'
                      }`}
                      aria-label={`Select ${opt.label} background`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                />
                <label htmlFor="active" className="text-sm text-gray-700">Active (visible on home screen)</label>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full h-11 rounded-lg bg-indigo-500 text-white font-semibold disabled:opacity-60"
              >
                {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Promo'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
