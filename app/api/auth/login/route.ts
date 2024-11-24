import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { auth } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    
    // Verificar o token com o Firebase Admin
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Criar um cookie de sessão
    const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 dias
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    
    // Definir o cookie
    cookies().set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in login route:', error);
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}
