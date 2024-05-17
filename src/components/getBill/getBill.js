import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  port from "../port"
const GetBill = () => {
    const [customerData, setCustomerData] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCustomers, setSelectedCustomers] = useState([]);

    const handleClick = async () => {
        try {
            const response = await axios.post(
                `${port}/api/v1/Customer/getCustomer`,
                { phone: phoneNumber },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data && response.data.data && response.data.data.customerdata) {
                setCustomerData(response.data.data.customerdata);
                // console.log("Customer Data:", response.data.data.customerdata);
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    useEffect(() => {
    }, [customerData]);

    const handleInputChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleCheckboxChange = (customer) => {
        setSelectedCustomers((prevSelected) => {
            if (prevSelected.includes(customer._id)) {
                return prevSelected.filter(id => id !== customer._id);
            } else {
                return [...prevSelected, customer._id];
            }
        });
    };

    const selectedCustomerDetails = customerData.filter(customer => selectedCustomers.includes(customer._id));

    const totalSelectedPrice = selectedCustomerDetails.reduce((sum, customer) => sum + parseFloat(customer.totalPrice), 0);

    useEffect(() => {
        // console.log("Selected Customer Details:", selectedCustomerDetails);
        // console.log("Total Selected Price:", totalSelectedPrice);
    }, [selectedCustomerDetails, totalSelectedPrice]);

    const handleSubmit = async () => {
        try {
            const selectedCustomerDetailsFlattened = selectedCustomerDetails.map(customer => ({
                _id: customer._id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                surName: customer.surName,
                instrumentName: customer.instrumentName,
                billtotalamount: customer.totalPrice,
                phone: customer.phone,
                hours: customer.hours,
                price: customer.price
            }));

            const data = {
                // Assuming the API expects an array of these flattened objects
                selectedCustomerDetails: selectedCustomerDetailsFlattened,
                totalSelectedPrice
            };

            // console.log("Data to be sent:", data);

            const response = await axios.post(
                `${port}/api/v1/Customer/getbill`,
                data,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.statusCode === 200) {
                toast.success('તમારું બિલ સફળતાપૂર્વક ઉમેરાયુ!');
                window.location.reload();
            } else {
                toast.success('તમારું બિલ સફળતાપૂર્વક ઉમેરાયુ નથી!');
            }

        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Error request:', error.request);
            } else {
                // Something else happened
                console.error('Error message:', error.message);
            }
        }
    };


    return (
        <div className='lg:max-w-[1440px] lg:px-[150px] max-w-[400px] px-[30px]'>
            <div className='bg-white'>
                <div className='bg-[#466548] text-center rounded-b-[10px] '>
                    <p className='text-white text-[12px] py-[10px] '>ગ્રાહકનું બિલ મેળવો</p>
                </div>
                <div className='flex bg-[#2F5231] mt-[25px] rounded-[5px]'>
                    <input
                        type='number'
                        placeholder='મોબાઇલ નંબર'
                        value={phoneNumber}
                        onChange={handleInputChange}
                        className='lg:w-[90%] w-[70%] rounded-l-[5px] outline-none p-[10px] text-white bg-[#2F5231]'
                    />
                    <button
                        className='lg:w-[10%] w-[30%] bg-[#ffffff3f] text-[#2F5231] text-[12px] font-semibold'
                        onClick={handleClick}
                    >
                        બિલ શોધો
                    </button>
                </div>

                {customerData && customerData.length > 0 && (
                    <div className='bg-[#466548] p-[20px] mt-[20px] mb-[150px] rounded-[4px]'>
                        <div className='text-white mb-[30px] border-b-[1px] border-green-950 pb-[5px]'>
                            <h1 className='mb-[10px]'>નામ : {customerData[0].firstName} {customerData[0].surName}</h1>
                            <p>મોબાઇલ નંબર : {customerData[0].phone}</p>
                        </div>
                        {customerData.map((customer, index) => (
                            <div key={index} className=''>
                                <div className='flex flex-row border-b-[1px] items-center border-gray-400 pb-[10px] mb-[10px]' >
                                    <div className='flex flex-row  gap-[0px] text-gray-300 w-[10%]'>
                                        <input
                                            id={`link-checkbox-${index}`}
                                            type="checkbox"
                                            checked={selectedCustomers.includes(customer._id)}
                                            onChange={() => handleCheckboxChange(customer)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>

                                    <div className='flex flex-col gap-[16px] mt-[10px] text-gray-300 w-[90%]'>
                                        <div>
                                            <p>{customer.instrumentName}</p>
                                            <p className='text-[12px]'>{new Date(customer.date).toLocaleDateString('gu')}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div>
                                                <p>કલાક</p>
                                                <p>{customer.hours}</p>
                                            </div>

                                            <div>
                                                <p>રકમ</p>
                                                <p>₹{customer.price}</p>
                                            </div>

                                            <div>
                                                <p>કુલ રકમ</p>
                                                <p>₹{customer.totalPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {selectedCustomers.length > 0 && (
                            <div className='text-white mt-[20px]'>
                                <h2>પસંદ કરેલ કુલ રકમ: ₹{totalSelectedPrice}</h2>
                            </div>
                        )}
                        <div className='mb-[30px] mt-[30px]'>
                            <button
                                type="submit"
                                className='w-[100%] bg-[#2F5231] text-center text-white p-[13px] rounded-[5px]'
                                onClick={handleSubmit}
                            >
                                બિલ ઉમેરો
                            </button>
                        </div>
                    </div>
                )}
                <ToastContainer />
            </div>
        </div>
    );
};

export default GetBill;
