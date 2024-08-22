import { UploadButton } from '@/utils/uploadthing'
import React, { useState } from 'react'
import { useToast } from './ui/use-toast'
import Image from 'next/image'
import { Textarea } from './ui/textarea'
import { Loader2, XCircle } from 'lucide-react'

const EventForm = ({ type, event, setEvent, submitting, handleSubmit }: any) => {
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
    }
  }
    return (
      <div>
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-14'>
          <div className='flex flex-col gap-y-5'>
            <span className='text-3xl font-bold text-gray-800'>Hey Admin! Feel Free to {type} your event</span>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>Your Title</label>
              <textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} placeholder='Type your title ...' />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>Your EventMaindescription</label>
              <Textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={event.EventMaindescription} onChange={(e) => setEvent({ ...event, EventMaindescription: e.target.value })} placeholder='Type your EventMaindescription ...' />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>Your EventDescription</label>
              <Textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={event.EventDescription} onChange={(e) => setEvent({ ...event, EventDescription: e.target.value })} placeholder='Type your EventDescription ...' />
            </div>
            {event.eventMainImage ?
              <div className='relative w-[200px] h-[200px]  border border-hashed p-4'>
                <Image src={event.eventMainImage} fill alt='eventMainImage' />
                <button onClick={() => {
                  handleDeleteImage(event.eventMainImage)
                  setEvent({ ...event, eventMainImage: '' })
                }} className='absolute right-2 top-2'>
                  {deleteImage ? <Loader2 /> : <XCircle />}
                </button>
              </div> :
              <div className='border border-dashed border-gray-600 rounded-xl p-3'>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setEvent({ ...event, eventMainImage: res[0].url })
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
          </div>
          <div className='mt-[60px] flex flex-col gap-y-3'>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>Date Of Event</label>
              <textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={event.Date} onChange={(e) => setEvent({ ...event, Date: e.target.value })} placeholder='Type your Date ...' />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>Year Of Event</label>
              <textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={event.year} onChange={(e) => setEvent({ ...event, year: e.target.value })} placeholder='Type your year ...' />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>Slide Direction</label>
              <textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={event.Slidedirection} onChange={(e) => setEvent({ ...event, Slidedirection: e.target.value })} placeholder='Type your Direction ...' />
            </div>
            <span className='font-bold text-md'>Import The Rest of Images</span>
            {event.eventImages && event.eventImages.length > 0 ?
              <div className='flex gap-x-8'>
                <div className='my-5 grid grid-cols-2 gap-3'>
                  {event.eventImages.map((image: any, index: any) => (
                    <div className='relative w-[200px] h-[200px] border border-hashed p-4' key={index}>
                      <Image src={image} fill alt={`(${index}) image`} />
                      <button className='absolute right-2 top-2'
                        onClick={() => {
                          handleDeleteImage(image)
                          setEvent({ ...event, eventImages: event.eventImages.filter((img: any, i: any) => i !== index) })
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
                    setEvent({ ...event, eventImages: [...event.eventImages, res[0].url] })
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
                    setEvent({ ...event, eventImages: [...event.eventImages, res[0].url] })
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
          </div >
        </form >
      </div >
    )
  }

  export default EventForm