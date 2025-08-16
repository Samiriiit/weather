// CityInput.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CityInput, { CityInputProps } from './index';

describe('CityInput component', () => {
  const onSearchMock = jest.fn();

  beforeEach(() => {
    onSearchMock.mockClear();
  });

  it('renders with initial city', () => {
    render(<CityInput onSearch={onSearchMock} initialCity="London" />);
    const input = screen.getByLabelText(/city search input/i) as HTMLInputElement;
    expect(input.value).toBe('London');
  });

  it('updates input value when typing', () => {
    render(<CityInput onSearch={onSearchMock} initialCity="" />);
    const input = screen.getByLabelText(/city search input/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Paris' } });
    expect(input.value).toBe('Paris');
  });

  it('calls onSearch when Enter is pressed', () => {
    render(<CityInput onSearch={onSearchMock} initialCity="" />);
    const input = screen.getByLabelText(/city search input/i);

    fireEvent.change(input, { target: { value: 'Tokyo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith('Tokyo');
  });

  it('calls onSearch when search button is clicked', () => {
    render(<CityInput onSearch={onSearchMock} initialCity="" />);
    const input = screen.getByLabelText(/city search input/i);
    const button = screen.getByRole('button', { name: /search city/i });

    fireEvent.change(input, { target: { value: 'Berlin' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith('Berlin');
  });

  it('disables input and button when disabled prop is true', () => {
    render(<CityInput onSearch={onSearchMock} initialCity="London" disabled />);
    const input = screen.getByLabelText(/city search input/i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search city/i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('does not call onSearch if input is empty', () => {
    render(<CityInput onSearch={onSearchMock} initialCity="" />);
    const button = screen.getByRole('button', { name: /search city/i });
    fireEvent.click(button);
    expect(onSearchMock).not.toHaveBeenCalled();
  });
});
