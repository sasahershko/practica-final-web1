'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {changePassword} from '@/app/lib/user';

export default function ChangePasswordPage() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirmation password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await changePassword(values.newPassword);
        if (response.success) {
          setSuccessMessage('Password changed successfully');
          setErrorMessage('');
        } else {
          setErrorMessage(response.message || 'There was an error changing your password. Please try again.');
          setSuccessMessage('');
        }
      } catch (error) {
        setErrorMessage('There was an error changing your password. Please try again.');
        setSuccessMessage('');
      }
    },
  });

  return (
    <div className="animate-fade-in-up min-h-screen bg-gradient-to-r from-purple-100 to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-center text-purple-500 mb-10">
          Change Password
        </h1>

        {successMessage && (
          <p className="text-green-600 bg-green-100 p-3 rounded-lg text-center mb-4">
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p className="text-red-600 bg-red-100 p-3 rounded-lg text-center mb-4">
            {errorMessage}
          </p>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition duration-300"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
