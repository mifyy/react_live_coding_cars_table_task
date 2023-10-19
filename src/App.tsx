import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

export const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [chooseColor = colorsFromServer, setChooseColor] = useState('');
  let displayedCars = carsFromServer
    .filter(car => car.brand.toLowerCase()
      .trim().includes(searchValue.toLowerCase()));

  if (chooseColor) {
    displayedCars = carsFromServer
      .filter(car => car.brand.toLowerCase()
        .trim().includes(searchValue.toLowerCase())
        && car.colorId === +chooseColor);
  }

  function handleOnClick(value: string) {
    setSearchValue(value);
  }

  function handleColor(value: string) {
    setChooseColor(value);
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        onChange={(event) => {
          handleOnClick(event.target.value);
        }}
      />

      <select
        onChange={(event) => {
          handleColor(event.target.value);
        }}
      >
        {colorsFromServer.map(color => (
          <option key={color.id} value={color.id}>
            {color.name}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Rent price</th>
          </tr>
        </thead>
        <tbody>
          {
            displayedCars.map(car => {
              const carColor = colorsFromServer
                .find(color => color.id === car.colorId)?.name;

              return (
                <tr>
                  <td>{car.id}</td>
                  <td>{car.brand}</td>
                  <td style={{ textTransform: 'capitalize', color: `${carColor}` }}>{carColor}</td>
                  <td>{car.rentPrice}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};
