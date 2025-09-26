import React from 'react'
import GiftsVisible from './GiftsVisible'
import SpinWheel from './SpinWheel'

function FrontPage() {
  return (
    <>
    <div className="header text-center font-bold text-[#761212] p-4 bg-[#FFF1B6]">
        <h1 className='text-4xl'>Sindhi Electronic Store</h1>
    </div>
        <div className="banner-section">
            <img className='desktop w-full h-full' src="Diwali Offer.png" alt="" />
            <img className='mobile w-full h-full' src="diwali mobile.png" alt="" />
        </div>
        <div>
            <GiftsVisible/>
            <SpinWheel/>
        </div>
    </>
  )
}

export default FrontPage
