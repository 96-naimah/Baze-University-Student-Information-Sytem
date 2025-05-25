import { User, Student, Course, Enrollment, Grade, Attendance } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@edutrack.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Dr. Alan Turing',
    email: 'faculty@edutrack.com',
    role: 'faculty',
  },
  {
    id: '3',
    name: 'Student User',
    email: 'student@edutrack.com',
    role: 'student',
  },
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    studentId: 'CS10001',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.j@edutrack.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1998-03-15',
    gender: 'Male',
    address: {
      street: '123 University Ave',
      city: 'College Town',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
    },
    enrollmentDate: '2021-09-01',
    status: 'active',
    program: 'Computer Science',
    batch: '2021',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    studentId: 'CS10002',
    firstName: 'Mia',
    lastName: 'Williams',
    email: 'mia.w@edutrack.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1999-05-22',
    gender: 'Female',
    address: {
      street: '456 College Blvd',
      city: 'Academic City',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    enrollmentDate: '2021-09-01',
    status: 'active',
    program: 'Computer Science',
    batch: '2021',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '3',
    studentId: 'CS10003',
    firstName: 'James',
    lastName: 'Smith',
    email: 'james.s@edutrack.com',
    phone: '(555) 345-6789',
    dateOfBirth: '1998-11-08',
    gender: 'Male',
    address: {
      street: '789 Learning Lane',
      city: 'Studyville',
      state: 'TX',
      zipCode: '75001',
      country: 'USA',
    },
    enrollmentDate: '2022-01-15',
    status: 'active',
    program: 'Computer Science',
    batch: '2022',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '4',
    studentId: 'CS10004',
    firstName: 'Sophia',
    lastName: 'Garcia',
    email: 'sophia.g@edutrack.com',
    phone: '(555) 456-7890',
    dateOfBirth: '1997-07-30',
    gender: 'Female',
    address: {
      street: '321 Education Dr',
      city: 'Knowledge Park',
      state: 'FL',
      zipCode: '33101',
      country: 'USA',
    },
    enrollmentDate: '2020-09-01',
    status: 'active',
    program: 'Computer Science',
    batch: '2020',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '5',
    studentId: 'CS10005',
    firstName: 'Ethan',
    lastName: 'Brown',
    email: 'ethan.b@edutrack.com',
    phone: '(555) 567-8901',
    dateOfBirth: '1999-01-14',
    gender: 'Male',
    address: {
      street: '555 Campus Circle',
      city: 'Degree City',
      state: 'IL',
      zipCode: '60601',
      country: 'USA',
    },
    enrollmentDate: '2021-09-01',
    status: 'active',
    program: 'Computer Science',
    batch: '2021',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    courseCode: 'CS101',
    name: 'Introduction to Computer Science',
    description: 'An introductory course covering the basics of computer science, programming, and computational thinking.',
    credits: 3,
    department: 'Computer Science',
    semester: 'Fall 2023',
    instructor: 'Dr. Alan Turing',
    schedule: {
      days: ['Monday', 'Wednesday'],
      startTime: '09:00',
      endTime: '10:30',
      location: 'Building A, Room 101',
    },
    maxStudents: 35,
    enrolledStudents: 30,
    status: 'active',
  },
  {
    id: '2',
    courseCode: 'CS202',
    name: 'Data Structures and Algorithms',
    description: 'Advanced course covering fundamental data structures and algorithms used in computer science.',
    credits: 3,
    department: 'Computer Science',
    semester: 'Fall 2023',
    instructor: 'Dr. Jane Smith',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      startTime: '11:00',
      endTime: '12:30',
      location: 'Building B, Room 205',
    },
    maxStudents: 40,
    enrolledStudents: 35,
    status: 'active',
  },
  {
    id: '3',
    courseCode: 'CS304',
    name: 'Database Systems',
    description: 'Introduction to database design, implementation, and management systems.',
    credits: 4,
    department: 'Computer Science',
    semester: 'Fall 2023',
    instructor: 'Dr. Robert Chen',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      startTime: '13:00',
      endTime: '14:00',
      location: 'Computer Lab, Room 302',
    },
    maxStudents: 30,
    enrolledStudents: 28,
    status: 'active',
  },
  {
    id: '4',
    courseCode: 'CS401',
    name: 'Software Engineering',
    description: 'Principles and practices of software engineering, including design patterns and project management.',
    credits: 3,
    department: 'Computer Science',
    semester: 'Fall 2023',
    instructor: 'Dr. Maria Garcia',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      startTime: '14:00',
      endTime: '15:30',
      location: 'Building A, Room 110',
    },
    maxStudents: 45,
    enrolledStudents: 42,
    status: 'active',
  },
  {
    id: '5',
    courseCode: 'CS320',
    name: 'Computer Networks',
    description: 'Fundamentals of computer networking, protocols, and network security.',
    credits: 4,
    department: 'Computer Science',
    semester: 'Fall 2023',
    instructor: 'Prof. David Wilson',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      startTime: '10:00',
      endTime: '11:00',
      location: 'Network Lab, Room 204',
    },
    maxStudents: 30,
    enrolledStudents: 25,
    status: 'active',
  },
];

export const MOCK_ENROLLMENTS: Enrollment[] = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    enrollmentDate: '2023-08-20',
    status: 'enrolled',
  },
  {
    id: '2',
    studentId: '1',
    courseId: '3',
    enrollmentDate: '2023-08-20',
    status: 'enrolled',
  },
  {
    id: '3',
    studentId: '2',
    courseId: '2',
    enrollmentDate: '2023-08-15',
    status: 'enrolled',
  },
  {
    id: '4',
    studentId: '2',
    courseId: '4',
    enrollmentDate: '2023-08-15',
    status: 'enrolled',
  },
  {
    id: '5',
    studentId: '3',
    courseId: '1',
    enrollmentDate: '2023-08-18',
    status: 'enrolled',
  },
  {
    id: '6',
    studentId: '3',
    courseId: '5',
    enrollmentDate: '2023-08-18',
    status: 'enrolled',
  },
  {
    id: '7',
    studentId: '4',
    courseId: '2',
    enrollmentDate: '2023-08-20',
    status: 'enrolled',
  },
  {
    id: '8',
    studentId: '4',
    courseId: '4',
    enrollmentDate: '2023-08-20',
    status: 'enrolled',
  },
  {
    id: '9',
    studentId: '5',
    courseId: '3',
    enrollmentDate: '2023-08-21',
    status: 'enrolled',
  },
  {
    id: '10',
    studentId: '5',
    courseId: '5',
    enrollmentDate: '2023-08-21',
    status: 'enrolled',
  },
];

export const MOCK_GRADES: Grade[] = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    assignments: [
      { id: 'a1', name: 'Programming Assignment 1', score: 85, maxScore: 100, weight: 0.15 },
      { id: 'a2', name: 'Programming Assignment 2', score: 90, maxScore: 100, weight: 0.15 },
      { id: 'a3', name: 'Programming Assignment 3', score: 78, maxScore: 100, weight: 0.15 }
    ],
    midtermExam: { score: 88, maxScore: 100, weight: 0.25 },
    finalExam: { score: 92, maxScore: 100, weight: 0.3 },
    totalScore: 87.7,
    letterGrade: 'B+',
    gpa: 3.5,
    comments: 'Excellent work throughout the semester.'
  },
  {
    id: '2',
    studentId: '1',
    courseId: '3',
    assignments: [
      { id: 'a1', name: 'Database Project 1', score: 92, maxScore: 100, weight: 0.2 },
      { id: 'a2', name: 'Database Project 2', score: 88, maxScore: 100, weight: 0.2 }
    ],
    midtermExam: { score: 90, maxScore: 100, weight: 0.3 },
    finalExam: { score: 94, maxScore: 100, weight: 0.3 },
    totalScore: 91.2,
    letterGrade: 'A-',
    gpa: 3.7,
    comments: 'Outstanding performance in all areas.'
  },
  {
    id: '3',
    studentId: '2',
    courseId: '2',
    assignments: [
      { id: 'a1', name: 'Algorithm Analysis 1', score: 76, maxScore: 100, weight: 0.1 },
      { id: 'a2', name: 'Algorithm Analysis 2', score: 84, maxScore: 100, weight: 0.15 },
      { id: 'a3', name: 'Data Structures Project', score: 88, maxScore: 100, weight: 0.15 }
    ],
    midtermExam: { score: 82, maxScore: 100, weight: 0.3 },
    finalExam: { score: 85, maxScore: 100, weight: 0.3 },
    totalScore: 83.7,
    letterGrade: 'B',
    gpa: 3.0,
    comments: 'Good understanding of core concepts.'
  }
];

export const MOCK_ATTENDANCE: Attendance[] = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    date: '2023-09-05',
    status: 'present'
  },
  {
    id: '2',
    studentId: '1',
    courseId: '1',
    date: '2023-09-07',
    status: 'present'
  },
  {
    id: '3',
    studentId: '1',
    courseId: '1',
    date: '2023-09-12',
    status: 'absent',
    notes: 'Medical appointment'
  },
  {
    id: '4',
    studentId: '1',
    courseId: '1',
    date: '2023-09-14',
    status: 'present'
  },
  {
    id: '5',
    studentId: '1',
    courseId: '3',
    date: '2023-09-04',
    status: 'present'
  },
  {
    id: '6',
    studentId: '1',
    courseId: '3',
    date: '2023-09-06',
    status: 'late',
    notes: 'Arrived 15 minutes late'
  }
];

// Get students for a specific course
export const getStudentsByCourse = (courseId: string) => {
  const enrollments = MOCK_ENROLLMENTS.filter(enrollment => enrollment.courseId === courseId);
  return enrollments.map(enrollment => 
    MOCK_STUDENTS.find(student => student.id === enrollment.studentId)
  ).filter((student): student is Student => student !== undefined);
};

// Get courses for a specific student
export const getCoursesByStudent = (studentId: string) => {
  const enrollments = MOCK_ENROLLMENTS.filter(enrollment => enrollment.studentId === studentId);
  return enrollments.map(enrollment => 
    MOCK_COURSES.find(course => course.id === enrollment.courseId)
  ).filter((course): course is Course => course !== undefined);
};

// Get grades for a specific student
export const getGradesByStudent = (studentId: string) => {
  return MOCK_GRADES.filter(grade => grade.studentId === studentId);
};

// Get attendance for a specific student
export const getAttendanceByStudent = (studentId: string) => {
  return MOCK_ATTENDANCE.filter(attendance => attendance.studentId === studentId);
};

// Get attendance records for a specific course
export const getAttendanceByCourse = (courseId: string) => {
  return MOCK_ATTENDANCE.filter(attendance => attendance.courseId === courseId);
};