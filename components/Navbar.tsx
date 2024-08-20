'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Plus } from 'lucide-react'
import Image from 'next/image'

const Navbar = () => {
    const router = useRouter()
    return (
        <div className='w-full h-auto px-10 border-b-[1px] border-gray-500 z-50 bg-gray-600 bg-opacity-30 '>
            <div className='my-3 flex gap-x-5 justify-between items-center'>
                <div className='relative w-[85px] h-[85px] cursor-pointer' onClick={() => router.push('/')}>
                    <Image src='/homeLogo.png' alt='homeLogopic' fill />
                </div>
                <div className='flex gap-x-8'>
                    <div className='border border-solid p-2 rounded-lg cursor-pointer h-12 '>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className='w-20 text-center font-semibold'>
                                <div className='group-hover:scale-110 duration-200 ease-in ove'>GAMES</div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='mt-4'>
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/games/create-game')}>
                                    <Plus size={20} />
                                    <span>Create Game</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/games')}>
                                    <ArrowUpRight size={20} />
                                    <span>Get Games</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='border border-solid p-2 rounded-lg cursor-pointer h-12 '>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className='w-20 text-center font-semibold'>
                                <div className='group-hover:scale-110 duration-200 ease-in ove'>NEWS</div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='mt-4'>
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/news/create-news')}>
                                    <Plus size={20} />
                                    <span>Create News</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/news')}>
                                    <ArrowUpRight size={20} />
                                    <span>Get News</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='border border-solid p-2 rounded-lg cursor-pointer h-12 '>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className='w-20 text-center font-semibold'>
                                <div className='group-hover:scale-110 duration-200 ease-in ove'>EVENTS</div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='mt-4'>
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/careers-events/create-event')}>
                                    <Plus size={20} />
                                    <span>Create Event</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/careers-events')}>
                                    <ArrowUpRight size={20} />
                                    <span>Get Events</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='border border-solid p-2 rounded-lg cursor-pointer h-12 '>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className='w-20 text-center font-semibold'>
                                <div className='group-hover:scale-110 duration-200 ease-in ove'>TEAM</div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='mt-4'>
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/team/create-team')}>
                                    <Plus size={20} />
                                    <span>Create Teammate</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/team')}>
                                    <ArrowUpRight size={20} />
                                    <span>Get Teammates</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='border border-solid p-2 rounded-lg cursor-pointer h-12 '>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className='w-full text-center font-semibold'>
                                <div className='group-hover:scale-110 duration-200 ease-in ove'>LANDING_PAGE</div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='mt-4'>
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/landingPage/createLandingPage')}>
                                    <Plus size={20} />
                                    <span>mainPage Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/landingPage')}>
                                    <ArrowUpRight size={20} />
                                    <span>Get Section</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='border border-solid p-2 rounded-lg cursor-pointer h-12 '>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className='w-full text-center font-semibold'>
                                <div className='group-hover:scale-110 duration-200 ease-in ove'>ABOUT_PAGE</div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='mt-4'>
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/infoPage/create-aboutPage')}>
                                    <Plus size={20} />
                                    <span>aboutSection Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/infoPage')}>
                                    <ArrowUpRight size={20} />
                                    <span>Get Section</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='border border-solid p-2 rounded-lg cursor-pointer h-12 '>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className='w-full text-center font-semibold'>
                                <div className='group-hover:scale-110 duration-200 ease-in ove'>CONTACT_PAGE</div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='mt-4'>
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/contactPage/create-contactPage')}>
                                    <Plus size={20} />
                                    <span>contactPage Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='px-2 flex gap-x-2' onClick={() => router.push('/contactPage')}>
                                    <ArrowUpRight size={20} />
                                    <span>Get Section</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className='relative w-20 h-20 cursor-pointer' onClick={() => window.open('http://localhost:3001/','_blink')}>
                    <Image src='/pic.png' alt='mainPic' fill />
                </div>
            </div>
        </div>
    )
}

export default Navbar