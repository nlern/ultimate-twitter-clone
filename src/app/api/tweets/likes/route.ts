import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

import type { Database } from "@/lib/types/database.types";
import type { AddTweetLikeRequest } from "@/lib/types/tweet.types";

export async function POST(request: Request) {
    try {
        // parse the request body
        const { tweetId }: AddTweetLikeRequest = await request.json();

        // validate tweet is valid
        if (!tweetId) {
            return NextResponse.json({ error: "'tweetId' field is required." }, { status: 400 });
        }

        const supabase = createRouteHandlerClient<Database>({ cookies });

        // get current user details.
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError) {
            console.log(`Error while getting user details: ${userError.message}`);
            return NextResponse.json({ error: 'Failed to process the request.' }, { status: 500 });
        }

        // check if user already liked tweet
        const { data: likedByUser, error } = await supabase.from('likes')
            .select('*')
            .eq('tweet_id', tweetId)
            .eq('user_id', userData.user.id);

        if (likedByUser !== null && likedByUser.length > 0) {
            // user alredy liked the tweet, so delete the like entry from table.
            const { data, error } = await supabase.from('likes')
                .delete()
                .eq('tweet_id', tweetId)
                .eq('user_id', userData.user.id);
            if (error) {
                // Failed to delete the row from db.
                console.log(`Error while removing the like: ${error.message}`);
                return NextResponse.json({ error: 'Failed to process the request.' }, { status: 500 });
            }
            // successfully removed the like.
            console.log('Successfully removed the like.');

            return NextResponse.json({ message: 'like removed.' });
        } else {
            // user has not liked the tweet yet, so add a 
            // entry in likes table for the tweet and user.
            const tweetLikeId = randomUUID();
            await supabase.from('likes').insert({
                id: tweetLikeId,
                tweet_id: tweetId,
                user_id: userData.user.id
            });

            console.log('Successfully liked tweet.');

            return NextResponse.json({ id: tweetLikeId }, { status: 201 })
        }

    } catch (error: any) {
        console.log(`Error while parsing request body: ${error.message}`);
        return NextResponse.json({ error: 'Failed to process the request.' }, { status: 500 });
    }
}
