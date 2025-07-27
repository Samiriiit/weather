// Importing React (needed even if we don't directly use it in the test file)
import React from 'react';

// Importing necessary functions from React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';

// Importing the component we want to test
import ToggleOfflineMode from '../components/ToggleModeOffline';

// Grouping all tests for the ToggleOfflineMode component
describe('ToggleOfflineMode component', () => {

  // Test case 1:
  // When the component is in offline mode (isOffline is true),
  // it should show a button that says "Go Online"
  it('renders "Go Online" when isOffline is true', () => {
    render(<ToggleOfflineMode isOffline={true} toggleOffline={() => {}} />);
    
    // Look for the button and check if it contains the correct text
    expect(screen.getByRole('button')).toHaveTextContent('Go Online');
  });

  // Test case 2:
  // When the component is in online mode (isOffline is false),
  // it should show a button that says "Go Offline"
  it('renders "Go Offline" when isOffline is false', () => {
    render(<ToggleOfflineMode isOffline={false} toggleOffline={() => {}} />);
    
    // Look for the button and check if it contains the correct text
    expect(screen.getByRole('button')).toHaveTextContent('Go Offline');
  });

  // Test case 3:
  // When the button is clicked, the toggleOffline function should be called
  it('calls toggleOffline function when button is clicked', () => {
    // Create a mock function to simulate the toggle behavior
    const toggleMock = jest.fn();

    // Render the component and pass the mock function as the toggleOffline prop
    render(<ToggleOfflineMode isOffline={false} toggleOffline={toggleMock} />);

    // Find the button on the screen
    const button = screen.getByRole('button');

    // Simulate a click event on the button
    fireEvent.click(button);

    // Verify that the mock function was called exactly once
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
