'use client'
import TeamForm from '@/components/teamForm'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const Page = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [teams, setTeams] = useState({
        Teammate: '',
        Role: '',
        position:'',
        personImage: '',
    })

    const createTeams = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await fetch('/api/team/create-team', {
                method: 'POST',
                body: JSON.stringify({
                    Teammate: teams.Teammate,
                    Role: teams.Role,
                    position : teams.position,
                    personImage: teams.personImage,
                })
            })
            if (response.ok) {
                router.push('/team')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className='px-5 mt-28'>
            <TeamForm type='Create' teams={teams} setTeams={setTeams} submitting={submitting} handleTeams={createTeams} />
        </div>
    )
}

export default Page