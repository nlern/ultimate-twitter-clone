import { cookies } from "next/headers";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '@/lib/types/database.types';

import LeftSidebar from '@/components/server/LeftSidebar';
import Main from '@/components/server/Main';
import RightSidebar from '@/components/server/RightSidebar';
import AuthModal from "@/components/client/AuthModal";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data, error } = await supabase.auth.getUser();

  if (error?.status === 401) {
    return (
      <AuthModal />
    );
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='max-w-screen-xl w-full h-full flex'>
        {/* Left sidebar for nav header */}
        <LeftSidebar />
        <Main />
        <RightSidebar />
      </div>
    </div>
  )
}
