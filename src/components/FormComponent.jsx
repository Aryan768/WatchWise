import React from 'react';

const FormComponent = ({ input, handleSubmit, setInput }) => {
  return (
    <div className='m-24'>
      <form onSubmit={handleSubmit}>
        <input
          className='border-red-400'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          id='linkUser'
          placeholder='Enter your link here...'
        />
        <button className='bg-orange-300 ml-2 px-4 py-2' type="submit">Click Me</button>
      </form>
    </div>
  );
};

export default FormComponent;
