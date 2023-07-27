'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";

export default function ComposeTweet() {
    const [tweet, setTweet] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            await fetch('/api/tweets', {
                method: 'POST',
                body: JSON.stringify({ tweet }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTweet('')
            setLoading(false)
            router.refresh()
        } catch (error) {
            console.log('failed to add tweet: ' + error)
            setLoading(false)
        }
    };

    return (
        <form className='flex-1' onSubmit={handleSubmit}>
            <fieldset disabled={loading}>
                <div className='p-2 border-b-[0.5px] border-gray-300'>
                    <input
                        type="text"
                        placeholder="What is happening?!"
                        name="tweet"
                        id="tweet"
                        value={tweet}
                        onChange={e => setTweet(e.target.value)}
                        className='w-full text-xl bg-transparent outline-none border-none placeholder:text-primary-500'
                    />
                </div>
                <div className='flex justify-end items-center'>
                    <Button type="submit" className="rounded-full mt-4">Tweet</Button>
                </div>
            </fieldset>
        </form>
    );
}
