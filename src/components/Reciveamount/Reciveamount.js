import React, { useState, useEffect } from 'react';
import { Sheet } from 'react-modal-sheet';
import { useNavigate } from 'react-router-dom';

const Reciveamount = () => {
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();

    // Open the sheet automatically when the component mounts
    useEffect(() => {
        setOpen(true);
    }, []);

    const handleClose = () => {
        setOpen(false);
        navigate('/');
    };
    return (
        <div>
            <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
                <Sheet.Container className='lg:max-w-[1440px] lg:px-[150px] relative max-w-[400px] px-[30px]'>
                    <Sheet.Header />
                    <Sheet.Content>
                        <div className='bg-[#ffffff1c] p-[20px] rounded-[4px]'>
                            <button onClick={handleClose} className='absolute top-[2px] right-[17px] text-white text-[25px]'><i class="fa fa-times-circle" aria-hidden="true"></i></button>
                            <p className='text-white text-[15px] border-b-[2px] border-white pb-[10px]'>ગ્રાહક ચુકવણી ઉમેરો</p>

                            <div className='mt-[25px]'>
                                <div className='flex flex-col gap-[10px]'>
                                    <div className='flex rounded-[5px] mb-[10px]'>
                                        <input type='number' placeholder='ગ્રાહક મોબાઇલ નંબર દાખલ કરો' className='  text-[12px]  lg:w-[90%] w-[70%] rounded-l-[4px] outline-none p-[5px] text-black ' />
                                        <button className='lg:w-[10%] w-[30%]  text-[12px] bg-[#ffffff3f] text-[#2F5231] font-semibold rounded-r-[4px]'>નંબર તપાસો</button>
                                    </div>

                                    <div>
                                        <input type='Number' disabled placeholder='ગ્રાહક નું નામ' className='w-[100%] text-[12px] p-[5px] outline-none mb-[10px] rounded-[4px]' />
                                    </div>

                                    <div>
                                        <input type='Number' placeholder='ગ્રાહકની ચુકવણી દાખલ કરો' className='w-[100%] text-[12px]  p-[5px] outline-none mb-[10px] rounded-[4px]' />
                                    </div>

                                    <div className=''>
                                        <button className='w-[100%] bg-[#2F5231] text-center text-white p-[13px] rounded-[5px]'>ચુકવણી ઉમેરો</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    )
}

export default Reciveamount
