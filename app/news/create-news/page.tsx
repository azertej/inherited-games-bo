'use client'
import NewsForm from '@/components/newsForm'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const Page = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [news, setNews] = useState({
        title: '',
        mainDescription: '',
        description: '',
        NewsmainImage: '',
        NewsImages: []
    })

    const createNews = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await fetch('/api/news/create-news', {
                method: 'POST',
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
            setSubmitting(false)
        }
    }

    return (
        <div className='px-5 mt-28'>
            <NewsForm type='Create' news={news} setNews={setNews} submitting={submitting} handleNews={createNews} />
        </div>
    )
}

export default Page