'use client'
import NewsTable from '@/components/newsTable'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const router = useRouter()
  const [news, setNews] = useState([])

  useEffect(() => {
    const getNews = async () => {
      const response = await fetch('/api/news/get-news')
      const data = await response.json()
      setNews(data)
    }
    getNews()
  }, [])

  const handleEdit = (post: any) => {
    router.push(`/news/update-news?id=${post._id}`)
  }

  const handleDelete = async (post: any) => {
    const isconfirmed = confirm("Are you sure to delete this news")
    if (isconfirmed) {
      try {
        await fetch(`/api/news/delete-news/${post._id.toString()}`, {
          method: 'DELETE',
        })
        const newsAfterDelete = news.filter((n: any) => n._id !== post._id)
        setNews(newsAfterDelete)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='w-full my-5 flex justify-center items-center'>
      <NewsTable data={news} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  )
}

export default Page