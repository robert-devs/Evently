"use client"

import { IEvent } from '@/lib/mongoDB/database/models/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'

const CheckoutButon  = ({event}:{event:IEvent}) => {
     const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;
    const hasEventFinished = new Date(event.endDateTime) < new Date()

  return (
    <div className=' flex items-center gap-3'>
        {
            hasEventFinished ?(
                <p className='p-2 text-red-400'>Sorry the ticket are no longer available</p>
            )
            :
            (
              <>
                <SignedOut>
                   <Button asChild className='button rounded-full' size='lg'>
                        <Link href="/sign-in" >
                            Get Tickes
                        </Link>
                    </Button>             
                </SignedOut>

                <SignedIn>
                    <Checkout event={event} userId={userId}  />
                </SignedIn>
              </>
            )
        }
    </div>
  )
}

export default CheckoutButon 