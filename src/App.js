import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import BufferTeam from './ui/pages/BufferTeam';
import BufferSelectedTeam from './ui/pages/BufferConfigureTeam';
import AddTeam from './ui/model/AddTeam';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './ui/model/SideBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './ui/pages/Home';
import BufferConfigureTeam from './ui/pages/BufferConfigureTeam';

function App() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [team, setTeam] = useState([]);
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [createTeams, setCreateTeams] = useState({
    teamName: '',
    teamImage: null
  });
  const [buttonFlag, setButtonFlag] = useState(false)
  const [index, setIndex] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedTeamsArr, setSelectedTeamsArr] = useState([]);


  console.log('---searchTerm', searchTerm)
  useEffect(() => {
    const searchResults = filteredTeam.filter((e) =>
      e.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (searchTerm === '') {
      setTeam(filteredTeam)
    } else {
      setTeam(searchResults);
    }
  }, [searchTerm])

  async function getTeamHandler() {
    try {
      const response = await axios.get('http://localhost:1337/getTeam');
      console.log('Response:', response.data);
      setTeam(response.data.team);
      setFilteredTeam(response.data.team);

    } catch (error) {
      console.error('Error fetching team:', error);
    }
  }


  const handleNameChange = (e) => {
    setCreateTeams({ ...createTeams, teamName: e.target.value });
  };

  const handleImageChange = (e) => {
    setCreateTeams({ ...createTeams, teamImage: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:1337/addTeam', createTeams, {
        headers: {
          'Content-Type': 'multipart/form-data', // Use multipart/form-data for file uploads
        },
      });
      console.log('Response:', response.data);
      toggle();
      setCreateTeams({
        teamName: '',
        teamImage: null
      });

    } catch (error) {
      alert(error?.response?.data?.message)
      console.error('Error uploading team:', error);
    }
  };

  const editTeamHandler = (data, id) => {
    console.log('----data', data)
    setIndex(id)
    setButtonFlag(true)
    toggle()
    setCreateTeams(data)
  }
  const modalHandler = () => {
    setCreateTeams({
      teamName: '',
      teamImage: null
    })
    toggle()
    setButtonFlag(false)
  }
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:1337/updateTeam/${index}`, createTeams, {
        headers: {
          'Content-Type': 'multipart/form-data', // Use multipart/form-data for file uploads
        },
      });
      console.log('Response update:', response.data);
      toggle();
      setCreateTeams({
        teamName: '',
        teamImage: null
      });
      setIndex(null)
    } catch (error) {
      console.error('Error updating team:', error);
    }
  }
  const handleRemove = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to remove this team?');

    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:1337/removeTeam/${id}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Response remove:', response.data);
        alert('Team removed successfully.');
        getTeamHandler();
      } catch (error) {
        console.error('Error removing team:', error);
        alert('Failed to remove team. Please try again.');
      }
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  };

  const handleCheckboxChange = (teamId) => {
    if (selectedTeams.includes(teamId)) {
      setSelectedTeams(selectedTeams.filter(id => id !== teamId));
    } else {
      setSelectedTeams([...selectedTeams, teamId]);
    }
  };

  console.log('------selectedTeams', selectedTeams)

  const selectedTeamHandler = () => {
    console.log('-------team', team)
    console.log('-------selectedTeams', selectedTeams)
    const selected = [];
    const notSelected = [];
    team.map((e, i) => {
      console.log('selectedTeams?.includes(i)', selectedTeams?.includes(e.id))
      if (selectedTeams?.includes(e.id)) {
        console.log('-----selected', selected.push(e));
      } else {
        console.log('-----not-selected', notSelected.push(e));
      }
    })

    setTeam(notSelected)
    setSelectedTeamsArr([...selectedTeamsArr, ...selected])
    setSelectedTeams([])

  }

  console.log('-------team after selection', team)
  console.log('-------selectedTeamsArr after selection', selectedTeamsArr)

  const restoreHandler = (index) => {
    const selected = [];
    const notSelected = [];
    selectedTeamsArr?.filter((e, i) => {
      if (e.id !== index) {
        notSelected.push(e);
      } else {
        selected.push(e);
      }
    });
    setSelectedTeamsArr(notSelected);
    setTeam([...selected, ...team]);
  }
  const addOneTeamHandler = (index) => {
    const selected = [];
    const notSelected = [];
    team?.filter((e, i) => {
      if (e.id !== index) {
        notSelected.push(e);
      } else {
        selected.push(e);
      }
    });
    setTeam(notSelected);
    setSelectedTeamsArr([...selectedTeamsArr, ...selected]);
  }
  console.log('---setSelectedTeamsArr 11--', selectedTeamsArr)


 
  return (
    <div >

      <BrowserRouter >
        <div className='d-flex align-items-start'>
          <SideBar />
          <Routes>
            <Route path='/' element={<BufferConfigureTeam team={team} editTeam={editTeamHandler} handleRemove={handleRemove} getTeamHandler={getTeamHandler} modalHandler={modalHandler} modal={modal} handleSearch={handleSearch} searchTerm={searchTerm} handleCheckboxChange={handleCheckboxChange} selectedTeams={selectedTeams} selectedTeamHandler={selectedTeamHandler} selectedTeamsArr={selectedTeamsArr} restoreHandler={restoreHandler} addOneTeamHandler={addOneTeamHandler}  />} />
            <Route path='/master-buffer-team' element={<BufferTeam modal={modal} team={team} getTeam={getTeamHandler} editTeam={editTeamHandler} handleRemove={handleRemove} selectedTeams={selectedTeams} handleSearch={handleSearch} searchTerm={searchTerm} modalHandler={modalHandler} />} />
          </Routes>
        </div>
      </BrowserRouter>


      {/* <div className='d-flex justify-content-between'>
       
        <Button onClick={selectedTeamHandler}>Add Team</Button>
       
      </div>
      <div className="d-flex justify-content-center align-items-center gap-4 mt-5 w-full">
      <div className='w-75'>
        <BufferTeam modal={modal} team={team} getTeam={getTeamHandler} editTeam={editTeamHandler} handleRemove={handleRemove} handleCheckboxChange={handleCheckboxChange} selectedTeams={selectedTeams} />
      </div>
        <div className='w-50'>
          <BufferConfigureTeam />
        </div>
        </div> */}
      <AddTeam modal={modal} toggle={toggle} createTeams={createTeams} handleNameChange={handleNameChange} handleImageChange={handleImageChange} handleSubmit={handleSubmit} buttonFlag={buttonFlag} handleUpdate={handleUpdate} />
    </div>
  );
}

export default App;



