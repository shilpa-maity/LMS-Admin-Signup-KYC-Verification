import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

type DashboardData = {
  accountStatus: string;
  profileCompletion: number;
  notifications: { id: string; type: string; title: string; message: string; createdAt: string; read: boolean }[];
  rejectionReasons?: string[];
};

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("pending-registration");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/dashboard?status=${status}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, [status]);

  if (loading) {
    return <div className="p-8 text-gray-400">Loading dashboard...</div>;
  }

  if (!data) {
    return <div className="p-8 text-red-500">No data available</div>;
  }

  return (
    <div className="bg-[#0B1120] min-h-screen text-gray-200 p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Dashboard
        </h2>

        {/* Account Status */}
        <div className="flex items-center gap-3">
          <span className="text-sm">Account Status:</span>
          <span className="px-2 py-1 rounded bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            {data.accountStatus}
          </span>
        </div>
      </div>

      {/* Status Selector */}
      <div className="bg-[#111827] p-6 rounded-xl border border-gray-700 shadow-lg">
        <label className="text-sm text-gray-400">Change Status (Mock):</label>
        <select
          className="mt-2 p-2 rounded bg-[#0B1120] border border-gray-600 text-gray-200"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending-registration">Pending Registration</option>
          <option value="pending-kyc">Pending KYC</option>
          <option value="under-review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Profile Completion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111827] p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="text-sm text-gray-400">Profile Completion</div>
          <div className="mt-2 text-3xl font-bold">{data.profileCompletion}%</div>
          <div className="w-full h-2 mt-3 bg-gray-700 rounded-full">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
              style={{ width: `${data.profileCompletion}%` }}
            ></div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#111827] p-6 rounded-xl border border-gray-700 shadow-lg md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Notifications</div>
              <div className="mt-3 space-y-3">
                {data.notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 bg-[#0B1120] border border-gray-700 rounded-lg shadow-sm"
                  >
                    <strong>{n.title}</strong>
                    <div className="text-sm text-gray-400">{n.message}</div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => router.push("/profile")}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow hover:opacity-90"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Rejection Reasons */}
      {data.accountStatus === "Rejected" && data.rejectionReasons && (
        <div className="bg-[#111827] p-6 rounded-xl border border-red-600 shadow-lg">
          <h3 className="text-red-400 font-semibold mb-2">Rejection Reasons</h3>
          <ul className="list-disc pl-5 text-gray-300 space-y-1">
            {data.rejectionReasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-[#111827] p-6 rounded-xl border border-gray-700 shadow-lg">
        <h3 className="font-semibold text-gray-100 mb-2">Next Steps</h3>
        {data.accountStatus === "Pending Registration" && (
          <p>👉 Please complete your registration form.</p>
        )}
        {data.accountStatus === "Pending KYC" && (
          <p>👉 Upload your ID and Address proof to proceed.</p>
        )}
        {data.accountStatus === "Under Review" && (
          <p>⏳ Our team is reviewing your documents. Please wait.</p>
        )}
        {data.accountStatus === "Approved" && (
          <p>✅ Your account is active! Explore the dashboard.</p>
        )}
        {data.accountStatus === "Rejected" && (
          <p>❌ Fix the issues listed above and re-submit documents.</p>
        )}
        {data.accountStatus === "Suspended" && (
          <p>⚠️ Contact support for further assistance.</p>
        )}
      </div>
    </div>
  );
}
