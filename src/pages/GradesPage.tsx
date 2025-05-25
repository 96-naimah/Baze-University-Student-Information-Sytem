import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Search, 
  Filter, 
  FileText, 
  Download,
  BarChart2
} from 'lucide-react';
import { MOCK_COURSES, MOCK_STUDENTS, MOCK_GRADES } from '../data/mockData';
import { Grade } from '../types';

const GradesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [studentFilter, setStudentFilter] = useState('all');

  // Combine grades with course and student info
  const gradeDetails = MOCK_GRADES.map(grade => {
    const course = MOCK_COURSES.find(c => c.id === grade.courseId);
    const student = MOCK_STUDENTS.find(s => s.id === grade.studentId);
    
    return {
      ...grade,
      courseName: course?.name || 'Unknown Course',
      courseCode: course?.courseCode || 'Unknown',
      studentName: student ? `${student.firstName} ${student.lastName}` : 'Unknown Student',
      studentId: student?.studentId || 'Unknown'
    };
  });

  // Filter grades
  const filteredGrades = gradeDetails.filter(grade => {
    const matchesSearch = searchTerm === '' || 
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      grade.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = courseFilter === 'all' || grade.courseId === courseFilter;
    const matchesStudent = studentFilter === 'all' || grade.studentId === studentFilter;
    
    return matchesSearch && matchesCourse && matchesStudent;
  });

  const renderGradeColor = (grade: string) => {
    const firstChar = grade.charAt(0);
    if (firstChar === 'A') return 'text-success-700';
    if (firstChar === 'B') return 'text-primary-600';
    if (firstChar === 'C') return 'text-accent-600';
    if (firstChar === 'D') return 'text-warning-600';
    return 'text-error-600';
  };

  return (
    <div className="page-transition">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grades</h1>
          <p className="mt-1 text-sm text-gray-500">
            View, manage, and analyze student grades across all courses.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button className="btn btn-outline flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" />
            Analytics
          </button>
          <button className="btn btn-outline flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search by student or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <div className="relative">
              <select
                className="select appearance-none"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="all">All Courses</option>
                {MOCK_COURSES.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseCode} - {course.name}
                  </option>
                ))}
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
                value={studentFilter}
                onChange={(e) => setStudentFilter(e.target.value)}
              >
                <option value="all">All Students</option>
                {MOCK_STUDENTS.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName} ({student.studentId})
                  </option>
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
            Showing {filteredGrades.length} of {gradeDetails.length} grade records
          </div>
          <button className="btn btn-outline text-xs flex items-center">
            <Filter className="h-3 w-3 mr-1" />
            More Filters
          </button>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Assignments</th>
                <th>Midterm</th>
                <th>Final</th>
                <th>Total Score</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrades.map((grade: Grade & { 
                studentName: string; 
                studentId: string;
                courseName: string;
                courseCode: string;
              }) => (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td>
                    <Link to={`/students/${grade.studentId}`} className="font-medium text-primary-600 hover:text-primary-800">
                      {grade.studentName}
                    </Link>
                    <p className="text-xs text-gray-500">{grade.studentId}</p>
                  </td>
                  <td>
                    <Link to={`/courses/${grade.courseId}`} className="font-medium text-primary-600 hover:text-primary-800">
                      {grade.courseName}
                    </Link>
                    <p className="text-xs text-gray-500">{grade.courseCode}</p>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      {grade.assignments.map((assignment, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{assignment.score}/{assignment.maxScore}</span>
                          <span className="text-xs text-gray-500 ml-1">({Math.round(assignment.score/assignment.maxScore*100)}%)</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    {grade.midtermExam ? (
                      <div className="text-sm">
                        <span className="font-medium">{grade.midtermExam.score}/{grade.midtermExam.maxScore}</span>
                        <span className="text-xs text-gray-500 ml-1">({Math.round(grade.midtermExam.score/grade.midtermExam.maxScore*100)}%)</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </td>
                  <td>
                    {grade.finalExam ? (
                      <div className="text-sm">
                        <span className="font-medium">{grade.finalExam.score}/{grade.finalExam.maxScore}</span>
                        <span className="text-xs text-gray-500 ml-1">({Math.round(grade.finalExam.score/grade.finalExam.maxScore*100)}%)</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="font-medium">
                    {grade.totalScore}%
                  </td>
                  <td>
                    <span className={`font-bold ${renderGradeColor(grade.letterGrade || 'F')}`}>
                      {grade.letterGrade}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">({grade.gpa})</span>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-primary-600 flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredGrades.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No grades found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GradesPage;