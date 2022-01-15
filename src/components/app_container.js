import React, { useState, useEffect } from 'react';
import logo from '../icons/dot.png';
import heart from '../icons/heartbeat.png';
import Map from './map/map';
import Sidebar from './sidebar/sidebar';
import Preloader from './map/preloader';

const AppContainer = () => {
  const [state, setState] = useState({
    Dots: [],
  });
  const [centerCoords, setCenterCoords] = useState(null); //center coords from ref map
  const [idDotCoords, setIdDotCoords] = useState(null); //draggable Dots id from dragStart
  const [DotCoords, setDotCoords] = useState(centerCoords); //draggable Dots coords from dragEnd
  const [id, setId] = useState(1); //new Dot id
  const [draggedItem, setDraggedItem] = useState(null); //state draggable item in list

  useEffect(() => {
    updateDotCoords(DotCoords, idDotCoords);
  }, [DotCoords]);

  const addNewDot = (dotName) => {
    setState(({ Dots }) => {
      const newDot = {
        coordinates: centerCoords,
        id: id,
        name: dotName,
      };
      return { Dots: [...Dots, newDot] };
    }); //добавляем новую точку в массив не мутируя его(в конец списка)
    setId((id) => id + 1);
  };

  const resetAllDots = () => {
    if (window.confirm('Вы действительно хотите сбросить все точки?')) setState({ Dots: [] }); //зануляем массив точек с предупреждением
  };

  const deleteDot = (idDotCoords) => {
    setState(({ Dots }) => {
      const idx = Dots.findIndex((el) => el.id === idDotCoords); //получаем индекс нужного элемента по id
      const newArray = [...Dots.slice(0, idx), ...Dots.slice(idx + 1)]; //получаем копии элементов от начала и до индекса удаления не включая его, //получаем копии элементов после индекса удаления
      return { Dots: newArray }; //иммутабельно меняем стейт(сетаем в стейт копии, не мутируя исходный массив)
    });
  };

  const updateDotCoords = (DotCoords, idDotCoords) => {
    if (DotCoords && idDotCoords) {
      setState(({ Dots }) => {
        const idx = Dots.findIndex((el) => el.id === idDotCoords); //получаем индекс нужного элемента по id
        const draggableDot = { ...Dots[idx], coordinates: DotCoords }; //обновляем у нужного объекта нужное поле координат на новое значение координат
        const newArray = [...Dots.slice(0, idx), draggableDot, ...Dots.slice(idx + 1)]; //создаем копию с измененным элементом массива
        return { Dots: newArray }; //иммутабельно меняем стейт
      });
    }
  };

  const onDragStart = (idDotCoords) => {
    const idx = state.Dots.findIndex((el) => el.id === idDotCoords); //получаем индекс нужного элемента по id
    const draggedItem = state.Dots[idx];
    setDraggedItem(draggedItem); //сетаем перетаскиваемый элемент
  };

  const onDragOver = (idDotCoords) => {
    const idx = state.Dots.findIndex((el) => el.id === idDotCoords); //получаем индекс нужного элемента по id
    const draggedOverItem = state.Dots[idx]; //dragOver: курсор мыши наведен на данный элемент при перетаскивании элемента dragStart
    if (draggedOverItem === draggedItem) return; //выходим если элемент остался на прежнем месте в списке

    setState(({ Dots }) => {
      const mixedArray = Dots.filter((Dot) => Dot !== draggedItem); //возвращаем новый массив без перетаскиваемого элемента
      const newArray = [...mixedArray.slice(0, idx), draggedItem, ...mixedArray.slice(idx)]; //создаем копию с перетащенным элементом массива на нужном месте в массиве
      return { Dots: newArray }; //иммутабельно меняем стейт
    });
  };

  const onDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className='container'>
      <header className='app-header'>
        <div className='logo'>
          <img className='logo-image' src={logo} alt='logo MapDots' />
          <p className='logo-text'>MapDots</p>
        </div>
      </header>
      <main>
        <Sidebar
          Dots={state.Dots}
          addNewDot={addNewDot}
          resetAllDots={resetAllDots}
          deleteDot={deleteDot}
          onDragStart={(id) => onDragStart(id)}
          onDragOver={(id) => onDragOver(id)}
          onDragEnd={() => onDragEnd()}
        />
        <section className='map'>
          {!centerCoords ? (
            <div className='map-loading'>
              <Preloader />
            </div>
          ) : (
            ''
          )}
          <Map
            Dots={state.Dots}
            setDotCoords={setDotCoords}
            setCenterCoords={setCenterCoords}
            setIndexDotCoords={setIdDotCoords}
          />
        </section>
      </main>
      <footer className='app-footer'>
        <p>
          Created by chernykh.ru in the first days of 2022 ¯\_(ツ)_/¯ by means of github &
          stackoverflow
        </p>
        <img className='logo-with-love' src={heart} alt='heart' />
      </footer>
    </div>
  );
};

export default AppContainer;
