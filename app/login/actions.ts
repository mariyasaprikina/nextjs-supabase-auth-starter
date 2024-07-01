'use server';

import {createClient} from '@/utils/supabase/server';
import {headers} from 'next/headers';
import {redirect} from 'next/navigation';

export async function signInWithGoogle() {
  const supabase = createClient();
  const origin = headers().get('origin');

  const {error, data} = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.log(error);
  } else {
    return redirect(data.url);
  }
}

export async function signOut() {
  const supabase = createClient();
  const {error} = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  return redirect('/');
}
