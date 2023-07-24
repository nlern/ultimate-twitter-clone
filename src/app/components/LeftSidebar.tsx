import Link from "next/link";
import { BiBell, BiBookmark, BiEnvelope, BiHomeCircle, BiLogoTwitter, BiSearch, BiUser } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

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

export default function LeftSidebar() {
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
                                John Doe
                            </div>
                            <div className="text-gray-600">
                                @johndoe
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