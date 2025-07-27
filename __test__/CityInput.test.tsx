import React from 'react';
//render: Loads (renders) your React component into a fake test browser.
//screen: Lets you find and query HTML elements (like buttons, inputs) by role, text, label, etc.
//fireEvent: Simulates user actions like clicks, typing, and selections.
import { render, screen, fireEvent } from '@testing-library/react';
import CityInput from '../components/CityInput'; 

describe('CityInput component', () => {
  //describe() is a Jest function that groups related tests.
  const cities = ['Delhi', 'Mumbai', 'Chennai'];
  const selectedCity = 'Delhi';
  //jest.fn() creates a mock function (also called a spy).
  const onCityChange = jest.fn();

  beforeEach(() => {
    //jest.clearAllMocks() resets the mock function onCityChange to make sure each test starts fresh
    jest.clearAllMocks();
  });

  //test case 1
  it('renders all city options', () => {
    render(
      <CityInput
        cities={cities}
        selectedCity={selectedCity}
        onCityChange={onCityChange}
      />
    );

    // Check all cities are rendered as options
    cities.forEach(city => {
      //.toBeInTheDocument() checks that the option is actually rendered on the screen.
      expect(screen.getByRole('option', { name: city })).toBeInTheDocument();
    });
  });

  //TC2
  it('sets the selected city correctly', () => {
    render(
      <CityInput
        cities={cities}
        selectedCity={selectedCity}
        onCityChange={onCityChange}
      />
    );
//ARIA stands for: Accessible Rich Internet Applications, acc to this combobox is default type of the select
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue(selectedCity);
  });

  //TC3
  it('calls onCityChange when a different city is selected', () => {
    render(
      <CityInput
        cities={cities}
        selectedCity={selectedCity}
        onCityChange={onCityChange}
      />
    );

    const select = screen.getByRole('combobox');

    // Change selection to 'Mumbai'
    fireEvent.change(select, { target: { value: 'Mumbai' } });

    // onCityChange should be called with 'Mumbai'
    expect(onCityChange).toHaveBeenCalledTimes(1); //function to be called by only one times
    expect(onCityChange).toHaveBeenCalledWith('Mumbai');
  });
});
