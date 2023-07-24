import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { IoStatsChart } from "react-icons/io5";

import { Button } from "@/components/ui/button";

export default function Main() {
    return (
        <main className="flex-1 h-full min-h-screen border-x-[0.5px] border-border-300">
            <h1 className='text-xl font-bold p-4 border-b-[0.5px] border-border-300 backdrop-blur bg-gray-200/10 sticky top-0'>Home</h1>
            <div className='px-2 py-4 border-b-[0.5px] border-border-300 h-32 flex space-x-2'>
                <div className="rounded-full bg-slate-500 w-10 h-10" />
                <form className='flex-1'>
                    <div className='p-2 border-b-[0.5px] border-gray-300'>
                        <input type="text" placeholder="What is happening?!" className='w-full text-xl bg-transparent outline-none border-none placeholder:text-primary-500' />
                    </div>
                    <div className='flex justify-between items-center'>
                        <div></div>
                        <div>
                            <Button type="submit" className="rounded-full mt-4">Tweet</Button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        // tweet
                        <div key={i} className="border-b-[0.5px] border-gray-300 p-4 flex space-x-2">
                            {/* avatar */}
                            <div className="rounded-full bg-slate-500 w-10 h-10" />
                            {/* author and tweet */}
                            <div className="flex-1 flex flex-col space-y-1">
                                {/* user info and actions */}
                                <div className="flex">
                                    {/* user info */}
                                    <div className='flex-1 flex space-x-1'>
                                        {/* user name */}
                                        <div className='font-semibold'>
                                            <span>John Doe</span>
                                        </div>
                                        <div className='text-gray-400 space-x-0.5 flex'>
                                            {/* user id */}
                                            <div>
                                                <span>@johndoe</span>
                                            </div>
                                            <div>
                                                <span>&middot;</span>
                                            </div>
                                            {/* posted since */}
                                            <div>
                                                <span>10m</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* user actions */}
                                    <div>
                                        <BsThreeDots />
                                    </div>
                                </div>
                                {/* tweet */}
                                <div className='flex flex-col space-y-2'>
                                    {/* tweet text */}
                                    <div className='text-gray-700'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex dolorem quod provident optio voluptatibus quia consequuntur maxime mollitia repellat aliquam.
                                    </div>
                                    {/* tweet media */}
                                    <div className='bg-slate-100 aspect-square w-full h-80 rounded-2xl'></div>
                                    {/* tweet actions */}
                                    <div className='flex items-center space-x-10 text-gray-700'>
                                        <div className="rounded-full hover:bg-black/10 transition duration-200 p-3 cursor-pointer">
                                            <FaRegComment />
                                        </div>
                                        <div className="rounded-full hover:bg-black/10 transition duration-200 p-3 cursor-pointer">
                                            <FaRetweet />
                                        </div>
                                        <div className="rounded-full hover:bg-black/10 transition duration-200 p-3 cursor-pointer">
                                            <AiOutlineHeart />
                                        </div>
                                        <div className="rounded-full hover:bg-black/10 transition duration-200 p-3 cursor-pointer">
                                            <IoStatsChart />
                                        </div>
                                        <div className="rounded-full hover:bg-black/10 transition duration-200 p-3 cursor-pointer">
                                            <FiUpload />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}