import React, { useState } from 'react';
import './sidebar.scss';
import SidebarElement from '../sidebar_element/sidebar_element';

const Sidebar = (props) => {
  const [value, setValue] = useState('');

  const addNewDot = (e) => {
    e.preventDefault();
    props.addNewDot(value); //отдаем в апп имя точки из инпута
    setValue(''); //зануляем инпут
  };

  const resetAllDots = () => {
    props.resetAllDots();
  };

  return (
    <>
      <aside className='sidebar'>
        <div className='sidebar_container'>
          <div>
            <form>
              <input
                className='sidebar_input'
                type='text'
                placeholder='Введите имя точки'
                value={value} //контроллируемый элемент ввода
                onChange={(e) => {
                  setValue(e.target.value);
                }}></input>
              <button className='button dot-add' onClick={addNewDot}>
                Добавить точку в центр карты
              </button>
            </form>
          </div>
          <section className='sidebar_list_container'>
            {props.Dots?.map((Dot) => (
              <SidebarElement
                Dot={Dot}
                id={Dot.id}
                key={Dot.id}
                deleteDot={props.deleteDot}
                onDragStart={() => props.onDragStart(Dot.id)}
                onDragOver={() => props.onDragOver(Dot.id)}
                onDragEnd={() => props.onDragEnd()}
              />
            ))}
          </section>
          <button className='button dots-reset' onClick={resetAllDots}>
            Сбросить все точки
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
