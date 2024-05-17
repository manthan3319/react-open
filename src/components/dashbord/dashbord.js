import React, { useState, useEffect } from 'react';
import axios from 'axios';
import port from '../port';
const Dashbord = () => {

  const [arraviamount, setArravepayment] = useState([]);
  const [RemaindingTotalAbount, setRemaindingTotalAbount] = useState([]);

  const handleButtonClick = async () => {
    try {
      const response = await axios.post(
        `${port}/api/v1/Customer/dashbordList`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data && response.data.statusCode === 200) {
        setArravepayment(response.data.data.arraviTotalAbount);
        setRemaindingTotalAbount(response.data.data.RemaindingTotalAbount);
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  useEffect(() => {
    handleButtonClick();
  }, [arraviamount, RemaindingTotalAbount]);

  return (
    <>

      <div className='bg-[#EAF3F0] min-h-[600px] lg:pt-[50px] pt-[50px]'>
        <div className='lg:max-w-[1440px] lg:px-[150px] max-w-[400px] px-[30px]' >
          <div className='flex flex-col lg:flex-row lg:gap-[50px] gap-[15px]'>
            <div className='card bg-[#2F5231] py-[20px] px-[20px] lg:w-[20%] w-[100%] text-white rounded-[10px]'>
              <h1 className='font-semibold'>પ્રાપ્ત રકમ</h1>
              <p className='text-white text-[15px] mt-[10px]'>₹ {arraviamount || 0}</p>
            </div>

            <div className='card bg-[#2F5231] py-[20px] px-[20px] lg:w-[20%] w-[100%] text-white rounded-[10px]'>
              <h1 className='font-semibold'>આવવાની બાકી રકમ</h1>
              <p className='text-white text-[15px] mt-[10px]'>₹ {RemaindingTotalAbount || 0}</p>
            </div>

            {/* <div className='card bg-[#2F5231] py-[20px] px-[20px] lg:w-[20%] w-[100%] text-white rounded-[10px]'>
              <h1 className='font-semibold'>નફો</h1>
              <p className='text-white text-[15px] mt-[10px]'>₹ 5000</p>
            </div> */}

          </div>
        </div>
      </div>
    </>
  )
}

export default Dashbord
