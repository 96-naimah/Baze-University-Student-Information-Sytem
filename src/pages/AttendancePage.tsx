import { useState } from 'react';
import { ChevronDown, Search, Filter, Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { MOCK_COURSES, MOCK_STUDENTS, MOCK_ATTENDANCE, getStudentsByCourse } from '../data/mockData';
import { format, addDays, subDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  
  // Get students for selected course
  const studentsInCourse = selectedCourse 
    ? getStudentsByCourse(selectedCourse) 
    : [];

  // Filter students by search term
  const filteredStudents = studentsInCourse.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get days of the week for weekly view
  const weekDays = Array.from({ length: 5 }, (_, i) => {
    const day = addDays(startOfWeek(selectedDate, { weekStartsOn: 1 }), i);
    return {
      date: day,
      dayName: format(day, 'EEE'),
      dayNumber: format(day, 'd'),
      isToday: format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
    };
  });

  const navigateDay = (direction: 'prev' | 'next') => {
    setSelectedDate(prevDate => 
      direction === 'prev' ? subDays(prevDate, 1) : addDays(prevDate, 1)
    );
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setSelectedDate(prevDate => 
      direction === 'prev' ? subWeeks(prevDate, 1) : addWeeks(prevDate, 1)
    );
  };

  const getAttendanceStatusForDate = (studentId: string, date: Date) => {
    // In a real app, this would query the attendance records for the specific date
    const formattedDate = format(date, 'yyyy-MM-dd');
    const attendance = MOCK_ATTENDANCE.find(a => 
      a.studentId === studentId && a.date === formattedDate && a.courseId === selectedCourse
    );
    return attendance?.status || 'unknown';
  };

  const renderStatusBadge = (status: string) => {
    if (status === 'present') {
      return <span className="bg-success-50 text-success-700 px-2 py-0.5 rounded-full text-xs">Present</span>;
    } else if (status === 'absent') {
      return <span className="bg-error-50 text-error-700 px-2 py-0.5 rounded-full text-xs">Absent</span>;
    } else if (status === 'late') {
      return <span className="bg-warning-50 text-warning-700 px-2 py-0.5 rounded-full text-xs">Late</span>;
    } else if (status === 'excused') {
      return <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">Excused</span>;
    }
    return <span className="bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full text-xs">Not Recorded</span>;
  };

  return (
    <div className="page-transition">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage student attendance across courses.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex space-x-2">
            <button 
              className={`btn ${viewMode === 'day' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('day')}
            >
              Day
            </button>
            <button 
              className={`btn ${viewMode === 'week' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('week')}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Course Selection */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="relative">
              <label htmlFor="course-select" className="block text-sm font-medium text-gray-700 mb-1">
                Select Course
              </label>
              <select
                id="course-select"
                className="select appearance-none"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select a course</option>
                {MOCK_COURSES.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseCode} - {course.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 pt-6">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="search-students" className="block text-sm font-medium text-gray-700 mb-1">
              Search Students
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search-students"
                type="text"
                className="input pl-10"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={!selectedCourse}
              />
            </div>
          </div>
        </div>
        
        {/* Date Navigation */}
        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            {viewMode === 'day' ? (
              <h2 className="text-lg font-medium text-gray-900">
                {format(selectedDate, 'MMMM d, yyyy')}
              </h2>
            ) : (
              <h2 className="text-lg font-medium text-gray-900">
                Week of {format(weekDays[0].date, 'MMMM d')} - {format(weekDays[4].date, 'MMMM d, yyyy')}
              </h2>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => viewMode === 'day' ? navigateDay('prev') : navigateWeek('prev')}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {viewMode === 'day' ? 'Previous Day' : 'Previous Week'}
            </button>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => viewMode === 'day' ? setSelectedDate(new Date()) : setSelectedDate(new Date())}
            >
              Today
            </button>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => viewMode === 'day' ? navigateDay('next') : navigateWeek('next')}
            >
              {viewMode === 'day' ? 'Next Day' : 'Next Week'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Content */}
      {!selectedCourse ? (
        <div className="bg-white shadow-sm rounded-lg p-6 text-center">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Course Selected</h3>
          <p className="mt-1 text-sm text-gray-500">Please select a course to view and manage attendance.</p>
        </div>
      ) : viewMode === 'day' ? (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h3>
            <div className="flex space-x-2">
              <button className="btn btn-primary btn-sm">Save Attendance</button>
              <button className="btn btn-outline btn-sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
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
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {student.firstName} {student.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select 
                          className="select text-sm"
                          defaultValue={getAttendanceStatusForDate(student.id, selectedDate)}
                        >
                          <option value="unknown">-- Select Status --</option>
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                          <option value="excused">Excused</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          className="input text-sm"
                          placeholder="Add notes (optional)"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      No students found in this course or matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Weekly Attendance
            </h3>
            <div className="flex space-x-2">
              <button className="btn btn-outline btn-sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  {weekDays.map((day) => (
                    <th key={day.dayNumber} className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className={`flex flex-col items-center ${day.isToday ? 'text-primary-600' : ''}`}>
                        <span>{day.dayName}</span>
                        <span className={`mt-1 ${day.isToday ? 'bg-primary-100 text-primary-700 rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                          {day.dayNumber}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
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
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {student.firstName} {student.lastName}
                            </div>
                            <div className="text-xs text-gray-500">{student.studentId}</div>
                          </div>
                        </div>
                      </td>
                      {weekDays.map((day) => {
                        const status = getAttendanceStatusForDate(student.id, day.date);
                        return (
                          <td key={day.dayNumber} className="px-6 py-4 whitespace-nowrap text-center">
                            {renderStatusBadge(status)}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No students found in this course or matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendancePage;