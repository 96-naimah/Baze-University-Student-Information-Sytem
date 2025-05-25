import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  BookOpen,
  ClipboardList,
  Clock,
  Edit
} from 'lucide-react';
import { 
  MOCK_STUDENTS, 
  getCoursesByStudent,
  getGradesByStudent,
  getAttendanceByStudent
} from '../../data/mockData';
import { Student, Course, Grade, Attendance } from '../../types';

const StudentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    if (id) {
      const foundStudent = MOCK_STUDENTS.find(s => s.id === id) || null;
      setStudent(foundStudent);
      
      if (foundStudent) {
        setCourses(getCoursesByStudent(foundStudent.id));
        setGrades(getGradesByStudent(foundStudent.id));
        setAttendance(getAttendanceByStudent(foundStudent.id));
      }
    }
  }, [id]);

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Student not found</h2>
          <p className="mt-2 text-gray-500">The student you're looking for doesn't exist or has been removed.</p>
          <Link to="/students" className="mt-4 inline-block text-sm font-medium text-primary-600 hover:text-primary-500">
            ← Back to Students
          </Link>
        </div>
      </div>
    );
  }

  // Calculate GPA
  const calculateGPA = (grades: Grade[]) => {
    if (grades.length === 0) return 0;
    const totalGPA = grades.reduce((sum, grade) => sum + (grade.gpa || 0), 0);
    return (totalGPA / grades.length).toFixed(2);
  };

  // Calculate attendance rate
  const calculateAttendanceRate = (attendance: Attendance[]) => {
    if (attendance.length === 0) return '0%';
    const present = attendance.filter(a => a.status === 'present' || a.status === 'late').length;
    return `${Math.round((present / attendance.length) * 100)}%`;
  };

  return (
    <div className="page-transition">
      {/* Back button */}
      <Link 
        to="/students" 
        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Students List
      </Link>

      {/* Student Header */}
      <div className="bg-white shadow-sm rounded-lg mb-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Student Image */}
          <div className="sm:w-64 flex justify-center sm:justify-start p-6 bg-gray-50">
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={`${student.firstName} ${student.lastName}`}
                className="h-40 w-40 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="h-40 w-40 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 border-4 border-white shadow-md">
                <User className="h-20 w-20" />
              </div>
            )}
          </div>

          {/* Student Info */}
          <div className="flex-1 p-6">
            <div className="flex flex-wrap items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-sm text-gray-500">{student.studentId}</p>
                
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-1.5 text-gray-400" />
                    {student.email}
                  </div>
                  {student.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-1.5 text-gray-400" />
                      {student.phone}
                    </div>
                  )}
                  {student.dateOfBirth && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                      {student.dateOfBirth}
                    </div>
                  )}
                  {student.address && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                      {student.address.city}, {student.address.state}, {student.address.country}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 sm:mt-0">
                <span className={`badge ${
                  student.status === 'active' ? 'badge-success' :
                  student.status === 'suspended' ? 'badge-error' :
                  student.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                  'badge-warning'
                }`}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
                <button className="btn btn-outline mt-2 w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Program</div>
                <div className="text-base font-medium text-gray-900">{student.program}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Batch</div>
                <div className="text-base font-medium text-gray-900">{student.batch}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">GPA</div>
                <div className="text-base font-medium text-gray-900">{calculateGPA(grades)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Attendance</div>
                <div className="text-base font-medium text-gray-900">{calculateAttendanceRate(attendance)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200">
          <nav className="flex overflow-x-auto">
            <button
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'courses'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('courses')}
            >
              Courses
            </button>
            <button
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'grades'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('grades')}
            >
              Grades
            </button>
            <button
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'attendance'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('attendance')}
            >
              Attendance
            </button>
            <button
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Overview</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Personal Information</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{student.firstName} {student.lastName}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Student ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">{student.studentId}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900">{student.email}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                    <dd className="mt-1 text-sm text-gray-900">{student.phone || 'Not provided'}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Date of birth</dt>
                    <dd className="mt-1 text-sm text-gray-900">{student.dateOfBirth || 'Not provided'}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                    <dd className="mt-1 text-sm text-gray-900">{student.gender || 'Not provided'}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {student.address ? (
                        <>
                          {student.address.street}, {student.address.city}, {student.address.state} {student.address.zipCode}, {student.address.country}
                        </>
                      ) : (
                        'Not provided'
                      )}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Academic Information</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Program</dt>
                    <dd className="mt-1 text-sm text-gray-900">{student.program}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Batch</dt>
                    <dd className="mt-1 text-sm text-gray-900">{student.batch}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Enrollment Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">{student.enrollmentDate}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <span className={`badge ${
                        student.status === 'active' ? 'badge-success' :
                        student.status === 'suspended' ? 'badge-error' :
                        student.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                        'badge-warning'
                      }`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Current GPA</dt>
                    <dd className="mt-1 text-sm text-gray-900">{calculateGPA(grades)}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Attendance Rate</dt>
                    <dd className="mt-1 text-sm text-gray-900">{calculateAttendanceRate(attendance)}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Current Courses</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {courses.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {courses.map((course) => (
                            <li key={course.id}>{course.courseCode} - {course.name}</li>
                          ))}
                        </ul>
                      ) : (
                        'No courses enrolled'
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Enrolled Courses</h2>
              <button className="btn btn-primary btn-sm">
                <Plus className="h-4 w-4 mr-1" />
                Enroll in Course
              </button>
            </div>
            
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between">
                      <h3 className="text-md font-medium text-gray-900">{course.name}</h3>
                      <span className="badge badge-success">{course.status}</span>
                    </div>
                    <p className="text-sm text-gray-500">{course.courseCode} • {course.credits} credits</p>
                    <div className="mt-2 text-sm">
                      <p><span className="font-medium">Instructor:</span> {course.instructor}</p>
                      <p><span className="font-medium">Schedule:</span> {course.schedule.days.join(', ')} at {course.schedule.startTime}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpen className="h-4 w-4 mr-1.5 text-gray-400" />
                        {course.department}
                      </div>
                      <Link to={`/courses/${course.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-800">
                        View Course
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No courses enrolled</h3>
                <p className="mt-1 text-sm text-gray-500">This student is not enrolled in any courses.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'grades' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Grades</h2>
            
            {grades.length > 0 ? (
              <div className="space-y-6">
                {grades.map((grade) => {
                  const course = courses.find(c => c.id === grade.courseId);
                  return (
                    <div key={grade.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                          <h3 className="text-md font-medium text-gray-900">
                            {course?.courseCode} - {course?.name}
                          </h3>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-700 mr-2">Final Grade:</span>
                            <span className={`badge ${
                              parseFloat(grade.letterGrade?.substring(0, 1) || '0') >= 3.5 ? 'badge-success' :
                              parseFloat(grade.letterGrade?.substring(0, 1) || '0') >= 2.5 ? 'badge-warning' :
                              'badge-error'
                            }`}>
                              {grade.letterGrade} ({grade.gpa})
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Assignments</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {grade.assignments.map((assignment) => (
                                <tr key={assignment.id}>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{assignment.name}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {assignment.score} / {assignment.maxScore}
                                    <span className="ml-2 text-xs text-gray-500">
                                      ({Math.round((assignment.score / assignment.maxScore) * 100)}%)
                                    </span>
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{assignment.weight * 100}%</td>
                                </tr>
                              ))}
                              {grade.midtermExam && (
                                <tr>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Midterm Exam</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {grade.midtermExam.score} / {grade.midtermExam.maxScore}
                                    <span className="ml-2 text-xs text-gray-500">
                                      ({Math.round((grade.midtermExam.score / grade.midtermExam.maxScore) * 100)}%)
                                    </span>
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{grade.midtermExam.weight * 100}%</td>
                                </tr>
                              )}
                              {grade.finalExam && (
                                <tr>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Final Exam</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {grade.finalExam.score} / {grade.finalExam.maxScore}
                                    <span className="ml-2 text-xs text-gray-500">
                                      ({Math.round((grade.finalExam.score / grade.finalExam.maxScore) * 100)}%)
                                    </span>
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{grade.finalExam.weight * 100}%</td>
                                </tr>
                              )}
                            </tbody>
                            <tfoot>
                              <tr className="bg-gray-50">
                                <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900" colSpan={2}>
                                  {grade.totalScore}%
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                        
                        {grade.comments && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Comments</h4>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{grade.comments}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No grades available</h3>
                <p className="mt-1 text-sm text-gray-500">This student has no recorded grades yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'attendance' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Records</h2>
            
            {attendance.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {attendance.map((record) => {
                        const course = courses.find(c => c.id === record.courseId);
                        return (
                          <tr key={record.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {course?.courseCode} - {course?.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                record.status === 'present' ? 'bg-success-50 text-success-700' :
                                record.status === 'absent' ? 'bg-error-50 text-error-700' :
                                record.status === 'late' ? 'bg-warning-50 text-warning-700' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                <span className={`h-2 w-2 rounded-full mr-1.5 ${
                                  record.status === 'present' ? 'bg-success-700' :
                                  record.status === 'absent' ? 'bg-error-700' :
                                  record.status === 'late' ? 'bg-warning-700' :
                                  'bg-gray-400'
                                }`}></span>
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{record.notes || '-'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Clock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No attendance records</h3>
                <p className="mt-1 text-sm text-gray-500">This student has no recorded attendance yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Student Documents</h2>
              <button className="btn btn-primary btn-sm">
                <Plus className="h-4 w-4 mr-1" />
                Upload Document
              </button>
            </div>
            
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents uploaded</h3>
              <p className="mt-1 text-sm text-gray-500">Upload student documents such as transcripts, certificates, or ID.</p>
              <button className="mt-4 btn btn-outline btn-sm">
                <Plus className="h-4 w-4 mr-1" />
                Upload New Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetailPage;