import React, { useState } from 'react';
import MotionWrapper from './MotionWrapper';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://newportfolio-backend-zdsq.onrender.com/contact', {
        name,
        email,
        message
      });

      console.log('Form submitted successfully:', response.data);
      toast.success('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') setName(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'message') setMessage(value);
  };

  return (
    <MotionWrapper>
      <div className='flex flex-col items-center h-screen'>
        <div className='text-white font-bold text-6xl'>Contact me</div>
        <form onSubmit={handleSubmit} className='scale-[1.5] mt-28'>
          <div className='flex flex-col items-center mt-10'>
            <input
              type="text"
              placeholder='Your Name'
              className='p-2 mb-4 w-80 rounded-md bg-gray-800 text-white'
              name="name"
              value={name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              placeholder='Your Email'
              className='p-2 mb-4 w-80 rounded-md bg-gray-800 text-white'
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
            <textarea
              placeholder='Your Message'
              className='p-2 mb-4 w-80 h-40 rounded-md bg-gray-800 text-white'
              name="message"
              value={message}
              onChange={handleInputChange}
              required
            ></textarea>
            <button
              type="submit"
              className='bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300'
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </MotionWrapper>
  );
};

export default Contact;
