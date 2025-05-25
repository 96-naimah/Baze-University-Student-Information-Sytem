import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Edit, 
  Plus 
} from 'lucide-react';
import { 
  MOCK_COURSES, 
  getStudentsByCourse, 
  getAttendanceByCourse 
} from '../../data/mockData';
import { Course, Student } from '../../types';

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    if (id) {
      const foundCourse = MOCK_COURSES.find(c => c.id === id) || null;
      setCourse(foundCourse);
      
      if (foundCourse) {
        setStudents(getStudentsByCourse(foundCourse.id));
      }
    }
  }, [id]);

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Course not found</h2>
          <p className="mt-2 text-gray-500">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses" className="mt-4 inline-block text-sm font-medium text-primary-600 hover:text-primary-500">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  // Generate schedule display
  const scheduleDisplay = `${course.schedule.days.join(', ')} ${course.schedule.startTime} - ${course.schedule.endTime}`;

  return (
    <div className="page-transition">
      {/* Back button */}
      <Link 
        to="/courses" 
        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Courses List
      </Link>

      {/* Course Header */}
      <div className="bg-white shadow-sm rounded-lg mb-6 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="flex items-center">
                <div className={`rounded-md p-2 mr-3 ${
                  course.department === 'Computer Science' ? 'bg-blue-100 text-blue-700' :
                  course.department === 'Business' ? 'bg-green-100 text-green-700' :
                  course.department === 'Engineering' ? 'bg-purple-100 text-purple-700' :
                  course.department === 'Psychology' ? 'bg-pink-100 text-pink-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{course.name}</h1>
                  <p className="text-sm text-gray-600">{course.courseCode} • {course.credits} Credits • {course.semester}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <span className={`badge ${
                course.status === 'active' ? 'badge-success' :
                course.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                'badge-warning'
              }`}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span>
              <button className="btn btn-outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Course
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Enrolled</p>
              <p className="text-sm font-medium">{course.enrolledStudents} / {course.maxStudents} Students</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Instructor</p>
              <p className="text-sm font-medium">{course.instructor}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Schedule</p>
              <p className="text-sm font-medium">{scheduleDisplay}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium">{course.schedule.location}</p>
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
                activeTab === 'students'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('students')}
            >
              Students
            </button>
            <button
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'assignments'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('assignments')}
            >
              Assignments
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
                activeTab === 'materials'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('materials')}
            >
              Materials
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Overview</h2>
            
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-600">
                {course.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Course Details</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Course Code</dt>
                    <dd className="mt-1 text-sm text-gray-900">{course.courseCode}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Department</dt>
                    <dd className="mt-1 text-sm text-gray-900">{course.department}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Semester</dt>
                    <dd className="mt-1 text-sm text-gray-900">{course.semester}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Credits</dt>
                    <dd className="mt-1 text-sm text-gray-900">{course.credits}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Schedule Information</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Days</dt>
                    <dd className="mt-1 text-sm text-gray-900">{course.schedule.days.join(', ')}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Time</dt>
                    <dd className="mt-1 text-sm text-gray-900">{course.schedule.startTime} - {course.schedule.endTime}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 text-sm text-gray-900">{course.schedule.location}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Instructor</dt>
                    <dd className="mt-1 text-sm text-gray-900">{course.instructor}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">Enrollment Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-500">Enrollment Status</div>
                  <span className={`badge ${
                    course.status === 'active' ? 'badge-success' :
                    course.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'badge-warning'
                  }`}>
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Enrolled Students</div>
                  <div className="text-sm font-medium">{course.enrolledStudents} / {course.maxStudents}</div>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-600 rounded-full" 
                    style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Enrolled Students</h2>
              <button className="btn btn-primary btn-sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Student
              </button>
            </div>
            
            {students.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {student.avatar ? (
                                <img
                                  src={student.avatar}
                                  alt={`${student.firstName} ${student.lastName}`}
                                  className="h-8 w-8 rounded-full mr-3"
                                />
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-3">
                                  <User className="h-4 w-4" />
                                </div>
                              )}
                              <Link to={`/students/${student.id}`} className="font-medium text-primary-600 hover:text-primary-800">
                                {student.firstName} {student.lastName}
                              </Link>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.studentId}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.program}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`badge ${
                              student.status === 'active' ? 'badge-success' :
                              student.status === 'suspended' ? 'badge-error' :
                              student.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                              'badge-warning'
                            }`}>
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <Link 
                                to={`/students/${student.id}`}
                                className="text-gray-600 hover:text-primary-600"
                              >
                                View
                              </Link>
                              <button className="text-gray-600 hover:text-error-600">Remove</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No students enrolled</h3>
                <p className="mt-1 text-sm text-gray-500">This course currently has no enrolled students.</p>
                <button className="mt-4 btn btn-outline btn-sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Students
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'assignments' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Course Assignments</h2>
              <button className="btn btn-primary btn-sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Assignment
              </button>
            </div>
            
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments yet</h3>
              <p className="mt-1 text-sm text-gray-500">Create assignments, quizzes, and exams for this course.</p>
              <button className="mt-4 btn btn-outline btn-sm">
                <Plus className="h-4 w-4 mr-1" />
                Create New Assignment
              </button>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Attendance Records</h2>
              <button className="btn btn-primary btn-sm">
                <Plus className="h-4 w-4 mr-1" />
                Record Attendance
              </button>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="text-sm font-medium">Select Date:</div>
                  <input
                    type="date"
                    className="input ml-2"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                  />
                </div>
                <div className="flex space-x-2">
                  <button className="btn btn-outline btn-sm">Previous Class</button>
                  <button className="btn btn-outline btn-sm">Next Class</button>
                </div>
              </div>
            </div>
            
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Clock className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No attendance recorded for this date</h3>
              <p className="mt-1 text-sm text-gray-500">Record attendance for students enrolled in this course.</p>
              <button className="mt-4 btn btn-outline btn-sm">
                <Plus className="h-4 w-4 mr-1" />
                Record Today's Attendance
              </button>
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Course Materials</h2>
              <button className="btn btn-primary btn-sm">
                <Plus className="h-4 w-4 mr-1" />
                Upload Material
              </button>
            </div>
            
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No materials uploaded</h3>
              <p className="mt-1 text-sm text-gray-500">Upload course materials such as slides, documents, or links.</p>
              <button className="mt-4 btn btn-outline btn-sm">
                <Plus className="h-4 w-4 mr-1" />
                Upload Course Material
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;