import Image from 'next/image'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'


const fields = ['userName','email','description']

const ContactsTable = ({ data }: any) => {

  return (
    <div className='flex flex-col gap-y-3 mt-2'>
      {data.map((contact: any) => {
        return (
          <div className='flex flex-col gap-y-5 border border-solid mx-5 border-black rounded-md' key={contact._id}>
              <Table >
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
                        <TableCell key={field}>
                          {contact[field] }
                        </TableCell>
                      )
                    })}

                  </TableRow>
                </TableBody>
              </Table>
          </div>
        )
      })}
    </div>
  )
}

export default ContactsTable