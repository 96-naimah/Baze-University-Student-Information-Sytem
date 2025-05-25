import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Plus, Search, Filter, User } from 'lucide-react';
import { MOCK_STUDENTS } from '../../data/mockData';
import { Student } from '../../types';

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Get unique programs for filter
  const programs = [...new Set(MOCK_STUDENTS.map(student => student.program))];

  // Filter and sort students
  const filteredStudents = MOCK_STUDENTS.filter(student => {
    const matchesSearch = searchTerm === '' || 
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesProgram = programFilter === 'all' || student.program === programFilter;
    
    return matchesSearch && matchesStatus && matchesProgram;
  }).sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
    } else if (sortBy === 'id') {
      comparison = a.studentId.localeCompare(b.studentId);
    } else if (sortBy === 'program') {
      comparison = a.program.localeCompare(b.program);
    } else if (sortBy === 'status') {
      comparison = a.status.localeCompare(b.status);
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
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage student profiles, view academic records, and track progress.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="btn btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Student
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
              placeholder="Search by name, ID or email..."
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
                <option value="graduated">Graduated</option>
                <option value="suspended">Suspended</option>
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
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
              >
                <option value="all">All Programs</option>
                {programs.map((program) => (
                  <option key={program} value={program}>{program}</option>
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
            Showing {filteredStudents.length} of {MOCK_STUDENTS.length} students
          </div>
          <button className="btn btn-outline text-xs flex items-center">
            <Filter className="h-3 w-3 mr-1" />
            More Filters
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th 
                  className="cursor-pointer"
                  onClick={() => toggleSort('name')}
                >
                  <div className="flex items-center">
                    <span>Student Name</span>
                    {sortBy === 'name' && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}
                      />
                    )}
                  </div>
                </th>
                <th 
                  className="cursor-pointer"
                  onClick={() => toggleSort('id')}
                >
                  <div className="flex items-center">
                    <span>Student ID</span>
                    {sortBy === 'id' && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}
                      />
                    )}
                  </div>
                </th>
                <th 
                  className="cursor-pointer"
                  onClick={() => toggleSort('program')}
                >
                  <div className="flex items-center">
                    <span>Program</span>
                    {sortBy === 'program' && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}
                      />
                    )}
                  </div>
                </th>
                <th>Email</th>
                <th 
                  className="cursor-pointer"
                  onClick={() => toggleSort('status')}
                >
                  <div className="flex items-center">
                    <span>Status</span>
                    {sortBy === 'status' && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}
                      />
                    )}
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student: Student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="flex items-center">
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
                  </td>
                  <td>{student.studentId}</td>
                  <td>{student.program}</td>
                  <td>{student.email}</td>
                  <td>
                    <span className={`badge ${
                      student.status === 'active' ? 'badge-success' :
                      student.status === 'suspended' ? 'badge-error' :
                      student.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      'badge-warning'
                    }`}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <Link 
                        to={`/students/${student.id}`}
                        className="text-gray-600 hover:text-primary-600"
                      >
                        View
                      </Link>
                      <button className="text-gray-600 hover:text-primary-600">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No students found matching your filters.
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{filteredStudents.length}</span> results
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="btn btn-outline">Previous</button>
              <button className="btn btn-outline">Next</button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default StudentsPage;