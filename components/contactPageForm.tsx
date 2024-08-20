
import React from 'react'
import { Textarea } from './ui/textarea'


const ContactForm = ({ type, infos, setInfos, submitting, handleInfos }) => {
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
                        <label className='font-bold'>shortDescription</label>
                        <Textarea className='font-bold border border-solid border-black px-2 rounded-md'
                            value={infos.shortDescription} onChange={(e) => setInfos({ ...infos, shortDescription: e.target.value })} placeholder='Type your shortDescription ...' />
                    </div>
                    <div className=' flex flex-col gap-y-2'>
                        <label className='font-bold'>description</label>
                        <Textarea className='font-bold border border-solid border-black px-2 rounded-md'
                            value={infos.description} onChange={(e) => setInfos({ ...infos, description: e.target.value })} placeholder='Type your description ...' />
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

export default ContactForm