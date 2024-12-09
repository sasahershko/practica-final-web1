'use client';
import { useRouter } from 'next/navigation';

export default function Settings() {
  const router = useRouter();

  return (
    <div className="animate-fade-in-up min-h-screen bg-gradient-to-r from-purple-100 to-blue-50 flex flex-col items-center">
      <h1 className="text-[100px] font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent text-center mt-10 mb-10">
        Settings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-6">
        <div
          onClick={() => router.push('/pages/profile')}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold text-purple-500 mb-4">Profile</h2>
          <p className="text-gray-600 text-center">
            Update your personal information, profile picture, and more.
          </p>
        </div>

        {/* Change Password Section */}
        <div
          onClick={() => router.push('/pages/dashboard/settings/changePassword')}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold text-purple-500 mb-4">Change Password</h2>
          <p className="text-gray-600 text-center">
            Update your password to keep your account secure.
          </p>
        </div>
      </div>
    </div>
  );
}
