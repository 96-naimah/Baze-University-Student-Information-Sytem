import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  Calendar,
  ClipboardList, 
  Bell,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { 
  MOCK_STUDENTS, 
  MOCK_COURSES, 
  getCoursesByStudent 
} from '../data/mockData';
import DashboardChart from '../components/dashboard/DashboardChart';

const DashboardPage = () => {
  const { user } = useAuth();
  const [recentAnnouncements] = useState([
    {
      id: '1',
      title: 'Fall Semester Registration',
      date: '2023-08-15',
      content: 'Registration for Fall 2023 semester is now open. Please complete your course selection by August 30.'
    },
    {
      id: '2',
      title: 'Campus Maintenance',
      date: '2023-08-12',
      content: 'The main library will be closed for renovations from August 15-20. Alternative study spaces will be available in the Student Center.'
    },
    {
      id: '3',
      title: 'New Learning Management System',
      date: '2023-08-10',
      content: 'We are transitioning to a new learning management system. Training sessions will be held next week.'
    }
  ]);

  const [userCourses, setUserCourses] = useState<typeof MOCK_COURSES>([]);

  useEffect(() => {
    if (user && user.role === 'student') {
      // For demo, we'll assume the logged-in student is the first one
      setUserCourses(getCoursesByStudent('1'));
    } else {
      // For admin/faculty, show all courses
      setUserCourses(MOCK_COURSES.slice(0, 3));
    }
  }, [user]);

  // Dashboard stats
  const stats = [
    { name: 'Total Students', value: MOCK_STUDENTS.length, icon: GraduationCap, color: 'bg-primary-100 text-primary-800' },
    { name: 'Active Courses', value: MOCK_COURSES.length, icon: BookOpen, color: 'bg-secondary-100 text-secondary-800' },
    { name: 'Upcoming Assignments', value: 8, icon: ClipboardList, color: 'bg-accent-100 text-accent-800' },
    { name: 'Attendance Rate', value: '94%', icon: Calendar, color: 'bg-success-50 text-success-700' },
  ];

  // Upcoming deadlines
  const upcomingDeadlines = [
    { id: '1', title: 'Mid-term Exam: CS101', dueDate: '2023-10-15', type: 'exam' },
    { id: '2', title: 'Research Paper: BUS202', dueDate: '2023-10-10', type: 'assignment' },
    { id: '3', title: 'Lab Report: ENG304', dueDate: '2023-10-05', type: 'assignment' },
  ];

  return (
    <div className="page-transition">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {user?.name}! Here's what's happening today.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
                  <p className="mt-1 text-xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary-500" />
              Performance Overview
            </h2>
            <select className="text-sm border-gray-300 rounded-md">
              <option>This Semester</option>
              <option>Previous Semester</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-72">
            <DashboardChart />
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <Bell className="h-5 w-5 mr-2 text-primary-500" />
            Recent Announcements
          </h2>
          <div className="space-y-4 overflow-y-auto max-h-72">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                <h3 className="text-sm font-medium text-gray-900">{announcement.title}</h3>
                <p className="text-xs text-gray-500">{announcement.date}</p>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{announcement.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View All Announcements
            </a>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary-500" />
            {user?.role === 'student' ? 'Your Courses' : 'Recent Courses'}
          </h2>
          <Link to="/courses" className="text-sm font-medium text-primary-600 hover:text-primary-500">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userCourses.map((course) => (
            <Link to={`/courses/${course.id}`} key={course.id} className="block">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className={`h-2 ${
                  course.department === 'Computer Science' ? 'bg-blue-500' :
                  course.department === 'Business' ? 'bg-green-500' :
                  course.department === 'Engineering' ? 'bg-purple-500' :
                  course.department === 'Psychology' ? 'bg-pink-500' :
                  course.department === 'Mathematics' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}></div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-500">{course.courseCode} • {course.credits} credits</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {course.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.description}</p>
                  <div className="mt-4 text-sm text-gray-600">
                    <p><span className="font-medium">Instructor:</span> {course.instructor}</p>
                    <p><span className="font-medium">Schedule:</span> {course.schedule.days.join(', ')} {course.schedule.startTime}-{course.schedule.endTime}</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center text-sm">
                    <span className="text-gray-600">{course.enrolledStudents}/{course.maxStudents} students</span>
                    <span className="font-medium text-primary-600">View Details</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary-500" />
            Upcoming Deadlines
          </h2>
          <Link to="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
            View Calendar
          </Link>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {upcomingDeadlines.map((deadline) => (
              <li key={deadline.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`inline-flex p-2 rounded-full ${
                      deadline.type === 'exam' ? 'bg-error-50 text-error-700' : 'bg-primary-50 text-primary-700'
                    }`}>
                      {deadline.type === 'exam' ? (
                        <ClipboardList className="h-5 w-5" />
                      ) : (
                        <BookOpen className="h-5 w-5" />
                      )}
                    </span>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                      <p className="text-xs text-gray-500">{deadline.type.charAt(0).toUpperCase() + deadline.type.slice(1)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Due: {deadline.dueDate}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(deadline.dueDate) > new Date() 
                        ? `${Math.ceil((new Date(deadline.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left` 
                        : 'Overdue'}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;