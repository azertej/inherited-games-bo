'use client'

import LandingPageTable from "@/components/landingPageTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [infos, setInfos] = useState([])

  useEffect(() => {
    const fetchInfos = async () => {
      const response = await fetch('/api/landingPage/get-heroSection-info')
      const data = await response.json()
      setInfos(data)
    }
    fetchInfos()
  }, [])

  const handleEdit = (section: any) => {
    router.push(`/landingPage/update-landingPage?id=${section._id}`)
  }

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <LandingPageTable data={infos} handleEdit={handleEdit} />
    </main>
  )
}