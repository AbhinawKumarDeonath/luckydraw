import React from 'react'

function SpinWheel() {
  return (
    <>
      <div className="bg-[#FFF1B6]">

<div className="top-spin flex flex-col justify-center items-center sm:flex-row p-4">
    <div className=""><h2 className=" text-2xl font-bold mb-4">Try Your Luck!</h2></div>
    <div className="sm:ml-8">
 <a href="/participate">

<div class=" flex items-center justify-center bg-gray-100 font-poppins">

    <button class="relative w-[250px] h-[60px] bg-yellow-400 border border-black rounded-[5mm] shadow-[3px_3px_0_rgb(0,0,0)] cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-[6px_6px_0_rgb(0,0,0)] hover:z-10">
   
    <div class="relative z-10 flex items-center justify-center h-full text-xl font-bold text-black font-poppins">
      Lets Go
    </div>
 
    <div class="absolute top-full left-0 wave"></div>
  </button>
</div>

 </a>
    </div>
</div>
         
 <section className="flex justify-center  flex-col lg:flex-row items-center p-6  rounded-lg text-center lg:text-left gap-8">
  
  {/* Left Side: Spin Wheel */}
  <div className="flex flex-col items-center lg:items-start">
   
    <img
      src="image-removebg-preview (1).png"
      alt="Spin Wheel"
      className="w-72 h-72 sm:w-72 sm:h-72 lg:w-[40rem] lg:h-[35rem]  mb-6 animate-spin-slow"
    />
    
  </div>

  {/* Right Side: Instructions */}
  <div className=" lg:mt-0 max-w-md">
    <h3 className="font-semibold mb-2 text-2xl">How to Play:</h3>
    <ul className="list-disc font-bold list-inside  space-y-2 text-gray-700 text-xl">
      <li>Click the "Lets Go" button.</li>
      <li>Follow us on all Social Media </li>
      <li>Owner will Put Pass Code </li>
      <li>Press Spin Button </li>
      <li>Wait for the wheel to stop spinning.</li>
      <li>See which gift you win!</li>
      <li>Claim your prize immediately.</li>
    </ul>
   
  </div>
</section>
      </div>

      <div className="">
        <h3 className='text-xl sm:text-4xl font-bold text-center p-4 bg-[#761212] text-white'>
            Thank you for Shopping with us 🙏🤗
        </h3>
      </div>


    </>
   

  )
}

export default SpinWheel
