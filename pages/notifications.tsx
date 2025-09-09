import React from 'react';

export default function Notifications() {
  const items = [
    { id: '1', type: 'success', title: 'KYC approved', message: 'Your documents were approved', createdAt: new Date().toISOString(), read: false },
    { id: '2', type: 'info', title: 'Welcome', message: 'Thanks for signing up', createdAt: new Date().toISOString(), read: true },
    { id: '3', type: 'warning', title: 'Update Needed', message: 'Please update your profile', createdAt: new Date().toISOString(), read: false },
  ];

  const colors: Record<string, string> = {
    info: 'bg-cyan-500',
    success: 'bg-green-500',
    warning: 'bg-orange-500',
    danger: 'bg-red-500',
    primary: 'bg-purple-500',
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
        <div className="mt-4 space-y-3">
          {items.map(i => (
            <div key={i.id} className={`p-4 rounded-lg text-white flex justify-between items-center ${colors[i.type] || 'bg-gray-500'}`}>
              <div>
                <strong>{i.title}</strong>
                <div className="text-sm">{i.message}</div>
              </div>
              <span className="text-xs">{new Date(i.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
