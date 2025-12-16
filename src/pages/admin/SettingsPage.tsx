import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Settings, User, Bell, Shield, Database } from 'lucide-react';

const SettingsPage = () => {
  const { admin } = useAdminAuth();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your admin preferences and system settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <User size={20} className="text-primary" />
              <h2 className="text-lg font-display font-semibold text-foreground">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={admin?.name}
                  className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Username</label>
                <input
                  type="text"
                  defaultValue={admin?.username}
                  className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  disabled
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Role</label>
                <input
                  type="text"
                  defaultValue={admin?.role}
                  className="w-full px-4 py-2.5 bg-secondary border border-input rounded-lg text-muted-foreground capitalize"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <Bell size={20} className="text-primary" />
              <h2 className="text-lg font-display font-semibold text-foreground">Notification Settings</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Email notifications for new violations', enabled: true },
                { label: 'Daily summary reports', enabled: true },
                { label: 'Real-time exam alerts', enabled: false },
                { label: 'Student registration notifications', enabled: true },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-foreground">{item.label}</span>
                  <button
                    className={`w-12 h-6 rounded-full transition-colors ${
                      item.enabled ? 'bg-primary' : 'bg-secondary'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-primary-foreground rounded-full shadow transition-transform ${
                        item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} className="text-primary" />
              <h2 className="text-lg font-display font-semibold text-foreground">Security</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-foreground text-sm">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-foreground text-sm">
                Two-Factor Authentication
              </button>
              <button className="w-full text-left px-4 py-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-foreground text-sm">
                Login History
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <Database size={20} className="text-primary" />
              <h2 className="text-lg font-display font-semibold text-foreground">System</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-foreground text-sm">
                Export All Data
              </button>
              <button className="w-full text-left px-4 py-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-foreground text-sm">
                System Logs
              </button>
              <button className="w-full text-left px-4 py-3 bg-destructive/10 rounded-lg hover:bg-destructive/20 transition-colors text-destructive text-sm">
                Clear Cache
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
