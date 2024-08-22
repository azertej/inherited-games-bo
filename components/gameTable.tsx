import Image from 'next/image'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'


const fields = ['mainImage','title', 'description', 'mainDescription', 'genre', 'platforms', 'artStyle', 'graphic', 'myCareer', 'myTeamMode']

const GameTable = ({ data, handleEdit, handleDelete }: any) => {
  
    return (
        <div className='flex flex-col gap-y-3 mt-2'>
            {data.map((game: any) => {
                return (
                    <div className='flex flex-col gap-y-5 border border-solid' key={game._id}>
                        <div className='flex gap-x-3 items-center w-[1500px] border border-solid border-black rounded-md'>
                            <Table className='w-full'>
                                <TableHeader>
                                    <TableRow>
                                        {fields.map((field) => {
                                            return (
                                                <TableHead className='w-20' key={field}>{field}</TableHead>
                                            )
                                        })}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        {fields.map((field) => {
                                            return (
                                                <TableCell className='w-20' key={field}>
                                                    {field === 'mainImage'? <Image src={game.mainImage} alt='mainImage' width={40} height={40} /> : game[field] }
                                                </TableCell>
                                            )
                                        })}

                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className='flex flex-col gap-y-3 mx-3'>
                                <button onClick={() => handleEdit(game)}
                                    className='bg-gray-700 text-white text-lg font-semibold p-1 rounded-lg'>
                                    Edit
                                </button>
                                <button onClick={ ()=>handleDelete(game)}
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

export default GameTable