// // import React, { useState,useEffect } from 'react';
// // import '../Style.css';
// // import AOS from 'aos';
// // import 'aos/dist/aos.css';

// // const BiorhythmForm = ({ onSubmit }) => {
// //   const [birthDate, setBirthDate] = useState('');
  
// //   useEffect(()=> {
// //     AOS.init({duration: 1000})
// //   })
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onSubmit(birthDate);
// //   };
  
// //   return (
// //     <div className='w-full h-full bg-gradient-to-b from-black to-gray-800 p-4 text-white'>
// //     <form onSubmit={handleSubmit}  className='flex flex-col w-full md:w-1/2' >
// //       <label htmlFor="birthDate" data-aos="slide-right" >Enter Your Birth Date: </label>
// //       <input
// //       data-aos="slide-up" data-aos-duration="700"
// //         type="date"
// //         id="birthDate"
// //         value={birthDate}
// //         onChange={(e) => setBirthDate(e.target.value)}
// //         required
// //         className='p-2 m-2 bg-transparent border-2 rounded-md text-white focus:outline-none'
// //       />
// //     <button data-aos="zoom-in" data-aos-duration="1000" type="submit" className='text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300'>Let's Calculate </button>
// //     </form>
// //     </div>
// //   );
// // };

// // export default BiorhythmForm;


// import React, { useState, useEffect } from 'react';
// import '../Style.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import flatpickr from 'flatpickr'; 
// import 'flatpickr/dist/flatpickr.min.css'; 
// import BackgroundVideo from './Background'; 

// const BiorhythmForm = ({ onSubmit }) => {
//   const [birthDate, setBirthDate] = useState('');

//   useEffect(() => {
//     AOS.init({ duration: 1000 });

//     flatpickr("#datepicker", {
//       dateFormat: 'Y-m-d', 
//       onClose: (selectedDates, dateStr, instance) => {
//         setBirthDate(dateStr);
//       }
//     });
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(birthDate);
//   };

//   return (
//     <div className='relative'>
//       <BackgroundVideo  className='video'/>
//       <div className='absolute inset-0 bg-black bg-opacity-50'>
//         <div className='w-full h-full flex items-center justify-center'>
//           <div className='w-full md:w-2/3'>
//             <form onSubmit={handleSubmit} className='flex flex-col w-full'>
//               <label htmlFor="datepicker" data-aos="slide-right" className='flex-shrink-0 text-white'>Enter Your Birth Date:</label>
//               <input
//                 data-aos="slide-up" data-aos-duration="700"
//                 value={birthDate}
//                 onChange={(e) => setBirthDate(e.target.value)}
//                 required
//                 id="datepicker"
//                 type="text"
//                 placeholder="Select a date"
//                 className='p-2 m-2 bg-transparent border-2 rounded-md text-white focus:outline-none flex-grow'
//               />
//               <button
//                 data-aos="zoom-in"
//                 data-aos-duration="1000"
//                 type="submit"
//                 className='text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300 flex-shrink-0'>
//                 Let's Calculate
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BiorhythmForm;

import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import BackgroundVideo from './Background';
import '../Style.css'

const BiorhythmForm = ({ onSubmit }) => {
  const [birthDate, setBirthDate] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });

    flatpickr("#datepicker", {
      dateFormat: 'Y-m-d',
      onClose: (selectedDates, dateStr, instance) => {
        setBirthDate(dateStr);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(birthDate);
  };

  return (
    <div className='relative'>
      <BackgroundVideo className='video' />
      <h1 className='main' data-aos='fade-up' data-aos-duration ='1000'> Hey welcome to the page  </h1>
          <form onSubmit={handleSubmit} className='flex flex-col w-full'>
            <label htmlFor="datepicker" data-aos="fade-right" data-aos-duration="1000" className='text-white'>Enter Your Birth Date:</label>
            <input
              data-aos="fade-left" 
              data-aos-duration="1000"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              id="datepicker"
              type="text"
              placeholder="Select a date"
              className='p-2 m-2 bg-transparent border-2 rounded-md text-white focus:outline-none'
            />
            <button
              data-aos="zoom-in"
              data-aos-duration="1000"
              type="submit"
              className='text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto rounded-md hover:scale-110 duration-300'>
              Let's Calculate
            </button>
          </form>

        </div>
  );
};

export default BiorhythmForm;