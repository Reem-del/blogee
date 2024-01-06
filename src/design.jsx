import React from 'react'

function Design() {
    let word='VAST BLOG'
    let words=word.split('')
   
    return (
        <div>
        <div className='flex flex-row  absolute top-4 left-3 z-3 font-serief italic'>
        <p className='text-2xl font-bold text-rose-800  '>{words[0]}</p>
        <p className='text-xl font-bold text-slate-600 '>{words[1]}</p>
        <p className='text-lg font-bold text-gray-600'>{words[2]}</p>
        <p className='text-md font-bold text-gray-600'>{words[3]}</p>
        <p className='text-2xl font-bold text-rose-800  '>{words[5]}</p>
        <p className='text-xl font-bold text-slate-600 '>{words[6]}</p>
        <p className='text-lg font-bold text-gray-600'>{words[7]}</p>
        <p className='text-md font-bold text-slate-600 '>{words[8]}</p>
        </div>
            
        </div>
    )
}

export default Design
