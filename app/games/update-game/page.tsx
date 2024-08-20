'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import GamesForm from '@/components/gamesForm'

const UpdatePost = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const postId = searchParams.get('id')
    const [submitting, setSubmitting] = useState(false)
    const [game, setGame] = useState({
        title: '',
        description: '',
        mainDescription: '',
        genre: '',
        platforms: '',
        artStyle: '',
        graphic: '',
        myCareer: '',
        myTeamMode: '',
        mainImage: '',
        images: []
    })

    useEffect(() => {
        const postById = async () => {
            const response = await fetch(`/api/games/update-game/${postId}`)
            const data = await response.json()
            setGame({
                title: data.title,
                description: data.description,
                mainDescription: data.mainDescription,
                genre: data.genre,
                platforms: data.platforms,
                artStyle: data.artStyle,
                graphic: data.graphic,
                myCareer: data.myCareer,
                myTeamMode: data.myTeamMode,
                mainImage: data.mainImage,
                images: data.images
            })
        }
        if (postId) postById()
    }, [postId])

    const updatePost = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        if (!postId) alert('cant find post with this ID')
        try {
            const response = await fetch(`/api/games/update-game/${postId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: game.title,
                    description: game.description,
                    mainDescription: game.mainDescription,
                    genre: game.genre,
                    platforms: game.platforms,
                    artStyle: game.artStyle,
                    graphic: game.graphic,
                    myCareer: game.myCareer,
                    myTeamMode: game.myTeamMode,
                    mainImage: game.mainImage,
                    images: game.images
                })
            })
            if (response.ok) {
                router.push('/games')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(true)
        }
    }
    return (
        <div className='px-5 mt-28'>
            <GamesForm type='edit' game={game} setGame={setGame} submitting={submitting} handleSubmit={updatePost} />
        </div>
    )

}

export default UpdatePost