import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.action'
import { getOrdersByUser } from '@/lib/actions/order.action'
import { IOrder } from '@/lib/mongoDB/database/models/order.module'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import { get } from 'http'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async({searchParams}:SearchParamProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const ordersPages = Number(searchParams?.ordersPage) || 1
    const eventsPages = Number(searchParams?.ordersPage) || 1
   
  const orders = await getOrdersByUser({ userId, page: ordersPages})

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

    const organizedEvents = await getEventsByUser({ userId, page: eventsPages })

  return (
    <>
     <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>

       <section className="wrapper my-8">
        <Collection 
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Ticket"
          limit={3}
          page={ordersPages}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Event Oganized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">
              Create New Events
            </Link>
          </Button>
        </div>
      </section>

       <section className="wrapper my-8">
        <Collection 
          data={organizedEvents?.data}
          emptyTitle="No event have been created yet"
          emptyStateSubtext="Go Create sonme now!"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPages}
          urlParamName="evantsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  )
}

export default ProfilePage