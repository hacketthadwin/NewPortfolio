import React from 'react'
import MotionWrapper from './MotionWrapper'
import PixelCard from './othercomps/PixelCard'

const Competitive = () => {
  return (
    <MotionWrapper>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:scale-125  2xl:ml-[10rem]  xl:ml-[12rem] lg:ml-[12rem] md:ml-[5rem] sm:ml-[10rem] mt-[10rem] ml-[0rem]'>
        <PixelCard variant="white">
          <a href='https://codeforces.com/profile/hacketthadwin7' className='absolute left-0 ml-5'>
            <div className='text-2xl font-bold text-white'>Codeforces</div>
            <img src="/images/codeforces.jpg" alt="" className='w-9 h-9 mt-4'/>
            <br />
            <p className='text-green-500 text-2xl font-semibold'>PUPIL</p>
            <p className='text-gray-400 text-xl font-semibold'>Username: <span className='text-white'>hacketthadwin7</span></p>
          </a>
        </PixelCard>
                <PixelCard variant="white">
          <a href='https://www.codechef.com/users/hacketthadwin7' className='absolute left-0 ml-5'>
            <div className='text-2xl font-bold text-white'>CodeChef</div>
            <img src="/images/codechef.png" alt="" className='w-20 h-9 mt-4'/>
            <br />
            <p className='text-blue-500 text-2xl font-semibold'>3 Star</p>
            <p className='text-gray-400 text-xl font-semibold'>Username: <span className='text-white'>hacketthadwin7</span></p>
          </a>
        </PixelCard>
      </div>
    </MotionWrapper>
  )
}

export default Competitive
