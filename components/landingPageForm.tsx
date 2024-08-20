import { UploadButton } from '@/utils/uploadthing'
import React, { useState } from 'react'
import { useToast } from './ui/use-toast'
import Image from 'next/image'
import { Textarea } from './ui/textarea'
import { Loader2, XCircle } from 'lucide-react'

const LandingPageForm = ({ type, infos, setInfos, submitting, handleInfos }) => {
  const { toast } = useToast()
  const [deleteImage, setDeleteImage] = useState(false)

  const handleDeleteImage = async (image: string) => {
    setDeleteImage(true)
    const imageKey = image.substring(image.lastIndexOf('/') + 1)
    try {
      const response = await fetch('/api/uploadthing/delete', {
        method: 'POST',
        body: JSON.stringify({ imageKey })
      })
      if (response.ok) {
        toast({
          variant: 'default',
          description: 'Image Deleted Succesfully'
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Somerhing went Wrong'
      })
    } finally {
      setDeleteImage(false)
    }}
    return (
      <div>
        <form onSubmit={handleInfos} className='flex justify-center'>
          <div className='flex flex-col gap-y-5'>
            <span className='text-3xl font-bold text-gray-800'>Hey Admin! Feel Free to {type} your infos</span>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>Your title</label>
              <textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={infos.title} onChange={(e) => setInfos({ ...infos, title: e.target.value })} placeholder='Type your title...' />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>shortDescription</label>
              <Textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={infos.shortDescription} onChange={(e) => setInfos({ ...infos, shortDescription: e.target.value })} placeholder='Type your shortDescription ...' />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>description</label>
              <Textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={infos.description} onChange={(e) => setInfos({ ...infos, description: e.target.value })} placeholder='Type your description ...' />
            </div>
            <div className='flex gap-x-3 justify-between'>
              <div className='flex flex-col items-center gap-y-2'>
                <span>Experience</span>
                <input className='border-[2px] border-solid border-gray-400 rounded-lg text-center w-full' type='number' value={infos.experience} onChange={(e) => setInfos({ ...infos, experience: e.target.value })} />
              </div>
              <div className='flex flex-col items-center gap-y-2'>
                <span>Competitions</span>
                <input className='border-[2px] border-solid border-gray-400 rounded-lg text-center w-full' type='number' value={infos.competition} onChange={(e) => setInfos({ ...infos, competition: e.target.value })} />
              </div>
              <div className='flex flex-col items-center gap-y-2'>
                <span>Projects</span>
                <input className='border-[2px] border-solid border-gray-400 rounded-lg text-center w-full' type='number' value={infos.projects} onChange={(e) => setInfos({ ...infos, projects: e.target.value })} />
              </div>
            </div>
            {infos.heroImage ?
              <div className='relative w-[200px] h-[200px]  border border-hashed p-4'>
                <Image src={infos.heroImage} fill alt='infosImage' />
                <button onClick={() => {
                  handleDeleteImage(infos.heroImage)
                  setInfos({ ...infos, heroImage: '' })
                }} className='absolute right-2 top-2'>
                  {deleteImage ? <Loader2 /> : <XCircle />}
                </button>
              </div> :
              <div className='border border-dashed border-gray-600 rounded-xl p-3'>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setInfos({ ...infos, heroImage: res[0].url })
                    toast({
                      variant: 'default',
                      description: '📣 Image Uploaded Succesfully'
                    })
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      variant: 'destructive',
                      description: `error:, ${error} `
                    })
                  }}
                />
              </div>
            }
            <div className='my-5 flex justify-center'>
              <button className=' bg-slate-600 text-white rounded-md p-3 w-[200px]' type='submit' disabled={submitting} >
                {submitting ? `${type}...` : type}
              </button>
            </div>
          </div>
        </form >
      </div >
    )
  }

  export default LandingPageForm