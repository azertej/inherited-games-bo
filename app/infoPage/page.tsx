'use client'

import AboutPageTable from "@/components/aboutPageTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [infos, setInfos] = useState([])

  useEffect(() => {
    const fetchInfos = async () => {
      const response = await fetch('/api/aboutPage/get-aboutPage')
      const data = await response.json()
      setInfos(data)
    }
    fetchInfos()
  }, [])

  const handleEdit = (section: any) => {
    router.push(`/infoPage/update-aboutPage?id=${section._id}`)
  }

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <AboutPageTable data={infos} handleEdit={handleEdit} />
    </main>
  )
}