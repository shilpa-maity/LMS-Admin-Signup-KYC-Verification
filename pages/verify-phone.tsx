import React, { useState } from 'react';
import { useRouter } from 'next/router';
import * as api from '../lib/api';

export default function VerifyPhone() {
  const router = useRouter();
  const [phone] = useState('');
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  async function send() {
    await api.sendOtp(phone);
    alert('OTP sent (simulated). Use 123456 for success.');
  }

  async function verify() {
    const res = await api.verifyOtp(phone, otp);
    setStatus(res.status);
    if (res.status === 'success') router.push('/kyc');
    else setAttempts(a => a + 1);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800">Verify Phone</h2>
        <p className="text-sm text-gray-500 mt-1">Phone: <strong>{phone}</strong></p>

        <div className="mt-4 flex gap-2">
          <input
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="6-digit OTP"
          />
          <button onClick={verify} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">Verify</button>
          <button onClick={send} className="px-4 py-2 border rounded-lg shadow hover:bg-gray-50">Resend</button>
        </div>

        {status && (
          <div className="mt-4 p-3 rounded-lg text-purple 
            ${status==='success'?'bg-green-500':status==='expired'?'bg-orange-500':'bg-red-500'}">
            Status: <strong>{status}</strong>
          </div>
        )}

        {attempts >= 5 && (
          <div className="mt-2 text-sm text-red-600">Attempts Exceeded — request new OTP</div>
        )}
      </div>
    </div>
  );
}
