import { formatDistanceToNow, parseISO } from 'date-fns';
import React from 'react'

function TimeAgo({timestamp}) {
    let timeago='';
    if(timestamp){
        const date=parseISO(timestamp)
        const timeperiod=formatDistanceToNow(date)
        timeago=`${timeperiod} ago`
    }
   
    return (
        <div className='text-teal-600 underline'>
            <i>{timeago}</i>
        
        </div>
    )
}

export default TimeAgo
