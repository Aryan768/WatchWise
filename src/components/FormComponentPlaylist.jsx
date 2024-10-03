import React from 'react';

const FormComponentPlaylist = ({ pInput, handleSubmitP, setpInput }) => {
  return (
    <div className='m-24'>
      <form onSubmit={handleSubmitP}>
        <input
          className='border-red-400'
          value={pInput}
          onChange={(e) => setpInput(e.target.value)}
          type="text"
          id='linkUser'
          placeholder='Enter your link here...'
        />
        <button className='bg-orange-300 ml-2 px-4 py-2' type="submit">Click Me</button>
      </form>
    </div>
  );
};

export default FormComponentPlaylist;
