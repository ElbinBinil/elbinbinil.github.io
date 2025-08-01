export const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className={`${sizeClasses[size]} border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin`}></div>
    </div>
  );
};

export const LoadingCard = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg animate-pulse">
      <div className="w-full h-32 bg-gray-700 rounded-lg mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    </div>
  );
};

export const LoadingProfile = () => {
  return (
    <div className="bg-purple-700 p-6 rounded-lg animate-pulse">
      <div className="w-full max-w-[200px] mx-auto h-48 bg-purple-600 rounded-lg mb-4"></div>
      <div className="h-6 bg-purple-600 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-purple-600 rounded w-1/2 mb-4"></div>
      <div className="flex justify-center space-x-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-6 h-6 bg-purple-600 rounded"></div>
        ))}
      </div>
    </div>
  );
};
