"use client"

import { IEvent } from '@/lib/mongoDB/database/models/event.model'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'

import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order.action';


 loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type CheckoutProps ={
    event:IEvent
    userId:string
}

const Checkout = ({event,userId}:CheckoutProps) => {
    const onCheckout = async()=>{
         const order ={
            eventTitle:event.title,
            eventId:event._id,
            price:event.price,
            isFree:event.isFree,
            buyerId:userId
         }
          await checkoutOrder(order)
    }

    useEffect(() => {
    const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
        console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
        console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
  }, []);
  return (
    <form action={onCheckout} method='post'>
        <Button type='submit' role='link' size='lg' className='button sm:w-fit'>
            {
                event.isFree ? 'Get Ticket' : 'Buy Ticket'
            }
        </Button>
    </form>
  )
}

export default Checkout