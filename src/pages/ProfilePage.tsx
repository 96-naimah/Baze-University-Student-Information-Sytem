import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield, 
  Edit, 
  Save,
  X
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Demo profile data - in real app, this would come from API/backend
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(555) 123-4567',
    role: user?.role || 'student',
    joinDate: 'January 15, 2021',
    address: '123 Campus Drive, University City, CA 90210',
    department: user?.role === 'faculty' ? 'Computer Science' : '',
    emergencyContact: 'John Doe, (555) 987-6543',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  });
  
  // Form state for editing
  const [formData, setFormData] = useState({ ...profileData });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    setProfileData({ ...formData });
    setIsEditing(false);
    // In a real app, this would make an API call to update the user profile
  };
  
  const handleCancel = () => {
    setFormData({ ...profileData });
    setIsEditing(false);
  };

  return (
    <div className="page-transition max-w-4xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="relative">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-primary-600 to-secondary-600" />
          
          {/* Profile Picture and Basic Info */}
          <div className="px-6 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-12 mb-6">
              <div className="flex-shrink-0 relative">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-32 w-32 rounded-full border-4 border-white bg-white"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full border-4 border-white bg-primary-100 flex items-center justify-center text-primary-600">
                    <User className="h-16 w-16" />
                  </div>
                )}
              </div>
              
              <div className="mt-6 sm:mt-0 sm:ml-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                    <div className="flex items-center mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)}
                      </span>
                      {profileData.department && (
                        <span className="ml-2 text-sm text-gray-500">• {profileData.department}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-0">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-outline flex items-center"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          className="btn btn-primary flex items-center"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="btn btn-outline flex items-center"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact and Bio Info */}
          <div className="px-6 sm:px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Contact Info */}
              <div className="md:col-span-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Email</h3>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          className="input mt-1 text-sm"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-sm text-gray-600">{profileData.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          className="input mt-1 text-sm"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-sm text-gray-600">{profileData.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Address</h3>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          className="input mt-1 text-sm"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-sm text-gray-600">{profileData.address}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Join Date</h3>
                      <p className="text-sm text-gray-600">{profileData.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Emergency Contact</h3>
                      {isEditing ? (
                        <input
                          type="text"
                          name="emergencyContact"
                          className="input mt-1 text-sm"
                          value={formData.emergencyContact}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-sm text-gray-600">{profileData.emergencyContact}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
                  <div className="space-y-3">
                    <button className="btn btn-outline w-full justify-start">
                      Change Password
                    </button>
                    <button className="btn btn-outline w-full justify-start">
                      Notification Preferences
                    </button>
                    <button className="btn btn-outline w-full justify-start">
                      Privacy Settings
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Bio and Additional Info */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  {isEditing ? (
                    <textarea
                      name="bio"
                      rows={6}
                      className="input"
                      value={formData.bio}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{profileData.bio}</p>
                  )}
                </div>
                
                {/* Additional Sections */}
                {user?.role === 'student' && (
                  <>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Summary</h2>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        <div className="p-4 text-center">
                          <p className="text-sm text-gray-500">Current GPA</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">3.8</p>
                        </div>
                        <div className="p-4 text-center">
                          <p className="text-sm text-gray-500">Credits Completed</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">64</p>
                        </div>
                        <div className="p-4 text-center">
                          <p className="text-sm text-gray-500">Attendance Rate</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">96%</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {user?.role === 'faculty' && (
                  <>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Teaching Summary</h2>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        <div className="p-4 text-center">
                          <p className="text-sm text-gray-500">Active Courses</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">4</p>
                        </div>
                        <div className="p-4 text-center">
                          <p className="text-sm text-gray-500">Total Students</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">127</p>
                        </div>
                        <div className="p-4 text-center">
                          <p className="text-sm text-gray-500">Years Teaching</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-900">Completed Assignment</h3>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">You submitted "Research Paper: Modern Computing" for CS101.</p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-900">New Grade Posted</h3>
                      <span className="text-xs text-gray-500">1 week ago</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">You received a grade of 94% on "Midterm Exam" for MAT220.</p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-900">Course Enrollment</h3>
                      <span className="text-xs text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">You enrolled in "Advanced Engineering Mathematics" (ENG304).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;