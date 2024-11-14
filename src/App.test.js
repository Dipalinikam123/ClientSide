import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For jest-dom matchers
import BufferTeam from './ui/pages/BufferTeam';
import userEvent from '@testing-library/user-event'
import DeselectedBufferTeam from './ui/pages/DeselectedBufferTeam';

// "BufferTeam"
const mockGetTeam = jest.fn();
const mockModalHandler = jest.fn();
const mockHandleSearch = jest.fn();
const mockEditTeam = jest.fn();
const mockHandleRemove = jest.fn();

// DeselectedBufferTeam
const mockGetTeamHandler = jest.fn();
const mockModalHandler2 = jest.fn();
const mockHandleSearch2 = jest.fn();
const mockHandleCheckboxChange = jest.fn();
const mockSelectedTeamHandler = jest.fn();
const mockAddOneTeamHandler = jest.fn();

const mockMasterBufferTeamsArr = [
  {
    id: 1,
    teamName: 'Team A',
    teamImage: 'image-a-url',
  },
  {
    id: 2,
    teamName: 'Team B',
    teamImage: 'image-b-url',
  },
];

const mockDeSelectedTeamsArr = [
  { id: 1, teamName: 'Team A', teamImage: 'image-a-url' },
  { id: 2, teamName: 'Team B', teamImage: 'image-b-url' },
];
describe.skip('BufferTeam', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component with the correct UI elements', async () => {

    render(
      <BufferTeam
        getTeam={mockGetTeam}
        editTeam={mockEditTeam}
        handleRemove={mockHandleRemove}
        searchTerm=""
        handleSearch={mockHandleSearch}
        modalHandler={mockModalHandler}
        masterBufferTeamsArr={mockMasterBufferTeamsArr}
      />
    );

    expect(screen.getByText('Create Team')).toBeInTheDocument();
    expect(screen.getByLabelText('Search here...')).toBeInTheDocument();
    expect(screen.getByText('Image')).toBeInTheDocument();
    expect(screen.getByText('Team Name')).toBeInTheDocument();

    const testAction = screen.getAllByText('Action');
    expect(testAction[0]).toBeInTheDocument();
    expect(testAction[1]).toBeInTheDocument();

    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();

    const images = screen.getAllByAltText('Team');
    expect(images.length).toBe(2);
    expect(images[0].src).toContain('image-a-url');
    expect(images[1].src).toContain('image-b-url');
  });

  test('calls handleSearch when the search input value changes', async () => {
    render(
      <BufferTeam
        getTeam={mockGetTeam}
        editTeam={mockEditTeam}
        handleRemove={mockHandleRemove}
        searchTerm="Test"
        handleSearch={mockHandleSearch}
        modalHandler={mockModalHandler}
        masterBufferTeamsArr={mockMasterBufferTeamsArr}
      />
    );

    const searchInput = screen.getByLabelText('Search here...');

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'New Search Term' } });
    });

    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
    expect(mockHandleSearch).toHaveBeenCalledWith(expect.anything());
  });

  test('calls handleRemove with the correct team ID when the "Remove" button is clicked', async () => {
    render(
      <BufferTeam
        getTeam={mockGetTeam}
        editTeam={mockEditTeam}
        handleRemove={mockHandleRemove}
        searchTerm=""
        handleSearch={mockHandleSearch}
        modalHandler={mockModalHandler}
        masterBufferTeamsArr={mockMasterBufferTeamsArr}
      />
    );

    const removeButtons = await screen.findAllByText('Remove');
    fireEvent.click(removeButtons[0]);
    expect(mockHandleRemove).toHaveBeenCalledWith(mockMasterBufferTeamsArr[0].id);
  });
});

describe.skip('DeselectedBufferTeam', () => {
  test('DeselectedBufferTeam UI Testing', () => {
    render(<DeselectedBufferTeam
      getTeamHandler={mockGetTeamHandler}
      modalHandler={mockModalHandler2}
      searchTerm=""
      handleSearch={mockHandleSearch2}
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
