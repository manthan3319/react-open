import React from 'react'
import logo from '../../images/logo (2).png'
const Login = () => {
    return (
        <div className='bg-[#2F5231] h-[100vh] flex items-center justify-center'>
            <div className='lg:w-[30%] w-[90%] bg-[#ffffff1c] p-[20px] rounded-[5px]'>
                <img src={logo} alt='logo' className='w-[120px] m-auto mb-[20px]' />

                <div className='flex flex-col gap-[10px]'>
                    <input type='text' placeholder='મોબાઇલ નંબર દાખલ કરો' className='w-[100%] p-[5px] outline-none mb-[10px] rounded-[4px]' />
                    <input type='password' placeholder='પાસવર્ડ દાખલ કરો' className='w-[100%] p-[5px] outline-none mb-[10px] rounded-[4px]' />
                </div>

                <div className='mt-[15px]'>
                    <button className='w-[100%] bg-[#2F5231] text-center text-white p-[13px] rounded-[5px]'>પ્રવેશ કરો</button>
                </div>
            </div>
        </div>

    )
}

export default Login
