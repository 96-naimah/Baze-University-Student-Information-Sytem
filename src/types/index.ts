export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
  avatar?: string;
}

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  program: string;
  batch: string;
  avatar?: string;
}

export interface Course {
  id: string;
  courseCode: string;
  name: string;
  description: string;
  credits: number;
  department: string;
  semester: string;
  instructor: string;
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
    location: string;
  };
  maxStudents: number;
  enrolledStudents: number;
  status: 'active' | 'inactive' | 'upcoming';
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  status: 'enrolled' | 'dropped' | 'completed';
  grade?: Grade;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  assignments: {
    id: string;
    name: string;
    score: number;
    maxScore: number;
    weight: number;
  }[];
  midtermExam?: {
    score: number;
    maxScore: number;
    weight: number;
  };
  finalExam?: {
    score: number;
    maxScore: number;
    weight: number;
  };
  totalScore?: number;
  letterGrade?: string;
  gpa?: number;
  comments?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  date: string;
  read: boolean;
  targetUserIds: string[];
}