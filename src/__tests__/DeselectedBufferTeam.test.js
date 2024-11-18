import { render, screen, fireEvent} from '@testing-library/react';
import DeselectedBufferTeam from '../ui/pages/DeselectedBufferTeam';


// DeselectedBufferTeam
const mockGetTeamHandler = jest.fn();
const mockModalHandler = jest.fn();
const mockHandleSearch = jest.fn();
const mockHandleCheckboxChange = jest.fn();
const mockSelectedTeamHandler = jest.fn();
const mockAddOneTeamHandler = jest.fn();


const mockDeSelectedTeamsArr = [
  { id: 1, teamName: 'Team A', teamImage: 'image-a-url' },
  { id: 2, teamName: 'Team B', teamImage: 'image-b-url' },
];

describe('DeselectedBufferTeam', () => {
  test('DeselectedBufferTeam UI Testing', () => {
    render(<DeselectedBufferTeam
      getTeamHandler={mockGetTeamHandler}
      modalHandler={mockModalHandler}
      searchTerm=""
      handleSearch={mockHandleSearch}
      handleCheckboxChange={mockHandleCheckboxChange}
      selectedTeams={[]}
      selectedTeamHandler={mockSelectedTeamHandler}
      addOneTeamHandler={mockAddOneTeamHandler}
      deSelectedTeamsArr={mockDeSelectedTeamsArr}
      getTeamFlag={false}
    />)

    const searchText = screen.getByLabelText('Search here...')
    expect(searchText).toBeInTheDocument()
    expect(screen.getByText('Create Team')).toBeInTheDocument();
    expect(screen.getByText('Master Buffer Team')).toBeInTheDocument();
    expect(mockGetTeamHandler).toHaveBeenCalled();
  });
  test('calls handlers when buttons are clicked and checkbox is checked', () => {
    render(
      <DeselectedBufferTeam
        getTeamHandler={mockGetTeamHandler}
        modalHandler={mockModalHandler}
        searchTerm=""
        handleSearch={mockHandleSearch}
        handleCheckboxChange={mockHandleCheckboxChange}
        selectedTeams={[1]}
        selectedTeamHandler={mockSelectedTeamHandler}
        addOneTeamHandler={mockAddOneTeamHandler}
        deSelectedTeamsArr={mockDeSelectedTeamsArr}
        getTeamFlag={false}
      />
    );

   
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(mockHandleCheckboxChange).toHaveBeenCalledWith(1);

    const createTeamButton = screen.getByText('Create Team');
    fireEvent.click(createTeamButton);
    expect(mockModalHandler).toHaveBeenCalled();
  
    const addButton = screen.getAllByText('Add')[0]; 
    expect(addButton).toBeInTheDocument(); 
    if (addButton) fireEvent.click(addButton); 
    expect(mockAddOneTeamHandler).toHaveBeenCalledWith(2);  
  });
});
