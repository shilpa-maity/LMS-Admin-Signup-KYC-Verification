import React, { useState } from 'react';
import * as api from '../lib/api';
import FileInput from '../components/FileInput';
import { useRouter } from 'next/router';

const instituteTypes = ['Coaching Center','Educational Institute','Corporate Training','Individual Tutor'] as const;

export default function Kyc() {
  const router = useRouter();
  const [instituteType, setInstituteType] = useState<typeof instituteTypes[number]>('Coaching Center');
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);

  const requiredFields = instituteType === 'Individual Tutor'
    ? [
        { key: 'govId', label: 'Government-issued Photo ID' },
        { key: 'eduCerts', label: 'Educational Qualification Certificates' },
        { key: 'photo', label: 'Professional Photograph' },
        { key: 'addressProof', label: 'Address Proof' },
      ]
    : [
        { key: 'instRegCert', label: 'Institute Registration Certificate' },
        { key: 'gstCert', label: 'GST Registration Certificate (optional)' },
        { key: 'adminGovId', label: 'Admin Government-issued Photo ID' },
        { key: 'adminPhoto', label: 'Admin Photograph' },
        { key: 'estProof', label: 'Institute Establishment Proof' },
      ];

  function onFile(key: string, file: File | null) {
    setFiles(prev => ({ ...prev, [key]: file }));
    setErrors(prev => ({ ...prev, [key]: file ? '' : 'File required' }));
  }

  async function submit() {
    const newErrors: Record<string, string> = {};
    requiredFields.forEach(f => {
      if (!files[f.key] && !f.key.includes('gst')) newErrors[f.key] = 'File required';
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    const fd = new FormData();
    fd.append('instituteType', instituteType);
    Object.entries(files).forEach(([k, v]) => v && fd.append(k, v));
    const res = await api.uploadKyc(fd, (p) => setProgress(p));
    if (res.status) {
      alert('KYC uploaded (simulated)');
      router.push('/dashboard');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">KYC Document Upload</h2>
          <select
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={instituteType}
            onChange={(e) => setInstituteType(e.target.value as any)}
          >
            {instituteTypes.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div className="mt-4 space-y-4">
          {requiredFields.map(f => (
            <FileInput
              key={f.key}
              label={f.label}
              accept="application/pdf,image/png,image/jpeg"
              onChange={(file) => onFile(f.key, file)}
              error={errors[f.key] || null}
            />
          ))}
        </div>

        <div className="mt-6">
          <div className="h-2 bg-gray-200 rounded">
            <div style={{ width: `${progress}%` }} className="h-full bg-indigo-600 rounded"></div>
          </div>
          <button onClick={submit} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">Upload & Submit</button>
        </div>
      </div>
    </div>
  );
}
