import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';

const mapState = { center: [56.3166, 44.0091], zoom: 12 };

function YandexMap({ Dots, setCenterCoords, setDotCoords, setIndexDotCoords }) {
  const [mapRef, setMapRef] = useState(null);
  const [placemarkRef, setPlacemarkRef] = useState(null);

  useEffect(() => {
    const handlerCenterCoords = () => {
      const data = mapRef && mapRef.getCenter();
      setCenterCoords(data);
    };
    handlerCenterCoords();
  }, [mapRef]);

  useEffect(() => {
    if (!mapRef || !placemarkRef) {
      return;
    }
    mapRef.events.add('click', () => placemarkRef.balloon.close());
  }, [mapRef, placemarkRef]);

  return (
    <div className='map-container'>
      <YMaps>
        <Map
          state={mapState}
          instanceRef={(mapRef) => mapRef && setMapRef(mapRef)}
          width={'100%'}
          height={'100%'}>
          <Polyline
            geometry={Dots.map((p) => [p.coordinates[0], p.coordinates[1]])}
            options={{ strokeOpacity: 0.9, strokeColor: '#808080', strokeWidth: '4' }}
          />
          {Dots.map((Dot) => (
            <Placemark
              key={Dot.id}
              modules={['geoObject.addon.balloon']}
              geometry={Dot.coordinates}
              instanceRef={setPlacemarkRef}
              options={{
                preset: 'islands#blackStretchyIcon',
                draggable: true,
                iconCaptionMaxWidth: '12',
              }}
              onDragStart={() => setIndexDotCoords(Dot.id)} //старт перетаскивания, сетаем id
              onDragEnd={(e) => setDotCoords(e.get('target').geometry.getCoordinates())} //конец перетаскивания, сетаем координаты
              properties={{
                iconContent: `${Dot.name ? Dot.name : 'Dot'}`,
                balloonContent: `<p>Точка '${Dot.name ? Dot.name : 'Dot'}'</p>
                <p>Координаты: ${Dot.coordinates[0].toPrecision(
                  5,
                )} : ${Dot.coordinates[1].toPrecision(5)}</p>`,
              }}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
}

export default YandexMap;
