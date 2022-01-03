import React from 'react';
import './preloader.scss';

const Preloader = () => {
  return (
    <div id='cssload-global'>
      <div id='cssload-top' className='cssload-mask'>
        <div className='cssload-plane'></div>
      </div>
      <div id='cssload-middle' className='cssload-mask'>
        <div className='cssload-plane'></div>
      </div>

      <div id='cssload-bottom' className='cssload-mask'>
        <div className='cssload-plane'></div>
      </div>
    </div>
  );
};

export default Preloader;
