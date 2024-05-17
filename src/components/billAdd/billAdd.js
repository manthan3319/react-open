import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sheet } from 'react-modal-sheet';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import port from '../port'

const BillAdd = () => {
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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    surName: '',
    phone: '',
    instrumentName: '',
    hours: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all required fields are filled
    if (!formData.firstName || !formData.lastName || !formData.surName || !formData.phone || !formData.instrumentName || !formData.hours || !formData.price) {
      toast.error('કૃપા કરીને બધી માહિતી ઉમેરો');
      return;
    }
    try {
      const response = await axios.post( 'http://35.154.84.155:7000/api/v1/Customer/add', formData);
      // console.log(response.data); 
      if (response.data.statusCode === 200) {
        toast.success('તમારું બિલ સફળતાપૂર્વક ઉમેરાયુ!');
      } else {
        toast.success('તમારું બિલ સફળતાપૂર્વક ઉમેરાયુ નથી!');
      }
    } catch (error) {
      console.error('Error:', error); // handle error here
    }
  };

  return (
    <>
      <div>
        <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
          <Sheet.Container className='lg:max-w-[1440px] lg:px-[150px] relative'>
            <Sheet.Header />
            <Sheet.Content>
              <form onSubmit={handleSubmit}>
                <div className='bg-[#ffffff1c] p-[20px] rounded-[4px]'>
                  <button onClick={handleClose} className='absolute top-[2px] right-[17px] text-white text-[25px]'><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                  <p className='text-white text-[15px] border-b-[2px] border-white pb-[10px]'>ગ્રાહકનું બિલ ઉમેરો</p>

                  <div className='mt-[25px]'>
                    <div className='flex flex-col gap-[10px]'>
                      <div>
                        <input type='text' name="firstName" value={formData.firstName} onChange={handleChange} placeholder='ખેડૂતનું નામ' className='w-[100%] p-[5px] outline-none mb-[10px] rounded-[4px]' />
                      </div>

                      <div>
                        <input type='text' name="lastName" value={formData.lastName} onChange={handleChange} placeholder='પિતાનું નામ' className='w-[100%] p-[5px] outline-none mb-[10px] rounded-[4px]' />
                      </div>

                      <div>
                        <input type='text' name="surName" value={formData.surName} onChange={handleChange} placeholder='અટક' className='w-[100%] p-[5px] outline-none mb-[10px] rounded-[4px]' />
                      </div>

                      <div>
                        <input type='text' name="phone" value={formData.phone} onChange={handleChange} placeholder='મોબાઇલ નંબર' className='w-[100%] p-[5px] outline-none mb-[10px] rounded-[4px]' />
                      </div>

                      <div className='names1_from'>
                        <select name="instrumentName" value={formData.instrumentName} onChange={handleChange} id="toolName" className='w-[100%] p-[5px] outline-none mb-[10px] rounded-[4px]'>
                          <option>સાધનનું નામ પસંદ કરો</option>
                          <option value="ચેડર">ચેડર</option>
                          <option value="હળ">હળ</option>
                          <option value="રોટાવેટર">રોટાવેટર</option>
                          <option value="પાચીયુ"> પાચીયુ</option>
                          <option value="દાતી">દાતી</option>
                          <option value="સાહ નાખવાનું પાચીયુ">સાહ નાખવાનું પાચીયુ</option>
                          <option value="પાવડો">પાવડો</option>
                          <option value="રાપ">રાપ</option>
                          <option value="વાવણીયો">વાવણીયો</option>
                          <option value="સાઠી કાઠવાની રાપ">સાઠી કાઠવાની રાપ</option>
                        </select>
                      </div>

                      <div>
                        <input type='text' name="hours" value={formData.hours} onChange={handleChange} placeholder='કુલ કલાકો અથવા કુલ વીધા' className='w-[100%] p-[5px] outline-none mb-[10px] rounded-[4px]' />
                      </div>

                      <div>
                        <input type='text' name="price" value={formData.price} onChange={handleChange} placeholder='પ્રતિ કલાક કિમત ' className='w-[100%] p-[5px] outline-none mb-[10px] rounded-[4px]' />
                      </div>

                      <div className=''>
                        <button type="submit" className='w-[100%] bg-[#2F5231] text-center  text-white p-[13px] rounded-[5px]'>બિલ ઉમેરો</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
      </div>
      <ToastContainer />
    </>

  );
}

export default BillAdd;
