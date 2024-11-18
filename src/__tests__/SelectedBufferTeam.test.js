import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SelectedBufferTeam from '../ui/pages/SelectedBufferTeam'; 
import { act } from 'react-dom/test-utils';

describe('SelectedBufferTeam Component', () => {
  const mockRestoreHandler = jest.fn();
  const mockSetDeSearchTerm = jest.fn();

  const teams = [
    { id: 1, teamName: 'Team 1', teamImage: 'team1.jpg' },
    { id: 2, teamName: 'Team 2', teamImage: 'team2.jpg' },
    { id: 3, teamName: 'Team 3', teamImage: 'team3.jpg' },
  ];

  test('renders the teams list', () => {
    render(<SelectedBufferTeam selectedTeamsArr={teams} restoreHandler={mockRestoreHandler} deSearchTerm="" setDeSearchTerm={mockSetDeSearchTerm} />);

    teams.forEach(team => {
      expect(screen.getByText(team.teamName)).toBeInTheDocument();
    });
  });

  test('calls restoreHandler when "Remove" button is clicked', async () => {
    render(<SelectedBufferTeam selectedTeamsArr={teams} restoreHandler={mockRestoreHandler} deSearchTerm="" setDeSearchTerm={mockSetDeSearchTerm} />);

    const removeButton = screen.getAllByText(/Remove/i)[0];
    fireEvent.click(removeButton);

    expect(mockRestoreHandler).toHaveBeenCalledWith(teams[0].id);
  });

  test('filters teams based on search term', async () => {
    render(<SelectedBufferTeam selectedTeamsArr={teams} restoreHandler={mockRestoreHandler} deSearchTerm="Team 1" setDeSearchTerm={mockSetDeSearchTerm} />);

    const searchInput = screen.getByLabelText('Search here...');
    fireEvent.change(searchInput, { target: { value: 'Team 1' } });

    expect(screen.getByText('Team 1')).toBeInTheDocument();
  });

  // test('handles drag-and-drop correctly', async () => {
  //   render(<SelectedBufferTeam selectedTeamsArr={teams} restoreHandler={mockRestoreHandler} deSearchTerm="" setDeSearchTerm={mockSetDeSearchTerm} />);

  //   const draggedTeam = screen.getByText('Team 1');
  //   const targetTeam = screen.getByText('Team 2');

  //   fireEvent.dragStart(draggedTeam);
  //   fireEvent.dragOver(targetTeam);
  //   fireEvent.drop(targetTeam);

  //   await waitFor(() => {
  //     const teamOrder = screen.getAllByRole('row').map(row => row.textContent);
  //     expect(teamOrder).toEqual(['Team 2', 'Team 1', 'Team 3']);
  //   });
  // });
});
