'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Sidebar } from '@/components/layout/sidebar';
import { THEME } from '@/lib/theme';
import { BtnPrimary } from '@/components/shared/buttons';
import { User, Bell, Shield, Check, Save } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName || 'John');
  const [lastName, setLastName] = useState(user?.lastName || 'Doe');
  const [phone, setPhone] = useState('+260 97 1234567');
  const [location, setLocation] = useState('Lusaka, Zambia');

  const [emailNotify, setEmailNotify] = useState(true);
  const [smsNotify, setSmsNotify] = useState(true);
  const [marketingNotify, setMarketingNotify] = useState(false);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      <Sidebar />
      <div className="bf-dashboard-main">
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h1 className="bf-display" style={{ fontSize: 36, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>
              Account Settings
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.7)' }}>
              Manage your profile details, contact preferences, and security settings.
            </p>
          </div>

          {savedSuccess && (
            <div style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', color: '#22c55e', padding: '16px 20px', borderRadius: 12, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Check size={20} />
              <span>Settings saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Profile Section */}
            <div style={{ background: 'rgba(237,230,214,0.08)', borderRadius: 20, padding: 32, border: '1px solid rgba(244,239,227,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <User size={22} style={{ color: THEME.brass }} />
                <h2 className="bf-display" style={{ fontSize: 22, color: THEME.off }}>Personal Details</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                <div>
                  <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8 }}>FIRST NAME</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bf-input"
                    style={{ background: 'rgba(237,230,214,0.1)', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14 }}
                  />
                </div>

                <div>
                  <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8 }}>LAST NAME</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bf-input"
                    style={{ background: 'rgba(237,230,214,0.1)', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14 }}
                  />
                </div>

                <div>
                  <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8 }}>PHONE NUMBER</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bf-input"
                    style={{ background: 'rgba(237,230,214,0.1)', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14 }}
                  />
                </div>

                <div>
                  <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8 }}>PRIMARY LOCATION</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bf-input"
                    style={{ background: 'rgba(237,230,214,0.1)', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14 }}
                  />
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div style={{ background: 'rgba(237,230,214,0.08)', borderRadius: 20, padding: 32, border: '1px solid rgba(244,239,227,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Bell size={22} style={{ color: THEME.brass }} />
                <h2 className="bf-display" style={{ fontSize: 22, color: THEME.off }}>Notification Preferences</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 12, background: 'rgba(237,230,214,0.05)', cursor: 'pointer' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: THEME.off }}>Email Notifications</div>
                    <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.6)' }}>Receive booking updates and receipts via email</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotify}
                    onChange={(e) => setEmailNotify(e.target.checked)}
                    style={{ width: 20, height: 20, accentColor: THEME.brass }}
                  />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 12, background: 'rgba(237,230,214,0.05)', cursor: 'pointer' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: THEME.off }}>SMS & WhatsApp Notifications</div>
                    <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.6)' }}>Receive instant status alerts on your phone</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsNotify}
                    onChange={(e) => setSmsNotify(e.target.checked)}
                    style={{ width: 20, height: 20, accentColor: THEME.brass }}
                  />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 12, background: 'rgba(237,230,214,0.05)', cursor: 'pointer' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: THEME.off }}>Promotions & Recommendations</div>
                    <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.6)' }}>Receive special venue offers and seasonal discounts</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={marketingNotify}
                    onChange={(e) => setMarketingNotify(e.target.checked)}
                    style={{ width: 20, height: 20, accentColor: THEME.brass }}
                  />
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div>
              <BtnPrimary type="submit" style={{ padding: '12px 32px' }}>
                <Save size={18} style={{ marginRight: 8 }} /> Save Changes
              </BtnPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
