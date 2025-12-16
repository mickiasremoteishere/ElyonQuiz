import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2, Shield, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (isAuthenticated) {
    navigate('/admin/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: 'Missing Credentials',
        description: 'Please enter both username and password',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    const success = await login(username, password);
    
    if (success) {
      toast({
        title: 'Welcome Admin!',
        description: 'Login successful. Redirecting to dashboard...',
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password.',
        variant: 'destructive',
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="bg-card border border-border rounded-2xl shadow-elevated p-8 animate-scale-in">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-primary p-4 rounded-2xl mb-4 animate-fade-in">
              <Shield className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Admin Portal</h1>
            <p className="text-muted-foreground text-sm mt-1">Sign in to manage exams & students</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <label htmlFor="username" className="text-sm font-medium text-foreground">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 pr-12"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed animate-slide-up shadow-soft hover:shadow-glow"
              style={{ animationDelay: '300ms' }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Shield size={18} />
                  Admin Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-secondary/50 rounded-xl animate-fade-in" style={{ animationDelay: '400ms' }}>
            <p className="text-xs text-muted-foreground text-center mb-2">Demo Credentials</p>
            <div className="text-xs text-center space-y-1">
              <p><span className="text-muted-foreground">User:</span> <code className="bg-background px-2 py-0.5 rounded text-foreground">admin</code> <span className="text-muted-foreground">Pass:</span> <code className="bg-background px-2 py-0.5 rounded text-foreground">admin123</code></p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <a href="/login" className="text-sm text-primary hover:underline">
              ← Back to Student Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
