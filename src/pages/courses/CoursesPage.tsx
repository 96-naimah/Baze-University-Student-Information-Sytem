import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Plus, 
  Search, 
  Filter, 
  BookOpen, 
  Users 
} from 'lucide-react';
import { MOCK_COURSES } from '../../data/mockData';
import { Course } from '../../types';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Get unique departments for filter
  const departments = [...new Set(MOCK_COURSES.map(course => course.department))];

  // Filter and sort courses
  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = searchTerm === '' || 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || course.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  }).sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'code') {
      comparison = a.courseCode.localeCompare(b.courseCode);
    } else if (sortBy === 'instructor') {
      comparison = a.instructor.localeCompare(b.instructor);
    } else if (sortBy === 'students') {
      comparison = a.enrolledStudents - b.enrolledStudents;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="page-transition">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage all courses, schedules, and enrollments.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="btn btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative col-span-1 md:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search by course name, code, or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <div className="relative">
              <select
                className="select appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          <div>
            <div className="relative">
              <select
                className="select appearance-none"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Showing {filteredCourses.length} of {MOCK_COURSES.length} courses
          </div>
          <button className="btn btn-outline text-xs flex items-center">
            <Filter className="h-3 w-3 mr-1" />
            More Filters
          </button>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th 
                  className="cursor-pointer"
                  onClick={() => toggleSort('code')}
                >
                  <div className="flex items-center">
                    <span>Course Code</span>
                    {sortBy === 'code' && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}
                      />
                    )}
                  </div>
                </th>
                <th 
                  className="cursor-pointer"
                  onClick={() => toggleSort('name')}
                >
                  <div className="flex items-center">
                    <span>Course Name</span>
                    {sortBy === 'name' && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}
                      />
                    )}
                  </div>
                </th>
                <th>Department</th>
                <th 
                  className="cursor-pointer"
                  onClick={() => toggleSort('instructor')}
                >
                  <div className="flex items-center">
                    <span>Instructor</span>
                    {sortBy === 'instructor' && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}
                      />
                    )}
                  </div>
                </th>
                <th 
                  className="cursor-pointer"
                  onClick={() => toggleSort('students')}
                >
                  <div className="flex items-center">
                    <span>Students</span>
                    {sortBy === 'students' && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}
                      />
                    )}
                  </div>
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course: Course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="font-medium">{course.courseCode}</td>
                  <td>
                    <Link to={`/courses/${course.id}`} className="font-medium text-primary-600 hover:text-primary-800">
                      {course.name}
                    </Link>
                    <p className="text-xs text-gray-500">{course.credits} credits • {course.semester}</p>
                  </td>
                  <td>{course.department}</td>
                  <td>{course.instructor}</td>
                  <td className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{course.enrolledStudents}/{course.maxStudents}</span>
                  </td>
                  <td>
                    <span className={`badge ${
                      course.status === 'active' ? 'badge-success' :
                      course.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      'badge-warning'
                    }`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <Link 
                        to={`/courses/${course.id}`}
                        className="text-gray-600 hover:text-primary-600"
                      >
                        View
                      </Link>
                      <button className="text-gray-600 hover:text-primary-600">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No courses found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCourses.length}</span> of{' '}
                <span className="font-medium">{filteredCourses.length}</span> results
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="btn btn-outline" disabled>Previous</button>
              <button className="btn btn-outline" disabled>Next</button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default CoursesPage;