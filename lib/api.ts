// Dummy API helpers — no backend. Logs to console and simulates latency.
export async function registerAdmin(payload: any) {
  console.log('[API] registerAdmin called with:', payload);
  await new Promise(r => setTimeout(r, 700));
  return { success: true, emailTokenSent: true };
}

export async function verifyEmailToken(token: string) {
  console.log('[API] verifyEmailToken', token);
  await new Promise(r => setTimeout(r, 500));
  if (!token) return { status: 'invalid' };
  if (token === 'expired') return { status: 'expired' };
  if (token === 'already') return { status: 'already_verified' };
  return { status: 'success' };
}

export async function sendOtp(phone: string) {
  console.log('[API] sendOtp to', phone);
  await new Promise(r => setTimeout(r, 400));
  return { success: true };
}

export async function verifyOtp(phone: string, otp: string) {
  console.log('[API] verifyOtp', phone, otp);
  await new Promise(r => setTimeout(r, 400));
  if (otp === '000000') return { status: 'expired' };
  if (otp !== '123456') return { status: 'invalid' };
  return { status: 'success' };
}

export async function uploadKyc(formData: FormData, onProgress?: (p:number)=>void) {
  console.log('[API] uploadKyc called with files:');
  for (const pair of (formData as any).entries()) {
    console.log(pair[0], pair[1]);
  }
  // simulate progress
  for (let p=10; p<=100; p+=20) {
    await new Promise(r => setTimeout(r, 150));
    onProgress?.(p);
  }
  return { status: 'under_review' };
}
