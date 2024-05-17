import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    return (
        <div className='bg-[#2F5231] fixed bottom-0 w-[100%] py-[10px]'>
            <div className='lg:max-w-[1440px] lg:px-[150px] max-w-[400px] px-[30px]'>
                <div>
                    <ul className='flex flex-row justify-between'>
                        <li>
                            <Link className='text-white text-[12px] flex flex-col items-center' to="/">
                                <span>ડેશબોર્ડ</span>
                                <span className='text-[20px]'>
                                    <i className="fa fa-home" aria-hidden="true"></i>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link className='text-white text-[12px] flex flex-col items-center' to="/BillAdd">
                                <span>બિલ ઉમેરો</span>
                                <span className='text-[20px]'>
                                    <i className="fa fa-money" aria-hidden="true"></i>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link className='text-white text-[12px] flex flex-col items-center' to="/GetBill">
                                <span>બિલ મેળવો</span>
                                <span className='text-[20px]'>
                                    <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <button className='text-white text-[12px] flex flex-col items-center' onClick={toggleDrawer}>
                                <span>મેનુ</span>
                                <span className='text-[20px]'>
                                    <i className="fa fa-bars" aria-hidden="true"></i>
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>

                <div className='relative'>
                    <Drawer
                        open={isOpen}
                        onClose={toggleDrawer}
                        direction='right'
                        className='bla bla bla'
                        
                    >
                        <button className='text-white absolute right-[15px] top-[5px] text-[16px] bg-[#2F5231] w-[35px] h-[35px] rounded-[50px]' onClick={toggleDrawer}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>

                        <div className='pt-[60px] bg-[#2f5231cc] h-[100vh]'>
                            <ul className='px-[15px]'>
                                <li className='bg-[#2F5231] text-[white] p-[5px] mb-[10px] rounded-[5px] text-[14px]'>
                                    <Link to="/" onClick={toggleDrawer}>ડેશબોર્ડ</Link>
                                </li>
                                <li className='bg-[#2F5231] text-[white] p-[5px] mb-[10px] rounded-[5px] text-[14px]'>
                                    <Link to='/BillAdd' onClick={toggleDrawer}>બિલ ઉમેરો <span classname="text-[12px] text-green-950 " ><i class="fa fa-meetup" aria-hidden="true"></i></span></Link>
                                </li>
                                <li className='bg-[#2F5231] text-[white] p-[5px] mb-[10px] rounded-[5px] text-[14px]'>
                                    <Link to="/GetBill" onClick={toggleDrawer}>બિલ મેળવો <span classname="text-[12px] text-green-950 " ><i class="fa fa-meetup" aria-hidden="true"></i></span> </Link>
                                </li>
                                {/* <li className='bg-[#2F5231] text-[white] p-[5px] mb-[10px] rounded-[5px] text-[15px]'>
                                    <Link to="/Reciveamount" onClick={toggleDrawer}>ગ્રાહક ચુકવણી ઉમેરો</Link>
                                </li> */}
                                <li className='bg-[#2F5231] text-[white] p-[5px] mb-[10px] rounded-[5px] text-[14px]'>
                                    <Link to="/Viewpayment" onClick={toggleDrawer}>ગ્રાહક કુલ બિલ ચૂકવણી <span classname="text-[12px] text-green-950 " ><i class="fa fa-meetup" aria-hidden="true"></i></span> </Link>
                                </li>
                                <li className='bg-[#2F5231] text-[white] p-[5px] mb-[10px] rounded-[5px] text-[14px]'>
                                    <Link to="/ViewallBill" onClick={toggleDrawer}>ગ્રાહકના તમામ ચૂકવણી બિલ જુઓ <span classname="text-[12px] text-green-950 " ><i class="fa fa-meetup" aria-hidden="true"></i></span> </Link>
                                </li>
                                <li className='bg-[#2F5231] text-[white] p-[5px] mb-[10px] rounded-[5px] text-[14px]'>
                                    <Link to="/RemainingAllbillList" onClick={toggleDrawer}>ગ્રાહકના બાકી બિલ જુઓ  </Link>
                                </li>
                            </ul>
                        </div>
                    </Drawer>
                </div>
            </div>
        </div>
    )
}

export default NavBar
