import React from 'react'

function Error({errorM}) {
    if(errorM.code=="file-invalid-type"){
        return <p className='text-xl text-red-400'>😔فایل معتبر نیست یکی را انتخاب کنید .png .jpg یا .jpeg</p>
    }
    if(errorM.code == "too-many-files"){
        return <p className='text-xl text-red-400'>😔حداکثر 10 فایل مجاز است</p>
    }
 
}

export default Error