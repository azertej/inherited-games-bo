'use client'

import TeamTable from "@/components/teamTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const fetchTeam = async () => {
      const response = await fetch('/api/team/get-teams')
      const data = await response.json()
      setTeams(data)
    }
    fetchTeam()
  }, [])

  const handleEdit = (mate: any) => {
    router.push(`/team/update-team?id=${mate._id}`)
  }


  const handleDelete = async (mate: any) => {
    const isconfirmed = confirm("Are you sure to delete this mate")
    if (isconfirmed) {
      try {
        await fetch(`/api/team/delete-team/${mate._id.toString()}`, {
          method: 'DELETE',
        })
        const TeamAfterDelete = teams.filter((t: any) => t._id !== mate._id)
        setTeams(TeamAfterDelete)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <main className="w-full my-5 flex justify-center items-center">
      <TeamTable data={teams} handleEdit={handleEdit} handleDelete={handleDelete} />
    </main>
  );
}