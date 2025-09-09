
## LMS Admin Signup & KYC Verification — Frontend (Next.js + TypeScript + Tailwind)

This is a frontend-only scaffold for Phase 1: Admin Registration & KYC Verification.
It uses dummy APIs (console-based) — no backend is included. The project demonstrates:
- /register (form validation using zod + react-hook-form)
- /verify-email (token states)
- /verify-phone (OTP flow)
- /kyc (file inputs with client-side validation + simulated upload progress)
- /dashboard, /profile, /notifications (UI placeholders)

## Quick start
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000/register`

Note: this repository uses Tailwind. The API functions are in `lib/api.ts` — they only `console.log` and simulate delays.

<img width="557" height="743" alt="image" src="https://github.com/user-attachments/assets/0206f994-bd2f-447e-9d90-389251bff686" />



