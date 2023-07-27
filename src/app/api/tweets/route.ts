import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

import type { Database } from "@/lib/types/database.types";
import type { AddTweetRequest } from "@/lib/types/tweet.types";

export async function POST(request: Request) {
    try {
        // parse the request body
        const { tweet }: AddTweetRequest = await request.json();

        // validate tweet is valid
        if (!tweet || tweet.length === 0) {
            return NextResponse.json({ error: "'tweet' field cannot be empty." }, { status: 400 });
        }

        const supabase = createRouteHandlerClient<Database>({ cookies });

        // get current user details.
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError) {
            console.log(`Error while getting user details: ${userError.message}`);
            return NextResponse.json({ error: 'Failed to process the request.' }, { status: 500 });
        }

        const tweetId = randomUUID();
        await supabase.from('tweets').insert({
            text: tweet,
            profile_id: userData.user.id,
            id: tweetId
        });

        console.log('Successfully saved tweet.');

        return NextResponse.json({ id: tweetId }, { status: 201 })
    } catch (error: any) {
        console.log(`Error while parsing request body: ${error.message}`);
        return NextResponse.json({ error: 'Failed to process the request.' }, { status: 500 });
    }
}
