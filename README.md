
# LMS-Admin-Signup-KYC-Verification
=======
# LMS Admin Signup & KYC — Frontend (Next.js + TypeScript + Tailwind)

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


