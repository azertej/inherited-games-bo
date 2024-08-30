'use client'

import AboutPageTable from "@/components/aboutPageTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Home() {
  const router = useRouter()
  const [infos, setInfos] = useState([])

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const response = await axios.get('/api/aboutPage/get-aboutPage');
        setInfos(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInfos();
  }, []);

  const handleEdit = (section: any) => {
    router.push(`/infoPage/update-aboutPage?id=${section._id}`)
  }

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <AboutPageTable data={infos} handleEdit={handleEdit} />
    </main>
  )
}