import React, { useState } from 'react';
import { useRouter } from 'next/router';
import * as api from '../lib/api';

export default function VerifyEmail() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function check() {
    if (!token) {
      setStatus('invalid');
      return;
    }
    setLoading(true);
    const res = await api.verifyEmailToken(token);
    setLoading(false);
    setStatus(res.status);

    if (res.status === 'success') {
      // redirect after short delay
      setTimeout(() => router.push('/verify-phone'), 1200);
    }
  }

  async function resend() {
    setResending(true);
    // mock resend
    await new Promise(r => setTimeout(r, 1000));
    setResending(false);
    alert('Verification email resent (mock). Use token: success, expired, already.');
  }

  return (
    <div className="bg-[#0B1120] min-h-screen flex items-center justify-center text-gray-200">
      <div className="bg-[#111827] p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Verify Email
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          Paste token from email (try:{' '}
          <code className="text-green-400">success</code>,{' '}
          <code className="text-yellow-400">expired</code>,{' '}
          <code className="text-cyan-400">already</code>, anything else = invalid).
        </p>

        <div className="mt-4 flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-lg bg-[#0B1120] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="Enter token"
          />
          <button
            onClick={check}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow hover:opacity-90"
          >
            {loading ? 'Checking…' : 'Verify'}
          </button>
        </div>

        {status && (
          <div className="mt-6 text-center">
            {status === 'success' && (
              <div className="text-green-400 font-medium">
                ✅ Email verified! Redirecting to phone verification…
              </div>
            )}
            {status === 'expired' && (
              <div className="text-yellow-400">
                ⚠️ Token expired.
                <button
                  onClick={resend}
                  disabled={resending}
                  className="ml-2 underline hover:text-yellow-300"
                >
                  {resending ? 'Resending…' : 'Resend Email'}
                </button>
              </div>
            )}
            {status === 'invalid' && (
              <div className="text-red-400">❌ Invalid token. Please check again.</div>
            )}
            {status === 'already_verified' && (
              <div className="text-cyan-400">
                ℹ️ Email already verified. You can continue.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
