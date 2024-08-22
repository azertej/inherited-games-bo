'use client'
import GameTable from "@/components/gameTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/games/get-games')
      const data = await response.json()
      setGames(data)
    }
    fetchPosts()
  }, [])

  const handleEdit = (game: any) => {
    router.push(`/games/update-game?id=${game._id}`)
  }


  const handleDelete = async (game: any) => {
    const isconfirmed = confirm("Are you sure to delete this game")
    if (isconfirmed) {
      try {
        await fetch(`/api/games/delete-game/${game._id.toString()}`, {
          method: 'DELETE',
        })
        const gamesAfterDelete = games.filter((g: any) => g._id !== game._id)
        setGames(gamesAfterDelete)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <main className="w-full my-5 flex justify-center items-center">
      <div className="flex flex-col gap-y-5">
        <GameTable data={games} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </main>
  );
}
