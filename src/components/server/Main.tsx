import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/lib/types/database.types";
import type { Tweet as TweetType } from "@/lib/types/tweet.types";

import ComposeTweet from "@/components/client/ComposeTweet";
import Tweet from "@/components/client/Tweet";


async function getTweets(): Promise<TweetType[]> {
    const supabase = createServerComponentClient<Database>({ cookies });

    const tweetIdsLikedByUserSet = new Set<string>();

    const { data: tweets, error: tweetsError } = await supabase
        .from('tweets')
        .select(`
            id,
            created_at,
            text,
            profiles (
                username,
                full_name
            ),
            likes(count)
        `)
        .order('created_at', { ascending: false });
    if (tweetsError) {
        throw new Error("Failed to fetch tweets.");
    }
    if (tweets === null) {
        return [];
    }

    const { data: currentUserDetails, error: currentUserDetailsError } = await supabase.auth.getUser();

    if (currentUserDetailsError) {
        throw new Error('Failed to get user details')
    }

    if (!currentUserDetails) {
        throw new Error('User does not exists')
    }

    const { data: currentUserLikedTweets, error: currentUserLikedTweetsError } = await supabase.from('likes')
        .select(
            `
            tweet_id,
            user_id,
            profiles (
                id
            )
            `
        )
        .eq('profiles.id', currentUserDetails.user.id)

    if (currentUserLikedTweetsError) {
        throw new Error('Failed to get current user liked tweets.');
    }

    if (currentUserLikedTweets) {
        currentUserLikedTweets.forEach(tweet => {
            tweetIdsLikedByUserSet.add(tweet.tweet_id)
        })
    }

    const mappedTweets = tweets.map((tweet) => {
        return {
            ...tweet,
            likes: (tweet.likes as unknown as [{ count: number }])[0].count,
            isLikedByUser: tweetIdsLikedByUserSet.has(tweet.id)
        }
    });

    return mappedTweets;
}

export default async function Main() {
    const tweets = await getTweets();

    return (
        <main className="flex-1 h-full min-h-screen border-x-[0.5px] border-border-300">
            <h1 className='text-xl font-bold p-4 border-b-[0.5px] border-border-300 backdrop-blur bg-gray-200/10 sticky top-0'>
                Home
            </h1>
            <div className='px-2 py-4 border-b-[0.5px] border-border-300 h-32 flex space-x-2'>
                <div className="rounded-full bg-slate-500 w-10 h-10" />
                <ComposeTweet />
            </div>
            <div>
                {
                    tweets.length > 0
                        ? tweets.map((tweet, i) => (
                            <Tweet tweet={tweet} />
                        ))
                        : <div className="p-4 flex justify-center">No tweets found.</div>
                }
            </div>
        </main>
    )
}