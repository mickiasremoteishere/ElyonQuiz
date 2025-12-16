import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? '*** Key Loaded ***' : 'MISSING KEY');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Types
export interface ExamResult {
  id?: string;
  student_id: string;
  student_name: string;
  exam_id: string;
  exam_title: string;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  answers: Record<string, number>;
  flagged_questions: string[];
  time_spent: number; // in seconds
  submitted_at: string;
}

// Function to save exam results
export const saveExamResult = async (result: Omit<ExamResult, 'id' | 'submitted_at'>) => {
  console.log('Attempting to save to Supabase with data:', JSON.stringify(result, null, 2));
  
  try {
    const { data, error } = await supabase
      .from('exam_results')
      .insert([
        { 
          ...result,
          submitted_at: new Date().toISOString()
        }
      ])
      .select();

    console.log('Supabase response - data:', data);
    
    if (error) {
      console.error('Error saving exam result:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Exception in saveExamResult:', error);
    throw error;
  }
};

// Function to get exam results for a student
export const getStudentExamResults = async (studentId: string) => {
  const { data, error } = await supabase
    .from('exam_results')
    .select('*')
    .eq('student_id', studentId)
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error fetching exam results:', error);
    throw error;
  }

  return data as ExamResult[];
};

// Function to check if a student has already taken an exam and get the result
export const hasStudentTakenExam = async (studentId: string, examId: string): Promise<ExamResult | null> => {
  const { data, error } = await supabase
    .from('exam_results')
    .select('*')
    .eq('student_id', studentId)
    .eq('exam_id', examId)
    .maybeSingle();

  if (error) {
    console.error('Error checking exam attempt:', error);
    return null;
  }

  return data as ExamResult | null;
};

// Function to save a cancelled exam
export const saveCancelledExam = async (studentId: string, studentName: string, examId: string, examTitle: string) => {
  const cancelledExam = {
    student_id: studentId,
    student_name: studentName,
    exam_id: examId,
    exam_title: examTitle,
    total_questions: 0,
    correct_answers: 0,
    score_percentage: 0, // 0% score for cancelled exams
    answers: { 
      _cancelled: true,
      _reason: 'Exam cancelled due to excessive tab switching (10+ times)'
    },
    flagged_questions: [],
    time_spent: 0
  };

  try {
    const { data, error } = await supabase
      .from('exam_results')
      .insert([cancelledExam])
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error saving cancelled exam:', error);
    throw error;
  }
};
