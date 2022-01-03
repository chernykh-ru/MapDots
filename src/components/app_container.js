import React, { useState, useEffect } from 'react';
import logo from '../icons/dot.png';
import heart from '../icons/heartbeat.png';
import Map from './map/map';
import Sidebar from './sidebar/sidebar';
import Preloader from './map/preloader';

class Dot {
  constructor(coordinates, name, id) {
    this.coordinates = coordinates;
    this.name = name;
    this.id = id;
  }
}

const AppContainer = () => {
  const [state, setState] = useState({
    Dots: [],
  });
  const [centerCoords, setCenterCoords] = useState(null); //center coords from ref map
  const [idDotCoords, setIdDotCoords] = useState(null); //draggable Dots id from dragStart
  const [DotCoords, setDotCoords] = useState(centerCoords); //draggable Dots coords from dragEnd
  const [id, setId] = useState(1); //new Dot id
  let [draggedItem, setDraggedItem] = useState(null); //state draggable item in list
  let changeDotIndex = null;

  useEffect(() => {
    updateDotCoords(DotCoords, idDotCoords);
  }, [DotCoords]);

  const computeIndex = (idDotCoords) => {
    let newDotsArray = [...state.Dots];
    for (let i = 0; i < newDotsArray.length; i++) {
      if (newDotsArray[i].id === idDotCoords) {
        changeDotIndex = i;
        console.log('changeDotIndex', changeDotIndex);
        return changeDotIndex;
      }
    }
  };

  const addNewDot = (DotName) => {
    let coords = centerCoords;
    let newDot = new Dot(coords, DotName, id); //создаем инстанс класса Поинт
    setState({ Dots: state.Dots.concat(newDot) }); //сетаем в стейт конкатенируя Поинты
    setId((id) => id + 1);
  };

  const resetAllDots = () => {
    if (window.confirm('Вы действительно хотите сбросить все точки?')) setState({ Dots: [] }); //зануляем массив точек с предупреждением
  };

  const deleteDot = (idDotCoords) => {
    let newDotsArray = [...state.Dots];
    computeIndex(idDotCoords); //return changeDotIndex

    newDotsArray.splice(changeDotIndex, 1); //мутируем массив стартуя с индекса по найденому id и удаляя этот один элемент
    setState({ Dots: newDotsArray });
  };

  const updateDotCoords = (DotCoords, idDotCoords) => {
    if (DotCoords && idDotCoords) {
      let newDotsArray = [...state.Dots];
      computeIndex(idDotCoords); //return changeDotIndex

      if (newDotsArray) newDotsArray[changeDotIndex].coordinates = DotCoords;
      setState({ Dots: newDotsArray });
    }
  };

  const onDragStart = (idDotCoords) => {
    computeIndex(idDotCoords); //return changeDotIndex
    const draggedItem = state.Dots[changeDotIndex];
    setDraggedItem(draggedItem); //сетаем перетаскиваемый элемент
  };

  const onDragOver = (idDotCoords) => {
    computeIndex(idDotCoords); //return changeDotIndex

    const draggedOverItem = state.Dots[changeDotIndex];
    if (draggedOverItem === draggedItem) return;

    let mixedArray = state.Dots.filter((Dot) => Dot !== draggedItem);
    mixedArray.splice(changeDotIndex, 0, draggedItem); //вставляем в нужное место масива(по id) перетаскиваемый элемент
    setState({ Dots: mixedArray });
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
