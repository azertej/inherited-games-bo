import { UploadButton } from '@/utils/uploadthing'
import React, { useState } from 'react'
import { useToast } from './ui/use-toast'
import Image from 'next/image'
import { Textarea } from './ui/textarea'
import { Loader2, XCircle } from 'lucide-react'

const AboutForm = ({ type, infos, setInfos, submitting, handleInfos }) => {
  const { toast } = useToast()
  const [deleteImage, setDeleteImage] = useState(false)

  const handleDeleteImage = async (image) => {
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
    }
  }
  return (
    <div>
      <form onSubmit={handleInfos} className='flex justify-center'>
        <div className='flex flex-col gap-y-5'>
          <span className='text-3xl font-bold text-gray-800'>Hey Admin! Feel Free to {type} your infos</span>
          <div className=' flex flex-col gap-y-2'>
            <label className='font-bold'>Your title</label>
            <textarea className='font-bold border border-solid border-black px-2 rounded-md'
              value={infos.title} onChange={(e) => setInfos({ ...infos, title: e.target.value })} placeholder='Type your title ...' />
          </div>
          <div className=' flex flex-col gap-y-2'>
            <label className='font-bold'>description</label>
            <Textarea className='font-bold border border-solid border-black px-2 rounded-md'
              value={infos.description} onChange={(e) => setInfos({ ...infos, description: e.target.value })} placeholder='Type your description ...' />
          </div>
          <span className='font-bold'>About Page Image</span>
          {infos.aboutPageImage ?
            <div className='relative w-[200px] h-[200px]  border border-hashed p-4'>
              <Image src={infos.aboutPageImage} fill alt='aboutPageImage' />
              <button onClick={() => {
                handleDeleteImage(infos.aboutPageImage)
                setInfos({ ...infos, aboutPageImage: '' })
              }} className='absolute right-2 top-2'>
                {deleteImage ? <Loader2 /> : <XCircle />}
              </button>
            </div> :
            <div className='border border-dashed border-gray-600 rounded-xl p-3'>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setInfos({ ...infos, aboutPageImage: res[0].url })
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
          <span className='font-bold'>More Images</span>
          {infos.StuffsImages && infos.StuffsImages.length > 0 ?
            <div className='flex gap-x-8'>
              <div className='my-5 grid grid-cols-2 gap-3'>
                {infos.StuffsImages.map((image, index) => (
                  <div className='relative w-[200px] h-[200px] border border-hashed p-4' key={index}>
                    <Image src={image} fill alt={`(${index}) image`} />
                    <button className='absolute right-2 top-2'
                      onClick={() => {
                        handleDeleteImage(image)
                        setInfos({ ...infos, StuffsImages: infos.StuffsImages.filter((img, i) => i !== index) })
                        toast({
                          variant: 'default',
                          description: 'Image Deleted Succesfully'
                        })
                      }}
                    >
                      {deleteImage ? <Loader2 /> : <XCircle />}
                    </button>
                  </div>
                ))
                }
              </div>
              <UploadButton
                className='mt-[-30px]'
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setInfos({ ...infos, StuffsImages: [...infos.StuffsImages, res[0].url] })
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
            :
            <div className='border border-dashed border-gray-600 rounded-xl p-3'>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setInfos({ ...infos, StuffsImages: [...infos.StuffsImages, res[0].url] })
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

export default AboutForm