'use client'
import GamesForm from '@/components/gamesForm'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [game, setGame] = useState({
        title: '',
        description: '',
        mainDescription:'',
        genre:'',
        platforms:'',
        artStyle:'',
        graphic:'',
        myCareer:'',
        myTeamMode:'',
        mainImage: '',
        images:[]
    })

    const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await fetch('/api/games/create-game-route', {
                method: 'POST',
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
                    mainImage:game.mainImage,
                    images:game.images
                })
            })
            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className='px-5 mt-28' >
            <div className='flex flex-col gap-y-8'>
                <GamesForm type='Create' game={game} setGame={setGame} submitting={submitting} handleSubmit={createPost} />
            </div>
        </div>
    )
}

export default Page