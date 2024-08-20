import Image from 'next/image'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'


const fields = ['title', 'shortDescription', 'description', 'experience', 'competition', 'projects']

const LandingPageTable = ({ data, handleEdit }) => {

  return (
    <div className='flex flex-col gap-y-3 mt-2'>
      {data.map((info) => {
        return (
          <div className='flex flex-col gap-y-5 border border-solid' key={info._id}>
            <div className='flex gap-x-3 items-center w-[1500px] border border-solid border-black rounded-md'>
              <Table className='w-full'>
                <TableHeader>
                  <TableRow>
                    {fields.map((field) => {
                      return (
                        <TableHead key={field}>{field}</TableHead>
                      )
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    {fields.map((field) => {
                      return (
                        <TableCell className='w-1/6' key={field}>
                          {info[field]}
                        </TableCell>
                      )
                    })}

                  </TableRow>
                </TableBody>
              </Table>
              <div className='flex items-center mx-3'>
                <button onClick={() => handleEdit(info)}
                  className='bg-gray-700 text-white text-lg font-semibold p-1 rounded-lg w-28 mx-2'>
                  Edit
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LandingPageTable