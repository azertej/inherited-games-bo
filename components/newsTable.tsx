import Image from 'next/image'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'


const fields = ['NewsmainImage', 'title', 'mainDescription', 'description']

const NewsTable = ({ data, handleEdit, handleDelete }: any) => {

    return (
        <div className='flex flex-col gap-y-3 mt-2'>
            {data.map((post: any) => {
                return (
                    <div className='flex flex-col gap-y-5 border border-solid' key={post._id}>
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
                                                <TableCell className='w-1/4' key={field}>
                                                    {field === 'NewsmainImage' ? <Image src={post.NewsmainImage} alt='NewsmainImage' width={28} height={28} /> : post[field]}
                                                </TableCell>
                                            )
                                        })}

                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className='flex flex-col gap-y-3 mx-3'>
                                <button onClick={() => handleEdit(post)}
                                    className='bg-gray-700 text-white text-lg font-semibold p-1 rounded-lg'>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(post)}
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