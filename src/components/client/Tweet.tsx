'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { IoStatsChart } from "react-icons/io5";

import type { Tweet } from '@/lib/types/tweet.types';

dayjs.extend(relativeTime);

type TweetProps = {
    tweet: Tweet;
}

export default function Tweet({ tweet }: TweetProps) {
    const router = useRouter();

    const likeTweet = async () => {
        try {
            await fetch('/api/tweets/likes', {
                method: 'POST',
                body: JSON.stringify({
                    tweetId: tweet.id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            router.refresh()
        } catch (error) {

        }
    }
    return (
        <div key={tweet.id} className="border-b-[0.5px] border-gray-300 p-4 flex space-x-2">
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
                            <span>{tweet.profiles?.full_name}</span>
                        </div>
                        <div className='text-gray-400 space-x-0.5 flex'>
                            {/* user id */}
                            <div>
                                <span>@{tweet.profiles?.username}</span>
                            </div>
                            <div>
                                <span>&middot;</span>
                            </div>
                            {/* posted since */}
                            <div>
                                <span>{dayjs(tweet.created_at).fromNow()}</span>
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
                        {tweet.text}
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
                        {/* like */}
                        <div
                            className="rounded-full hover:bg-black/10 transition duration-200 p-3 cursor-pointer"
                            onClick={likeTweet}
                        >
                            <div className={`${tweet.isLikedByUser ? 'text-red-500' : ''} flex items-center`} >
                                {tweet.isLikedByUser ? <AiTwotoneHeart /> : <AiOutlineHeart />} {tweet.likes > 0 && <span className="ml-2">{tweet.likes}</span>}
                            </div>
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
    )
}