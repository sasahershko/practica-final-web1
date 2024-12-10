'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

export default function ProfileForm({ initialValues, isEdit, onCancel, onSubmit, onSubmitLogo }) {
  const [image, setImage] = useState(initialValues?.logo || null);
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.includes('image')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); 
        setFile(file); 
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const triggerFileInput = () => {
    document.getElementById('file-input').click();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: initialValues?.name || '',
      surnames: initialValues?.surnames || '',
      nif: initialValues?.nif || '',
      email: initialValues?.email || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required field'),
      surnames: Yup.string().required('Required field'),
      nif: Yup.string()
        .matches(/^[0-9]{8}[A-Za-z]$/, 'NIF must have 8 digits followed by a letter')
        .required('Required field'),
    }),
    onSubmit: (values) => {
      // console.log('DENTRO FORMIK:', values);
      onSubmit(values);
    },
  });

  return (
    <div className="animate-fade-in-up max-w-5xl mx-auto mt-20 p-10 bg-gradient-to-r from-purple-100 to-blue-50 shadow-xl rounded-2xl">
      <h1 className="text-[60px] font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent text-center tracking-wide mb-10">
        Edit Profile
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Formulario */}
        <div className="col-span-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[{ name: 'name', label: 'Name', type: 'text' },
              { name: 'surnames', label: 'Surnames', type: 'text' },
              { name: 'nif', label: 'NIF', type: 'text' , colSpan: 2}
            ].map((field) => (
              <div key={field.name} className={`flex flex-col ${field.colSpan ? `col-span-${field.colSpan}` : ''}`}>
                <label className="font-semibold text-purple-500 mb-2">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  className="border-2 border-purple-300 rounded-lg p-3 w-full text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                {formik.touched[field.name] && formik.errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors[field.name]}</p>
                )}
              </div>
            ))}

 
            <div className="flex flex-col col-span-2">
              <label className="font-semibold text-purple-500 mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="border-2 border-gray-300 rounded-lg p-3 w-full text-gray-400 bg-gray-100 focus:outline-none"
                disabled
              />
            </div>

            <div className="col-span-2 flex justify-center gap-10 mt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-10 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-pink-500 hover:to-blue-700 transition-transform duration-300 transform hover:scale-105"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-10 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-pink-600 hover:to-red-700 transition-transform duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Subida de Imagen */}
        <div className="flex flex-col items-center">
          <img
            src={image || "https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg"}
            alt="Profile Logo"
            className="w-40 h-40 rounded-full border-4 border-purple-300 shadow-lg mb-6"
          />
          <input
            type="file"
            id="file-input"
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            onClick={triggerFileInput}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-pink-500 hover:to-blue-700 transition-transform duration-300 transform hover:scale-105 w-full"
          >
            Select Image
          </button>
          {/* {file && (
            <button
              onClick={() => onSubmitLogo(file)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-pink-500 hover:to-blue-700 transition-transform duration-300 transform hover:scale-105 w-full mt-4"
            >
              Apply Image
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}
