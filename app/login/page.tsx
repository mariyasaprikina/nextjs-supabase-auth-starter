import Image from 'next/image';
import Google from '@/components/icons/google';
import {signInWithGoogle} from './actions';
import {createClient} from '@/utils/supabase/server';
import {redirect} from 'next/navigation';

export default async function LoginPage() {
  const supabase = createClient();

  const {data} = await supabase.auth.getUser();
  if (data.user) {
    redirect('/');
  }
  return (
    <div className="flex justify-center items-center max-w-md">
      <div className="w-full rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign in with Google</h3>
        </div>
        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
          <form
            action={signInWithGoogle}
            className="flex flex-col bg-gray-50 mb-1"
          >
            <button className="flex h-10 w-full items-center justify-center space-x-3 rounded-md border border-gray-200 bg-white text-black hover:bg-gray-50 text-sm shadow-sm transition-all duration-75 focus:outline-none">
              <Google className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
