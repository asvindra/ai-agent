import React from 'react';

const Header = () => {
  return (
    <div className='flex flex-col  w-full max-w-3xl mx-auto px-4'>
      <header className='sticky top-0 shrink-0 z-20 bg-white'>
        <div className='flex flex-col h-full w-full gap-1 pt-4 pb-2'>
          <h1 className='font-urbanist text-[1.65rem] font-semibold'>AI Agent</h1>
        </div>
      </header>
    </div>
  );
};

export default Header;