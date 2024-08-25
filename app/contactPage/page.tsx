'use client'

import ContactPageTable from "@/components/contactPageTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [infos, setInfos] = useState([])

  useEffect(() => {
    const fetchInfos = async () => {
      const response = await fetch('/api/contactPage/get-contactPage', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
      const data = await response.json()
      setInfos(data)
    }
    fetchInfos()
  }, [])

  const handleEdit = (section: any) => {
    router.push(`/contactPage/update-contactPage?id=${section._id}`)
  }

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <ContactPageTable data={infos} handleEdit={handleEdit} />
    </main>
  )
}