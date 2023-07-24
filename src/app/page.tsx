import LeftSidebar from '@/components/LeftSidebar';
import Main from '@/components/Main';
import RightSidebar from '@/components/RightSidebar';

export default function Home() {
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
