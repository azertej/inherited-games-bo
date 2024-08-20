'use client'
import React, { useState } from 'react'
import { UploadButton } from '@/utils/uploadthing'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import Image from 'next/image'
import { Loader2, XCircle } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

const GamesForm = ({ type, game, setGame, submitting, handleSubmit }) => {

    const [deleteImage, setDeleteImage] = useState(false)
    const { toast } = useToast()

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
        <div >
            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-14' >
                <div className='flex flex-col gap-y-5'>
                    <span className='text-3xl font-bold text-gray-800'>Hey Admin! Feel Free to {type} your games</span>
                    <span className='text-xl font-bold text-blue-700'> {type} your game here </span>
                    <label className=' flex flex-col gap-y-2'>
                        <span className='font-bold'>Your Title</span>
                        <textarea className='font-bold border border-solid border-black px-2 rounded-md'
                            value={game.title} onChange={(e) => setGame({ ...game, title: e.target.value })} required placeholder='title...' />
                    </label>
                    <label className=' flex flex-col gap-y-2 '>
                        <span className='font-bold'>Your Description</span>
                        <Textarea className='font-bold border border-solid border-black px-2'
                            value={game.description} onChange={(e) => setGame({ ...game, description: e.target.value })} required placeholder='description...' />
                    </label>
                    <label className=' flex flex-col gap-y-2 '>
                        <span className='font-bold'>Your Main Description</span>
                        <Textarea className='font-bold border border-solid border-black px-2'
                            value={game.mainDescription} onChange={(e) => setGame({ ...game, mainDescription: e.target.value })} required placeholder='main description...' />
                    </label>
                    <div className='my-5 flex flex-col gap-y-2'>
                        <span className='font-bold text-md'>Import The Main Image</span>
                        {game.mainImage ?
                            <div className='relative w-[200px] h-[200px] border border-hashed p-4'>
                                <Image src={game.mainImage} fill alt='image' />
                                <button onClick={() => {
                                    setGame({ ...game, mainImage: '' })
                                    handleDeleteImage(game.mainImage)
                                }
                                }
                                    className='absolute right-2 top-2'>
                                    {deleteImage ? <Loader2 /> : <XCircle />}
                                </button>
                            </div>
                            :
                            <div className='border border-dashed border-gray-600 rounded-xl p-3'>
                                <UploadButton
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        setGame({ ...game, mainImage: res[0].url })
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
                </div>
                <div className='flex flex-col gap-y-5 mt-[2px]'>
                    <div className='grid grid-cols-3 gap-x-5'>
                        <div className='flex flex-col gap-y-2'>
                            <span className='font-bold'>Genre</span>
                            <Select onValueChange={(value) => setGame({ ...game, genre: value })}
                                value={game.genre} >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Genre" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Sports">Sports</SelectItem>
                                    <SelectItem value="Action">Action</SelectItem>
                                    <SelectItem value="Adventure">Adventure</SelectItem>
                                    <SelectItem value="Troll">Troll</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <span className='font-bold'>Platforms</span>
                            <Select onValueChange={(value) => setGame({ ...game, platforms: value })}
                                value={game.platforms} >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PC">PC</SelectItem>
                                    <SelectItem value="PS4">PS4</SelectItem>
                                    <SelectItem value="XBOX">XBOX</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <span className='font-bold'>ArtStyle</span>
                            <Select onValueChange={(value) => setGame({ ...game, artStyle: value })}
                                value={game.artStyle} >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select ArtStyle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="3D">3D</SelectItem>
                                    <SelectItem value="Realistic">Realistic</SelectItem>
                                    <SelectItem value="2D">2D</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='mt-3 flex flex-col gap-y-3'>
                        <label className=' flex flex-col gap-y-1'>
                            <span className='font-bold'> Graphic</span>
                            <Textarea className='font-bold border border-solid border-black px-2'
                                value={game.graphic} onChange={(e) => setGame({ ...game, graphic: e.target.value })} required placeholder='graphic...' />
                        </label>
                        <label className=' flex flex-col gap-y-1 '>
                            <span className='font-bold'>myCareer</span>
                            <Textarea className='font-bold border border-solid border-black px-2'
                                value={game.myCareer} onChange={(e) => setGame({ ...game, myCareer: e.target.value })} required placeholder='myCareer...' />
                        </label>
                        <label className=' flex flex-col gap-y-1 '>
                            <span className='font-bold'>myTeamMode</span>
                            <Textarea className='font-bold border border-solid border-black px-2'
                                value={game.myTeamMode} onChange={(e) => setGame({ ...game, myTeamMode: e.target.value })} required placeholder='myTeamMode...' />
                        </label>
                        <div className='my-5 flex flex-col gap-y-2'>
                            <span className='font-bold text-md'>Import The Rest of Images</span>
                            {game.images && game.images.length > 0 ?
                                <div className='flex gap-x-8'>
                                    <div className='my-5 grid grid-cols-2 gap-3'>
                                        {game.images.map((image, index) => (
                                            <div className='relative w-[200px] h-[200px] border border-hashed p-4' key={index}>
                                                <Image src={image} fill alt={`(${index}) image`} />
                                                <button className='absolute right-2 top-2'
                                                    onClick={() => {
                                                        handleDeleteImage(image)
                                                        setGame({ ...game, images: game.images.filter((img, i) => i !== index) })
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
                                            setGame({ ...game, images: [...game.images, res[0].url] })
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
                                            setGame({ ...game, images: [...game.images, res[0].url] })
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
                    </div>

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

export default GamesForm