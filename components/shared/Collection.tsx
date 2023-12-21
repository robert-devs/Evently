import { IEvent } from "@/lib/mongoDB/database/models/event.model"
import Card from "./Card"
import Pagination from "./Pagination"

type CollectionType ={
    data:IEvent[],
    emptyStateSubtext:string
    emptyTitle:string
    page:number | string
    limit:number
    totalPages?:number,
    collectionType?:'Events_Organized' | 'My_Ticket'|'All_Events'
    urlParamName?:string
}
const Collection = ({
    data,
    emptyStateSubtext,
    emptyTitle,
    page,
    limit,
    totalPages=0,
    collectionType,
    urlParamName}:CollectionType) => {
  return (
    <>
        {
            data.length > 0 ?(
                <div className=" flex flex-col items-center gap-10">
                    <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:g10">
                        {
                            data.map((event)=>{
                                const hasOrderLink = collectionType=== 'Events_Organized'
                                const HidePrice = collectionType=== 'My_Ticket'

                                return (
                                    <li key={event.id} className="flex justify-center">
                                        <Card event={event}hasOrderLink={hasOrderLink} hidePrice={HidePrice}/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {
                        totalPages > 1 && (
                            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages}  />
                        )
                    }
                </div>
            )
            :
            (
                <div className="flex-center wrapper min-h-[200px] w-full flex-col rounded-[14px] bg-gray-50 py-28 text-center">
                    <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
                    <p className="p-regular-14">{emptyStateSubtext}</p>
                </div>
            )
        }
    </>
  )
}

export default Collection