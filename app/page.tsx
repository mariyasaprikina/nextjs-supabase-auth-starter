import {createClient} from '@/utils/supabase/server';
import {redirect} from 'next/navigation';
import {signOut} from './login/actions';

export default async function Home() {
  const supabase = createClient();

  const {data, error} = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <h1 className="text-6xl font-bold">
        Hello, {data.user.user_metadata.full_name}!
      </h1>
      <form action={signOut}>
        <button className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black">
          Sign Out
        </button>
      </form>
    </div>
  );
}
