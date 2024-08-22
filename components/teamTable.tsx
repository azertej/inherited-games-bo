import Image from 'next/image'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'


const fields = ['personImage', 'Teammate', 'Role']

const TeamTable = ({ data, handleEdit, handleDelete }: any) => {

    return (
        <div className='flex flex-col gap-y-3 mt-2'>
            {data.map((mate: any) => {
                return (
                    <div className='flex flex-col gap-y-5 border border-solid' key={mate._id}>
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
                                                <TableCell className='w-1/3' key={field}>
                                                    {field === 'personImage' ? <Image src={mate.personImage} alt='personImage' width={60} height={60} /> : mate[field]}
                                                </TableCell>
                                            )
                                        })}

                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className='flex flex-col gap-y-3 mx-3'>
                                <button onClick={() => handleEdit(mate)}
                                    className='bg-gray-700 text-white text-lg font-semibold p-1 rounded-lg'>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(mate)}
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

export default TeamTable