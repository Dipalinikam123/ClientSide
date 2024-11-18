import { render, screen, fireEvent } from '@testing-library/react';
import AlertModel from '../ui/model/AlertModel';
describe('AlertModel Component', () => {
  const mockAlertToggle = jest.fn();
  const mockHandleRemoveTeam = jest.fn();

  test('renders the alert dialog correctly', () => {
    render(
      <AlertModel 
        alertModal={true} 
        alertToggle={mockAlertToggle} 
        handleRemoveTeam={mockHandleRemoveTeam} 
      />
    );

    expect(screen.getByText('Remove Team')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to remove this team?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Remove/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  test('calls handleRemoveTeam when Remove button is clicked', () => {
    render(
      <AlertModel 
        alertModal={true} 
        alertToggle={mockAlertToggle} 
        handleRemoveTeam={mockHandleRemoveTeam} 
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Remove/i }));
    expect(mockHandleRemoveTeam).toHaveBeenCalled();
  });

  test('calls alertToggle when Cancel button is clicked', () => {
    render(
      <AlertModel 
        alertModal={true} 
        alertToggle={mockAlertToggle} 
        handleRemoveTeam={mockHandleRemoveTeam} 
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockAlertToggle).toHaveBeenCalled();
  });
});
