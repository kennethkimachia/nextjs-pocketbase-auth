import { NextResponse } from 'next/server';
import pb from '@/lib/pocketbase';

export async function POST(req: Request) {
  const { email, password, action } = await req.json();

  try {
    if (action === 'signup') {
      // Handle user sign-up
      const newUser = await pb.collection('users').create({ email, password });
      return NextResponse.json(newUser, { status: 200 });
    } else if (action === 'login') {
      // Handle user login
      const user = await pb.collection('users').authWithPassword(email, password);
      return NextResponse.json(user, { status: 200 });
    }
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
