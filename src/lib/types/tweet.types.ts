export type AddTweetRequest = {
    tweet: string;
};

export type AddTweetLikeRequest = {
    tweetId: string;
};

export type Tweet = {
    id: string;
    created_at: string;
    text: string;
    profiles: {
        username: string;
        full_name: string | null;
    } | null;
    likes: number
}
