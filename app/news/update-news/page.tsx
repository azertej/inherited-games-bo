'use client'
import NewsForm from '@/components/newsForm'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const newsId = searchParams.get('id')
  const [submitting, setSubmitting] = useState(false)
  const [news, setNews] = useState({
    title: '',
    mainDescription: '',
    description: '',
    NewsmainImage: '',
    NewsImages: []
  })

  useEffect(() => {
    const getNewsById = async () => {
      const response = await fetch(`/api/news/update-news/${newsId}`)
      const data = await response.json()
      setNews({
        title: data.title,
        mainDescription: data.mainDescription,
        description: data.description,
        NewsmainImage: data.NewsmainImage,
        NewsImages: data.NewsImages,
      })
    }
     if(newsId) getNewsById()
  }, [newsId])

  const editNews = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    if (!newsId) alert('cant find news with this ID')
    try {
      const response = await fetch(`/api/news/update-news/${newsId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: news.title,
          mainDescription: news.mainDescription,
          description: news.description,
          NewsmainImage: news.NewsmainImage,
          NewsImages: news.NewsImages,
        })
      })
      if (response.ok) {
        router.push('/news')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(true)
    }
  }

  return (
    <div className='px-5 mt-28'>
      <NewsForm type='Edit' news={news} setNews={setNews} submitting={submitting} handleNews={editNews} />
    </div>
  )
}

export default Page