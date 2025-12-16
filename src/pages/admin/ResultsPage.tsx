import { useState } from 'react';
import { studentResults, StudentResult } from '@/data/mockData';
import { Search, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react';

const ResultsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterExam, setFilterExam] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const uniqueExams = [...new Set(studentResults.map(r => r.examTitle))];

  const filteredResults = studentResults.filter((result) => {
    const matchesSearch = 
      result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.admissionId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExam = filterExam === 'all' || result.examTitle === filterExam;
    const matchesStatus = filterStatus === 'all' || result.status === filterStatus;
    return matchesSearch && matchesExam && matchesStatus;
  });

  const averageScore = filteredResults.length > 0 
    ? Math.round(filteredResults.reduce((acc, r) => acc + r.percentage, 0) / filteredResults.length)
    : 0;

  const passRate = filteredResults.length > 0
    ? Math.round((filteredResults.filter(r => r.status === 'passed').length / filteredResults.length) * 100)
    : 0;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 animate-fade-in">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Results</h1>
          <p className="text-muted-foreground mt-1">View and analyze exam results</p>
        </div>
        <button className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <Download size={18} />
          Export Results
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4 animate-slide-up">
          <p className="text-sm text-muted-foreground">Total Results</p>
          <p className="text-2xl font-display font-bold text-foreground">{filteredResults.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <p className="text-sm text-muted-foreground">Average Score</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-display font-bold text-foreground">{averageScore}%</p>
            <TrendingUp size={18} className="text-success" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <p className="text-sm text-muted-foreground">Pass Rate</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-display font-bold text-foreground">{passRate}%</p>
            {passRate >= 60 ? <TrendingUp size={18} className="text-success" /> : <TrendingDown size={18} className="text-destructive" />}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or admission ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <select
          value={filterExam}
          onChange={(e) => setFilterExam(e.target.value)}
          className="px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">All Exams</option>
          {uniqueExams.map(exam => (
            <option key={exam} value={exam}>{exam}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">All Status</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Results Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden animate-slide-up" style={{ animationDelay: '400ms' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Student</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Admission ID</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Exam</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Score</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Percentage</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Duration</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result, index) => (
                <tr 
                  key={result.id} 
                  className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{result.studentName}</p>
                      <p className="text-xs text-muted-foreground">{result.class} - {result.section}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="bg-secondary px-2 py-1 rounded text-sm text-foreground">{result.admissionId}</code>
                  </td>
                  <td className="px-6 py-4 text-foreground">{result.examTitle}</td>
                  <td className="px-6 py-4 text-foreground font-medium">
                    {result.score}/{result.totalQuestions}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${result.percentage >= 60 ? 'bg-success' : 'bg-destructive'}`}
                          style={{ width: `${result.percentage}%` }}
                        />
                      </div>
                      <span className={`font-medium ${result.percentage >= 60 ? 'text-success' : 'text-destructive'}`}>
                        {result.percentage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{result.duration} min</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      result.status === 'passed' 
                        ? 'bg-success/10 text-success border border-success/20' 
                        : 'bg-destructive/10 text-destructive border border-destructive/20'
                    }`}>
                      {result.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
