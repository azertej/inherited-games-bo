import { UploadButton } from '@/utils/uploadthing'
import React, { useState } from 'react'
import { useToast } from './ui/use-toast'
import Image from 'next/image'
import { Textarea } from './ui/textarea'
import { Loader2, XCircle } from 'lucide-react'

const NewsForm = ({ type, news, setNews, submitting, handleNews }: any) => {
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
        <form onSubmit={handleNews} className='grid grid-cols-2 gap-x-14'>
          <div className='flex flex-col gap-y-5'>
            <span className='text-3xl font-bold text-gray-800'>Hey Admin! Feel Free to {type} your news</span>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>Your Title</label>
              <textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={news.title} onChange={(e) => setNews({ ...news, title: e.target.value })} placeholder='Type your title ...' />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>Your MainDescription</label>
              <Textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={news.mainDescription} onChange={(e) => setNews({ ...news, mainDescription: e.target.value })} placeholder='Type your mainDescription ...' />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <label className='font-bold'>Your Description</label>
              <Textarea className='font-bold border border-solid border-black px-2 rounded-md'
                value={news.description} onChange={(e) => setNews({ ...news, description: e.target.value })} placeholder='Type your description ...' />
            </div>
            {news.NewsmainImage ?
              <div className='relative w-[200px] h-[200px] my-5 border border-hashed p-4'>
                <Image src={news.NewsmainImage} fill alt='newsImage' />
                <button onClick={() => {
                  handleDeleteImage(news.NewsmainImage)
                  setNews({ ...news, NewsmainImage: '' })
                }} className='absolute right-2 top-2'>
                  {deleteImage ? <Loader2 /> : <XCircle />}
                </button>
              </div> :
              <div className='border border-dashed border-gray-600 rounded-xl p-3'>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setNews({ ...news, NewsmainImage: res[0].url })
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
          <div className='mt-[85px]'>
            <span className='font-bold text-md'>Import The Rest of Images</span>
            {news.NewsImages && news.NewsImages.length > 0 ?
              <div className='flex gap-x-8'>
                <div className='my-5 grid grid-cols-2 gap-3'>
                  {news.NewsImages.map((image: any, index: any) => (
                    <div className='relative w-[200px] h-[200px] border border-hashed p-4' key={index}>
                      <Image src={image} fill alt={`(${index}) image`} />
                      <button className='absolute right-2 top-2'
                        onClick={() => {
                          handleDeleteImage(image)
                          setNews({ ...news, NewsImages: news.NewsImages.filter((img: any, i: any) => i !== index) })
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
                    setNews({ ...news, NewsImages: [...news.NewsImages, res[0].url] })
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
                    setNews({ ...news, NewsImages: [...news.NewsImages, res[0].url] })
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


  export default NewsForm