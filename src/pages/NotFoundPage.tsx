import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-primary-600">404</h1>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Page Not Found</h2>
            <p className="mt-2 text-gray-600">
              The page you are looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="mt-8 flex flex-col space-y-4">
            <Link
              to="/"
              className="btn btn-primary flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Link>
            
            <Link
              to="/students"
              className="btn btn-outline flex items-center justify-center"
            >
              View Students
            </Link>
            
            <Link
              to="/courses"
              className="btn btn-outline flex items-center justify-center"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;