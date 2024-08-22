import { UploadButton } from '@/utils/uploadthing'
import React, { useState } from 'react'
import { useToast } from './ui/use-toast'
import Image from 'next/image'
import { Textarea } from './ui/textarea'
import { Loader2, XCircle } from 'lucide-react'

const TeamForm = ({ type, teams, setTeams, submitting, handleTeams }: any) => {

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
        <form onSubmit={handleTeams} className='flex justify-center'>
          <div className='flex flex-col gap-y-5'>
            <span className='text-3xl font-bold text-gray-800'>Hey Admin! Feel Free to {type} your teams</span>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>Your Teammate Name</label>
              <textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={teams.Teammate} onChange={(e) => setTeams({ ...teams, Teammate: e.target.value })} placeholder='Type your Teammate Name ...' />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>Role</label>
              <textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={teams.Role} onChange={(e) => setTeams({ ...teams, Role: e.target.value })} placeholder='Type your Role ...' />
            </div>
            {teams.personImage ?
              <div className='relative w-[200px] h-[200px]  border border-hashed p-4'>
                <Image src={teams.personImage} fill alt='teamsImage' />
                <button onClick={() => {
                  handleDeleteImage(teams.personImage)
                  setTeams({ ...teams, personImage: '' })
                }} className='absolute right-2 top-2'>
                  {deleteImage ? <Loader2 /> : <XCircle />}
                </button>
              </div> :
              <div className='border border-dashed border-gray-600 rounded-xl p-3'>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setTeams({ ...teams, personImage: res[0].url })
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


  export default TeamForm