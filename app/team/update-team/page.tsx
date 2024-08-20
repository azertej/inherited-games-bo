'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TeamForm from '@/components/teamForm'

const UpdateTeam = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const matetId = searchParams.get('id')
    const [submitting, setSubmitting] = useState(false)
    const [teams, setTeams] = useState({
        Teammate: '',
        Role: '',
        position: '',
        personImage: '',
    })

    useEffect(() => {
        const teamById = async () => {
            const response = await fetch(`/api/team/update-team/${matetId}`)
            const data = await response.json()
            setTeams({
                Teammate: data.Teammate,
                Role: data.Role,
                position: data.position,
                personImage: data.personImage
            })
        }
        if (matetId) teamById()
    }, [matetId])

    const updateTeam = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        if (!matetId) alert('cant find team with this ID')
        try {
            const response = await fetch(`/api/team/update-team/${matetId}`, {
                method: 'PATCH',
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
            setSubmitting(true)
        }
    }
    return (
        <div className='px-5 mt-28'>
            <TeamForm type='edit' teams={teams} setTeams={setTeams} submitting={submitting} handleTeams={updateTeam} />
        </div>
    )
}
export default UpdateTeam