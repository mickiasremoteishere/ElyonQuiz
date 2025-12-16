import { useState } from 'react';
import { violations, Violation } from '@/data/mockData';
import { Search, Filter, AlertTriangle, Monitor, Copy, Clipboard, Maximize, Activity } from 'lucide-react';

const ViolationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredViolations = violations.filter((violation) => {
    const matchesSearch = 
      violation.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      violation.admissionId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || violation.severity === filterSeverity;
    const matchesType = filterType === 'all' || violation.type === filterType;
    return matchesSearch && matchesSeverity && matchesType;
  });

  const getViolationIcon = (type: Violation['type']) => {
    switch (type) {
      case 'tab_switch':
        return Monitor;
      case 'copy_attempt':
        return Copy;
      case 'paste_attempt':
        return Clipboard;
      case 'fullscreen_exit':
        return Maximize;
      case 'suspicious_activity':
        return Activity;
      default:
        return AlertTriangle;
    }
  };

  const getViolationLabel = (type: Violation['type']) => {
    switch (type) {
      case 'tab_switch':
        return 'Tab Switch';
      case 'copy_attempt':
        return 'Copy Attempt';
      case 'paste_attempt':
        return 'Paste Attempt';
      case 'fullscreen_exit':
        return 'Fullscreen Exit';
      case 'suspicious_activity':
        return 'Suspicious Activity';
      default:
        return type;
    }
  };

  const getSeverityStyles = (severity: Violation['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const highCount = violations.filter(v => v.severity === 'high').length;
  const mediumCount = violations.filter(v => v.severity === 'medium').length;
  const lowCount = violations.filter(v => v.severity === 'low').length;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Violations</h1>
        <p className="text-muted-foreground mt-1">Monitor and review detected exam violations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4 animate-slide-up">
          <p className="text-sm text-muted-foreground">Total Violations</p>
          <p className="text-2xl font-display font-bold text-foreground">{violations.length}</p>
        </div>
        <div className="bg-card border border-destructive/30 rounded-xl p-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <p className="text-sm text-destructive">High Severity</p>
          <p className="text-2xl font-display font-bold text-destructive">{highCount}</p>
        </div>
        <div className="bg-card border border-warning/30 rounded-xl p-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <p className="text-sm text-warning">Medium Severity</p>
          <p className="text-2xl font-display font-bold text-warning">{mediumCount}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <p className="text-sm text-muted-foreground">Low Severity</p>
          <p className="text-2xl font-display font-bold text-muted-foreground">{lowCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by student name or admission ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">All Types</option>
          <option value="tab_switch">Tab Switch</option>
          <option value="copy_attempt">Copy Attempt</option>
          <option value="paste_attempt">Paste Attempt</option>
          <option value="fullscreen_exit">Fullscreen Exit</option>
          <option value="suspicious_activity">Suspicious Activity</option>
        </select>
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">All Severity</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Violations List */}
      <div className="space-y-4 animate-slide-up" style={{ animationDelay: '500ms' }}>
        {filteredViolations.map((violation, index) => {
          const ViolationIcon = getViolationIcon(violation.type);
          return (
            <div 
              key={violation.id}
              className={`bg-card border rounded-xl p-5 animate-fade-in hover:shadow-soft transition-shadow ${
                violation.severity === 'high' ? 'border-destructive/30' :
                violation.severity === 'medium' ? 'border-warning/30' : 'border-border'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    violation.severity === 'high' ? 'bg-destructive/10' :
                    violation.severity === 'medium' ? 'bg-warning/10' : 'bg-muted'
                  }`}>
                    <ViolationIcon size={24} className={
                      violation.severity === 'high' ? 'text-destructive' :
                      violation.severity === 'medium' ? 'text-warning' : 'text-muted-foreground'
                    } />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground">{violation.studentName}</h3>
                      <code className="bg-secondary px-2 py-0.5 rounded text-xs text-foreground">{violation.admissionId}</code>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{violation.examTitle}</p>
                    <p className="text-foreground">{violation.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 lg:flex-col lg:items-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${getSeverityStyles(violation.severity)}`}>
                    {violation.severity}
                  </span>
                  <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground">
                    {getViolationLabel(violation.type)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(violation.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredViolations.length === 0 && (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <AlertTriangle size={48} className="text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No violations found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViolationsPage;
