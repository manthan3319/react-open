import React, { useState, useEffect } from 'react';
import axios from 'axios';
import port from "../port";
const Viewpayment = () => {
    const [phone, setPhone] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [paymentData, setPaymentData] = useState([]);
    const [filteredPaymentData, setFilteredPaymentData] = useState([]);
    const [totalBillAmount, setTotalBillAmount] = useState(0);

    const handleButtonClick = async () => {
        try {
            const response = await axios.post(
                `${port}/api/v1/Customer/listtotalbill`,
                { phone },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.data && response.data.statusCode === 200) {
                setPaymentData(response.data.data.totalBillData); // Assuming data is an array of payment objects
                filterDataByDate(startDate, endDate);
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching payment data:', error);
        }
    };

    useEffect(() => {
        // console.log("paymentData", paymentData);
        filterDataByDate(startDate, endDate);
    }, [paymentData, startDate, endDate]);

    const filterDataByDate = (start, end) => {
        if (start && end) {
            const filteredData = paymentData.filter(payment => {
                const paymentDate = new Date(payment.date);
                return paymentDate >= new Date(start) && paymentDate <= new Date(end);
            });
            setFilteredPaymentData(filteredData);
            calculateTotalBillAmount(filteredData);
        } else {
            setFilteredPaymentData(paymentData);
            calculateTotalBillAmount(paymentData);
        }
    };

    const calculateTotalBillAmount = (data) => {
        const totalAmount = data.reduce((sum, payment) => sum + parseFloat(payment.billtotalamount), 0);
        setTotalBillAmount(totalAmount);
    };

    return (
        <div className='lg:max-w-[1440px] lg:px-[150px] max-w-[400px] px-[30px]'>
             <div className='bg-[#466548] text-center rounded-b-[10px] '>
                    <p className='text-white text-[12px] py-[10px] '>ગ્રાહક કુલ બિલ ચૂકવણી</p>
                </div>
            <div className='bg-white'>
                <div className='flex bg-[#2F5231] mt-[25px] rounded-[5px]'>
                    <input
                        type='number'
                        placeholder='મોબાઇલ નંબર'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className='lg:w-[90%] w-[70%] rounded-l-[5px] outline-none p-[10px] text-white bg-[#2F5231]'
                    />
                    <button
                        className='lg:w-[10%] w-[30%] bg-[#ffffff3f] text-[#2F5231] text-[12px] font-semibold'
                        onClick={handleButtonClick}
                    >
                        ચુકવણી શોધો
                    </button>
                </div>

                <div className='flex flex-row gap-[10px] bg-[#2F5231] lg:w-[30%] mt-[25px] p-[12px] rounded-[5px] items-center'>
                    <input 
                        type='date' 
                        placeholder='પ્રારંભ તારીખ પસંદ કરો' 
                        className='outline-none text-[13px] bg-[#59755A] p-[5px]' 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <p>થી</p>
                    <input 
                        type='date' 
                        placeholder='અંત તારીખ પસંદ કરો' 
                        className='outline-none text-[13px] bg-[#59755A] p-[5px]' 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                {filteredPaymentData && filteredPaymentData.length > 0 && (
                    <div className='mt-[25px] bg-[#466548] p-[20px] rounded-[5px] text-gray-300 mb-[150px]'>
                        <div className='border-b-[1px] border-green-950 pb-[10px]'>
                            <p>નામ : {filteredPaymentData[0].firstName} </p>
                            <p>મોબાઇલ નંબર : {filteredPaymentData[0].phone}</p>
                        </div>

                        <div className='mt-[15px]'>
                            <table className='w-[100%] text-left'>
                                <thead>
                                    <tr>
                                        <th>તારીખ</th>
                                        <th>રકમ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPaymentData.map((payment, index) => (
                                        <tr key={index} className='border-b-[1px] border-gray-500 mb-[10px] pb-[10px]'>
                                            <td>{new Date(payment.date).toLocaleDateString('gu')}</td>
                                            <td>₹{payment.billtotalamount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className='text-white text-right mt-[35px] '>
                            <table className='w-[100%] text-left'>
                                <tr>
                                    <th>કુલ રકમ :</th>
                                    <th>₹{totalBillAmount}</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Viewpayment;
