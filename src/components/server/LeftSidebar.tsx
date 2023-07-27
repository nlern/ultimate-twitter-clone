import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { BiBell, BiBookmark, BiEnvelope, BiHomeCircle, BiLogoTwitter, BiSearch, BiUser } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

import type { Database } from "@/lib/types/database.types";

import { Button } from "@/components/ui/button";

const NAVIGATION_ITEMS = [
    {
        title: 'Twitter',
        icon: BiLogoTwitter,
    },
    {
        title: 'Home',
        icon: BiHomeCircle
    },
    {
        title: 'Explore',
        icon: BiSearch
    },
    {
        title: 'Notifications',
        icon: BiBell
    },
    {
        title: 'Messages',
        icon: BiEnvelope
    },
    {
        title: 'Bookmarks',
        icon: BiBookmark
    },
    {
        title: 'Profile',
        icon: BiUser
    }
]

async function getUserDetails() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.log('Error: Failed to get user details.')
        throw new Error('Failed to get user details.');
    }

    const userId = data.user.id;

    const { data: userProfile, error: userProfileError } = await supabase.from('profiles')
        .select('username, full_name').eq('id', userId)

    if (userProfileError) {
        console.log('Error: Failed to fetch user profile details.')
        throw new Error('Failed to get user details.');
    }

    if (!userProfile || userProfile.length === 0) {
        throw new Error('User profile does not exist.')
    }

    return userProfile[0];
}

export default async function LeftSidebar() {
    const userDetails = await getUserDetails();

    return (
        <section className='sticky top-0 w-[270px] flex flex-col items-stretch justify-between h-screen space-y-4 p-4'>
            <div className="text-2xl">
                {NAVIGATION_ITEMS.map((item) => {
                    return (
                        <Link
                            className={`items-center flex justify-start w-fit space-x-4 rounded-3xl px-6 py-2 hover:bg-black/10 transition duration-200 ${item.title === 'Twitter' && 'rounded-full text-3xl'}`}
                            href={item.title.toLowerCase()}
                            key={item.title}
                        >
                            <div>
                                <item.icon />
                            </div>
                            {item.title !== 'Twitter' && <div>{item.title}</div>}
                        </Link>
                    );
                })}
                <Button className="rounded-full w-full mt-4">Tweet</Button>
            </div>
            <div>
                <button type="button" className="w-full rounded-full p-4 mt-4 flex justify-between items-center space-x-2 hover:bg-white/10 transition duration-200">
                    <div className="flex items-center space-x-2">
                        <div className="rounded-full bg-slate-400 w-10 h-10" />
                        <div className="text-left text-sm">
                            <div className="font-semibold">
                                {userDetails.full_name}
                            </div>
                            <div className="text-gray-600">
                                @{userDetails.username}
                            </div>
                        </div>
                    </div>
                    <div>
                        <BsThreeDots />
                    </div>
                </button>
            </div>
        </section>
    )
}