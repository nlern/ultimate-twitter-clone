'use client'

import { FormEvent, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Toaster, toast } from 'sonner';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { Database } from "@/lib/types/database.types";

export default function AuthModal() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const supabase = createClientComponentClient<Database>();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        // validate username
        if (username.length === 0) {
            setLoading(false);
            return
        }

        // validate email
        if (email.length === 0) {
            setLoading(false);
            return
        }

        // validate username does not exist
        const { data, error } = await supabase.from('profiles').select().eq('username', username);
        if (data && data.length > 0) {
            console.log(data);
            setLoading(false);
            return toast.error("Username already exists, please use another.")
        }

        await signInWithEmail();
    }

    const signInWithEmail = async () => {
        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                data: {
                    username,
                },
                emailRedirectTo: location.origin,
            },
        })
        setLoading(false);
    }

    return (
        <>
            <Toaster />
            <Dialog defaultOpen={true}>
                <DialogContent>
                    <h1 className="text-lg font-semibold">Please sign in to continue</h1>
                    <form onSubmit={handleSubmit}>
                        <fieldset disabled={loading}>
                            <div className="my-2">
                                <label htmlFor="username" className="font-semibold">Username</label>
                                <Input type="text" placeholder="johndoe" name="username" id="username" value={username} onChange={e => setUsername(e.target.value?.trim())} />
                            </div>
                            <div className="my-2">
                                <label htmlFor="email" className="font-semibold">Email</label>
                                <Input type="email" placeholder="john.doe@example.com" name="email" id="email" value={email} onChange={e => setEmail(e.target.value?.trim())} />
                                <p className="text-xs text-gray-500 mt-1">
                                    You will receive a Magic link here.
                                </p>
                            </div>
                            <div className="my-2 flex justify-end">
                                <Button type="submit">Sign in</Button>
                            </div>
                        </fieldset>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}