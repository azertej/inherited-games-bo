'use client'

import React, { useEffect, useState } from 'react'
import { Gamepad2 } from 'lucide-react'
import { Newspaper } from 'lucide-react'
import { CalendarCheck } from 'lucide-react'
import { User } from 'lucide-react'
import { SquareArrowRight } from 'lucide-react'
import { useRouter } from "next/navigation"
import { UserSearch } from 'lucide-react'

const Page = () => {

  const router = useRouter()
  const [games, setGames] = useState([])
  const [events, setEvents] = useState([])
  const [teams, setTeams] = useState([])
  const [news, setNews] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/games/get-games')
      const data = await response.json()
      setGames(data)
    }
    fetchPosts()
    const fetchEvents = async () => {
      const response = await fetch('/api/Career-events/get-events')
      const data = await response.json()
      setEvents(data)
    }
    fetchEvents()
    const fetchTeam = async () => {
      const response = await fetch('/api/team/get-teams')
      const data = await response.json()
      setTeams(data)
    }
    fetchTeam()
    const getNews = async () => {
      const response = await fetch('/api/news/get-news')
      const data = await response.json()
      setNews(data)
    }
    getNews()
  }, [])

  const [contactsInfo, setContactInfos] = useState([])
  const externeURL = 'https://inherited-games-app.vercel.app/'
  useEffect(() => {
    const getContact = async () => {
      const response = await fetch(`${externeURL}/api/contactAPI/get-contacts`)
      const data = await response.json()
      setContactInfos(data)
    }
    getContact()
  }, [externeURL])


  const cardsList = [
    {
      number: games.length,
      description: 'Total Games',
      image: Gamepad2,
      link: '/games',
      bgColor: 'bg-blue-400',
      infoBg: 'bg-blue-500',
      infoColor: 'text-blue-500'
    },
    {
      number: events.length,
      description: 'Total Events',
      image: CalendarCheck,
      link: '/careers-events',
      bgColor: 'bg-orange-300',
      infoBg: 'bg-orange-400',
      infoColor: 'text-orange-500'
    },
    {
      number: teams.length,
      description: 'Total Team',
      image: User,
      link: '/team',
      bgColor: 'bg-red-400',
      infoBg: 'bg-red-500',
      infoColor: 'text-red-500'
    },
    {
      number: news.length,
      description: 'Total News',
      image: Newspaper,
      link: '/news',
      bgColor: 'bg-green-400',
      infoBg: 'bg-green-500',
      infoColor: 'text-green-500'
    },
    {
      number: contactsInfo.length,
      description: 'Total Contacts',
      image: UserSearch,
      link: '/contactsInfo',
      bgColor: 'bg-gray-400',
      infoBg: 'bg-gray-500',
      infoColor: 'text-gray-500'
    }
  ]
  
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='grid grid-cols-4 gap-10'>
        {cardsList.map((card, index) => (
          <div key={index} className='flex flex-col w-[320px] h-[280px] border border-gray-500 rounded-xl overflow-hidden' >
            <div className={`${card.bgColor} flex gap-x-8 justify-between items-center h-[80%] px-5`}>
              <div className='flex flex-col  gap-y-8'>
                <span className='font-bold text-5xl text-white'>{card.number} </span>
                <span className='text-xl font-semibold text-white'>{card.description} </span>
              </div>
              <div>
                <card.image size={96} className={`${card.infoColor}`} />
              </div>
            </div>
            <div className={`${card.infoBg} h-[20%] flex gap-x-5 justify-center items-center `}>
              <span className='text-lg text-gray-200'>More Info</span>
              <SquareArrowRight className='text-gray-200 cursor-pointer' size={25} onClick={() => router.push(`${card.link}`)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page