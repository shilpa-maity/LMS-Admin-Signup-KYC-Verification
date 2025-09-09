import React from 'react';

type Props = {
  label: string;
  accept?: string;
  onChange: (f: File | null)=>void;
  error?: string | null;
};

export default function FileInput({ label, accept, onChange, error }: Props) {
  return (
    <div className="p-3 border rounded">
      <div className="flex items-center justify-between">
        <div className="font-medium">{label}</div>
        <div className="text-sm text-gray-500">Allowed: PDF, PNG, JPEG ≤5MB</div>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <input type="file" accept={accept} onChange={(e)=>onChange(e.target.files?.[0] ?? null)} />
      </div>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </div>
  );
}
