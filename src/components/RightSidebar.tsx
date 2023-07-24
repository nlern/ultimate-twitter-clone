import { BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

export default function RightSidebar() {
    return (
        <section className="w-[350px] sticky top-0 overflow-y-auto h-screen px-4">
            {/* search box */}
            <div className="sticky top-0 py-3 backdrop-blur">
                <form className="relative w-full h-full">
                    <input type="text" name="search" id="search" placeholder="Search Twitter" className="peer outline-none focus:border-primary focus:border border-transparent w-full bg-neutral-100/90 rounded-full placeholder:text-neutral-600 py-2 pl-10 pr-2" />
                    <div className="peer-focus:text-primary absolute top-0 left-0 p-4 h-full flex items-center justify-center text-neutral-600">
                        <BiSearch className="w-5 h-5" />
                    </div>
                </form>
            </div>
            {/* what's happening */}
            <div className="rounded-2xl bg-neutral-200 my-4">
                <h2 className="text-2xl font-bold p-4">What's happening</h2>
                <div className="flex flex-col space-y-2">
                    {
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="cursor-pointer hover:bg-neutral-300 py-2 px-4 transition duration-200 last:rounded-b-xl">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-500">Category &middot; Trending</div>
                                    <div>
                                        <BsThreeDots />
                                    </div>
                                </div>
                                <div className="font-semibold">
                                    <span>#trending item {i + 1}</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                    1.15M tweets
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
            {/* Who to follow */}
            <div className="rounded-2xl bg-neutral-200 my-4">
                <h2 className="text-2xl font-bold p-4">Who to follow</h2>
                <div>
                    {
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="cursor-pointer hover:bg-neutral-300 p-4 transition duration-200 last:rounded-b-xl flex">
                                <div className="flex items-center space-x-2 flex-1">
                                    <div className="rounded-full bg-slate-400 w-10 h-10" />
                                    <div className="text-left text-sm">
                                        <div className="font-semibold hover:underline">
                                            Other user {i + 1}
                                        </div>
                                        <div className="text-gray-600">
                                            @other_user_{i + 1}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="rounded-full bg-white text-neutral-800 px-4 py-1 text-sm font-semibold">Follow</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}