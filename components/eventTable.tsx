import Image from 'next/image'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'


const fields = ['eventMainImage', 'title', 'EventMaindescription', 'EventDescription','Date']

const NewsTable = ({ data, handleEdit, handleDelete }: any) => {
    return (
        <div className='flex flex-col gap-y-3 mt-2'>
            {data.map((Event: any) => {
                return (
                    <div className='flex flex-col gap-y-5 border border-solid' key={Event._id}>
                        <div className='flex gap-x-3 items-center w-[1500px] border border-solid border-black rounded-md'>
                            <Table className='w-full'>
                                <TableHeader>
                                    <TableRow>
                                        {fields.map((field) => {
                                            return (
                                                <TableHead  key={field}>{field}</TableHead>
                                            )
                                        })}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        {fields.map((field) => {
                                            return (
                                                <TableCell className='w-1/5' key={field}>
                                                    {field === 'eventMainImage' ? <Image src={Event.eventMainImage} alt='eventMainImage' width={28} height={28} /> : Event[field]}
                                                </TableCell>
                                            )
                                        })}

                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className='flex flex-col gap-y-3 mx-3'>
                                <button onClick={() => handleEdit(Event)}
                                    className='bg-gray-700 text-white text-lg font-semibold p-1 rounded-lg'>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(Event)}
                                    className='bg-gray-700 text-white text-lg font-semibold p-1 rounded-lg'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                )
            })}
        </div>
    )
}

export default NewsTable