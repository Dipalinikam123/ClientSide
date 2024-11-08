import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import BufferTeam from './ui/pages/BufferTeam';
import AddTeam from './ui/model/AddTeam';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './ui/model/SideBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BufferConfigureTeam from './ui/pages/BufferConfigureTeam';
import AlertModel from './ui/model/AlertModel';

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
  const [deSearchTerm, setDeSearchTerm] = useState('')
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedTeamsArr, setSelectedTeamsArr] = useState([]);
  const [deSelectedTeamsArr, setDeSelectedTeamsArr] = useState([]);
  const [selectedTeamsArr2, setSelectedTeamsArr2] = useState([]);
  const [configureTeam, setConfigureTeam] = useState([])
  const [bufferModal, setBufferModal] = useState(false);
  const bufferToggle = () => setBufferModal(!bufferModal);

  const [alertModal, setAlertModal] = useState(false);
  const alertToggle = () => setAlertModal(!alertModal);
  const [removeTeamId, setRemoveTeamId] = useState(null);
  const [teamFLag,setTeamFlag]=useState(false)
  const [newTeam,setNewTeam]=useState({})

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

  console.log("------selectedTeamsArr2", selectedTeamsArr2)
  console.log("------deSearchTerm", deSearchTerm)
  useEffect(() => {
    const searchResults = selectedTeamsArr2?.filter((e) =>
      e.teamName.toLowerCase().includes(deSearchTerm.toLowerCase())
    );
    if (deSearchTerm === '') {
      setSelectedTeamsArr(selectedTeamsArr2)
    } else {
      setSelectedTeamsArr(searchResults);
    }
  }, [deSearchTerm])



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
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      toggle();
      setCreateTeams({
        teamName: '',
        teamImage: null
      });
      setNewTeam(response.data.result)
      toast('Create Team Succesfully', {
        autoClose: 1000,
      });
    } catch (error) {
      toast(error?.response?.data?.message, {
        autoClose: 1000,
      })
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
    // setTeam[]
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
      toast('Team Update Successfully', {
        autoClose: 1000,
      })
      setIndex(null)
    } catch (error) {
      toast(error?.response?.data?.message, {
        autoClose: 1000,
      })
    }
  }
  const handleRemove = async (id) => {
    setRemoveTeamId(id)
    alertToggle()
  };

  const handleRemoveTeam = async () => {
    try {
      const response = await axios.delete(`http://localhost:1337/removeTeam/${removeTeamId}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response remove:', response.data);
      toast('Team removed successfully.', {
        autoClose: 1000,
      });
      alertToggle()
      getTeamHandler();
    } catch (error) {
      console.error('Error removing team:', error);
      toast('Failed to remove team. Please try again.', {
        autoClose: 1000,
      });
    }

  }

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
    setTeamFlag(true)
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
    // setDeSelectedTeamsArr(notSelected)
    setSelectedTeamsArr([...selectedTeamsArr, ...selected])
    setSelectedTeamsArr2([...selectedTeamsArr, ...selected])
    setSelectedTeams([])

  }

  console.log('******-------deSelectedTeamsArr', deSelectedTeamsArr)
  console.log('******-------deSelectedTeamsArr', deSelectedTeamsArr)
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
    // setSelectedTeamsArr2(notSelected);
    setTeam([...selected, ...team]);
  }
  const addOneTeamHandler = (index) => {
    setTeamFlag(true)
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
    // setDeSelectedTeamsArr(notSelected)
    setSelectedTeamsArr([...selectedTeamsArr, ...selected]);
    setSelectedTeamsArr2([...selectedTeamsArr, ...selected]);

  }
  console.log('---setSelectedTeamsArr 11--', selectedTeamsArr)

  const configureTeamHandler = async () => {
    const challengeName = prompt('Enter Challenge Name..');

    if (challengeName) {
      const payload = {
        challengeName,
        teams: selectedTeamsArr
      };
      try {
        const response = await axios.post('http://localhost:1337/configureBufferTeam', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Response:', response.data);
        bufferToggle();
        setSelectedTeamsArr([])
        setTeamFlag(false)
        getTeamHandler()
        toast('Buffer Team Create successfully.', {
          autoClose: 1000,
        });

      } catch (error) {
        toast(error?.response?.data?.message, {
          autoClose: 1000,
        })
        console.error('Error uploading team:', error);
      }
    };
  }

  async function getConfigTeamHandler() {
    try {
      const response = await axios.get('http://localhost:1337/getConfigureBufferTeam');
      console.log('Response:', response.data);
      setConfigureTeam(response.data.teams);

    } catch (error) {
      console.error('Error fetching team:', error);
    }
  }
console.log('-----teamFLag',teamFLag)
  return (
    <div>

      <BrowserRouter >
        <div className='d-flex align-items-start' >
          <SideBar />
          <Routes>
            <Route path='/configuration-buffer-team' element={<BufferConfigureTeam team={team} editTeam={editTeamHandler} handleRemove={handleRemove} getTeamHandler={getTeamHandler} modalHandler={modalHandler} modal={modal} handleSearch={handleSearch} searchTerm={searchTerm} handleCheckboxChange={handleCheckboxChange} selectedTeams={selectedTeams} selectedTeamHandler={selectedTeamHandler} selectedTeamsArr={selectedTeamsArr} restoreHandler={restoreHandler} addOneTeamHandler={addOneTeamHandler} setSelectedTeamsArr={setSelectedTeamsArr} configureTeamHandler={configureTeamHandler} getConfigTeamHandler={getConfigTeamHandler} configureTeam={configureTeam} bufferToggle={bufferToggle} bufferModal={bufferModal} deSearchTerm={deSearchTerm} setDeSearchTerm={setDeSearchTerm} deSelectedTeamsArr={deSelectedTeamsArr} teamFLag={teamFLag} setSearchTerm={setSearchTerm}  setTeamFlag={setTeamFlag}/>} />
            <Route path='/' element={<BufferTeam modal={modal} team={team} getTeam={getTeamHandler} editTeam={editTeamHandler} handleRemove={handleRemove} selectedTeams={selectedTeams} handleSearch={handleSearch} searchTerm={searchTerm} modalHandler={modalHandler} />} />
          </Routes>
        </div>
      </BrowserRouter>
      <AlertModel alertToggle={alertToggle} alertModal={alertModal} handleRemoveTeam={handleRemoveTeam} />
      <AddTeam modal={modal} toggle={toggle} createTeams={createTeams} handleNameChange={handleNameChange} handleImageChange={handleImageChange} handleSubmit={handleSubmit} buttonFlag={buttonFlag} handleUpdate={handleUpdate} />
      <ToastContainer />
    </div>
  );
}

export default App;



