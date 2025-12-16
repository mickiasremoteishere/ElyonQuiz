import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { studentRecords, studentResults, violations } from '@/data/mockData';
import { exams } from '@/data/exams';
import { Users, FileText, AlertTriangle, BookOpen, TrendingUp, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const { admin } = useAdminAuth();

  const stats = [
    { 
      label: 'Total Students', 
      value: studentRecords.length, 
      icon: Users, 
      color: 'bg-info/10 text-info',
      change: '+12%'
    },
    { 
      label: 'Active Exams', 
      value: exams.filter(e => e.status === 'ongoing').length, 
      icon: BookOpen, 
      color: 'bg-success/10 text-success',
      change: '+2'
    },
    { 
      label: 'Total Results', 
      value: studentResults.length, 
      icon: FileText, 
      color: 'bg-primary/10 text-primary',
      change: '+24'
    },
    { 
      label: 'Violations', 
      value: violations.length, 
      icon: AlertTriangle, 
      color: 'bg-destructive/10 text-destructive',
      change: '-8%'
    },
  ];

  const recentResults = studentResults.slice(0, 5);
  const recentViolations = violations.slice(0, 3);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
          Welcome back, {admin?.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your exams today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="bg-card border border-border rounded-xl p-5 animate-slide-up hover:shadow-soft transition-shadow"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-display font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-success mt-2">{stat.change} from last month</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Results */}
        <div className="bg-card border border-border rounded-xl p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-foreground">Recent Results</h2>
            <TrendingUp size={20} className="text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {recentResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{result.studentName}</p>
                  <p className="text-xs text-muted-foreground">{result.examTitle}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${result.status === 'passed' ? 'text-success' : 'text-destructive'}`}>
                    {result.percentage}%
                  </p>
                  <p className="text-xs text-muted-foreground">{result.score}/{result.totalQuestions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Violations */}
        <div className="bg-card border border-border rounded-xl p-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-foreground">Recent Violations</h2>
            <AlertTriangle size={20} className="text-warning" />
          </div>
          <div className="space-y-3">
            {recentViolations.map((violation) => (
              <div key={violation.id} className="p-3 bg-secondary/30 rounded-lg border-l-4 border-l-warning">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{violation.studentName}</p>
                    <p className="text-xs text-muted-foreground">{violation.examTitle}</p>
                    <p className="text-sm text-foreground mt-1">{violation.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    violation.severity === 'high' ? 'bg-destructive/10 text-destructive' :
                    violation.severity === 'medium' ? 'bg-warning/10 text-warning' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {violation.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
