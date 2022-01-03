import React from 'react';
import trash from '../../icons/garbage-bag.png';
import marker from '../../icons/dot.png';
import './sidebar_element.scss';

const SidebarElement = ({ Dot, id, ...props }) => {
  return (
    <div
      className='sidebar_element_container'
      draggable
      onDragStart={() => props.onDragStart(id)}
      onDragOver={() => props.onDragOver(id)}
      onDragEnd={() => props.onDragEnd()}>
      <div className='sidebar_element_marker'>
        <img className='sidebar_element_img' src={marker} alt='marker element' />
      </div>
      <div className='sidebar_element_block'>
        <div className='sidebar_element'>
          <p>Точка '{Dot && Dot.name === '' ? 'Dot' : String(Dot.name).substring(0, 10)}'</p>
          <button className='sidebar_element_button' onClick={() => props.deleteDot(id)}>
            <img className='sidebar_element_img' src={trash} alt='delete element' />
          </button>
        </div>
        <p>
          {Dot.coordinates
            ? `${Dot.coordinates[0].toPrecision(5)} : ${Dot.coordinates[1].toPrecision(5)}`
            : 'Координаты определяются...'}
        </p>
      </div>
    </div>
  );
};

export default SidebarElement;
