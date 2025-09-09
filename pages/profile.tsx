import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Profile() {
  const [locked] = useState(true);
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    console.log('profile saved', data);
    alert('Profile saved (simulated)');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Admin Full Name</label>
          <input className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" {...register('adminFullName')} />

          <label className="block text-sm font-medium text-gray-700 mt-4">Phone Number</label>
          <input className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" {...register('phoneNumber')} />

          <label className="block text-sm font-medium text-gray-700 mt-4">Institute Address</label>
          <textarea className="mt-1 w-full px-3 py-2 border rounded-lg h-24 focus:ring-2 focus:ring-indigo-500 outline-none" {...register('instituteAddress')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" {...register('city')} />

          <label className="block text-sm font-medium text-gray-700 mt-4">State</label>
          <input className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" {...register('state')} />

          <label className="block text-sm font-medium text-gray-700 mt-4">Postal Code</label>
          <input className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" {...register('postalCode')} />

          <div className="mt-6">
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">Save</button>
          </div>
        </div>

        {locked && (
          <div className="md:col-span-2 text-sm text-gray-500 bg-yellow-50 border border-yellow-300 p-3 rounded">
            Institute Name, Institute Type and Email Address are locked after KYC submission.
          </div>
        )}
      </form>
    </div>
  );
}
