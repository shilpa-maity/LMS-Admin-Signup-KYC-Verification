import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import * as api from '../lib/api';


const instituteTypes = ['Coaching Center','Educational Institute','Corporate Training','Individual Tutor'] as const;

const schema = z.object({
  instituteName: z.string().min(2),
  instituteType: z.enum(instituteTypes),
  adminFullName: z.string().min(2),
  officialEmail: z.string().email(),
  phoneNumber: z.string(),
  instituteAddress: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(3),
  password: z.string().min(8),
  confirmPassword: z.string().min(1),
  acceptTerms: z.boolean(),
  acceptPrivacy: z.boolean(),
}).refine(data => data.password === data.confirmPassword, { message: "Passwords must match", path: ['confirmPassword'] });

export default function Register() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(values: any) {
    try {
      // call dummy API (logs to console)
      const res = await api.registerAdmin(values);
      console.log('register result', res);
       if (res.success) {
         router.push('/verify-email');
       }

      console.log("API response:", res);

    } catch (e) {
      console.error("Error occurred during registration:", e);
    }
  }

  return (
    <div className="bg-[#0B1120] min-h-screen flex items-center justify-center text-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#111827] p-8 rounded-2xl shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Admin Registration Form</h2>
          
          <label className="block text-sm font-medium">Institute/Organization Name</label>
          <input className="w-full mt-2 px-3 py-2 rounded-lg bg-[#0B1120] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none" {...register('instituteName')} />
          {errors.instituteName && <div className="text-pink-500 text-sm mt-1">{String(errors.instituteName.message)}</div>}

          <label className="block text-sm font-medium mt-4">Institute Type</label>
          <select className="w-full mt-2 px-3 py-2 rounded-lg bg-[#0B1120] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none" {...register('instituteType')}>
            {instituteTypes.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
          {errors.instituteType && <div className="text-pink-500 text-sm mt-1">{String(errors.instituteType.message)}</div>}

          <label className="block text-sm font-medium mt-4">Admin Full Name</label>
          <input className="w-full mt-2 px-3 py-2 rounded-lg bg-[#0B1120] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none" {...register('adminFullName')} />
          {errors.adminFullName && <div className="text-pink-500 text-sm mt-1">{String(errors.adminFullName.message)}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium">Institute Address</label>
          <textarea className="w-full mt-2 px-3 py-2 rounded-lg bg-[#0B1120] border border-gray-700 h-24 focus:ring-2 focus:ring-purple-500 outline-none" {...register('instituteAddress')} />

          <div className="grid grid-cols-3 gap-2 mt-4">
            <div>
              <label className="block text-sm font-medium">City</label>
              <input className="w-full mt-2 px-3 py-2 rounded-lg bg-[#0B1120] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none" {...register('city')} />
            </div>
            <div>
              <label className="block text-sm font-medium">State</label>
              <input className="w-full mt-2 px-3 py-2 rounded-lg bg-[#0B1120] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none" {...register('state')} />
            </div>
            <div>
              <label className="block text-sm font-medium">Postal Code</label>
              <input className="w-full mt-2 px-3 py-2 rounded-lg bg-[#0B1120] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none" {...register('postalCode')} />
            </div>
          </div>

          <label className="block text-sm font-medium mt-4">Password</label>
          <input type="password" className="w-full mt-2 px-3 py-2 rounded-lg bg-[#0B1120] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none" {...register('password')} />

          <label className="block text-sm font-medium mt-4">Confirm Password</label>
          <input type="password" className="w-full mt-2 px-3 py-2 rounded-lg bg-[#0B1120] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none" {...register('confirmPassword')} />

          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-2"><input type="checkbox" {...register('acceptTerms')} /> <span className="text-sm">Accept Terms</span></label>
            <label className="flex items-center gap-2"><input type="checkbox" {...register('acceptPrivacy')} /> <span className="text-sm">Accept Privacy Policy</span></label>
          </div>

         <button type="submit" disabled={isSubmitting} className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:opacity-90">
  Create Account
</button>
        </div>
      </form>
    </div>
  );
}
