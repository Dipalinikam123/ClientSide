import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import BufferTeam from "./ui/pages/BufferTeam";
import AddTeam from "./ui/model/AddTeam";
import axios from "axios";
import SideBar from "./ui/model/SideBar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import BufferConfigureTeam from "./ui/pages/BufferConfigureTeam";
import AlertModel from "./ui/model/AlertModel";
import NavBar from "./ui/components/NavBar";
import Home from "./ui/pages/Home";
import Unauthorized from "./ui/Unauthorized";
import ProtectedRoute from "./ui/ProtectedRoute";
import Profile from "./ui/pages/Profile";
import ResetPassword from "./ui/pages/ResetPassword";


const formFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: ''
}

function App() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [team, setTeam] = useState([]);
  const [masterTeam, setMasterTeam] = useState([]);
  const [createTeams, setCreateTeams] = useState({
    teamName: "",
    teamImage: null,
  });
  const [buttonFlag, setButtonFlag] = useState(false);
  const [index, setIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deSearchTerm, setDeSearchTerm] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedTeamsArr, setSelectedTeamsArr] = useState([]);
  const [selectedTeamsArr2, setSelectedTeamsArr2] = useState([]);
  const [configureTeam, setConfigureTeam] = useState([]);
  const [bufferModal, setBufferModal] = useState(false);
  const bufferToggle = () => setBufferModal(!bufferModal);

  const [alertModal, setAlertModal] = useState(false);
  const alertToggle = () => setAlertModal(!alertModal);
  const [removeTeamId, setRemoveTeamId] = useState(null);
  const [teamFLag, setTeamFlag] = useState(false);
  const [getTeamFlag, setGetTeamFlag] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const [logModal, setLogModal] = useState(false);
  const logToggle = () => setLogModal(!logModal);

  const [regModal, setRegModal] = useState(false);
  const regToggle = () => setRegModal(!regModal);

  const [registerForm, setRegisterForm] = useState(formFields)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  const [token, setToken] = useState('')
  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
  });

  // const navigate=useNavigate()
  const regValidateForm = () => {
    const nameError = registerForm?.firstName.trim() === '' || registerForm?.lastName.trim() === '';
    const emailError = !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(registerForm?.email);
    const passwordError = registerForm?.password.length < 6;

    setErrors({ nameError, emailError, passwordError });
  };
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const logValidateForm = () => {
    setEmailError(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(loginForm?.email));
    setPasswordError(loginForm?.password?.length < 6);
  };
  const deSelectedTeamsArr = team.filter((e) => e.teamName.toLowerCase().includes(searchTerm.toLowerCase()))
  const masterBufferTeamsArr = masterTeam.filter((e) => e.teamName.toLowerCase().includes(searchTerm.toLowerCase()))
  useEffect(() => {
    const searchResults = selectedTeamsArr2?.filter((e) =>
      e.teamName.toLowerCase().includes(deSearchTerm.toLowerCase())
    );
    if (deSearchTerm === "") {
      setSelectedTeamsArr(selectedTeamsArr2);
    } else {
      setSelectedTeamsArr(searchResults);
    }
  }, [deSearchTerm]);

  async function getTeamHandler() {
    try {
      const response = await axios.get("http://localhost:1337/getTeam");
      console.log("Response:", response.data);
      const deselectedTeamIds = selectedTeamsArr.map((team) => team.id);
      const deselectedTeams = response.data.team.filter(
        (e) => !deselectedTeamIds.includes(e.id)
      );

      setTeam(deselectedTeams);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  }
  async function getMasterBufferTeamHandler() {
    try {
      const response = await axios.get("http://localhost:1337/getTeam");
      setMasterTeam(response.data.team);
      // setFilteredTeam(response.data.team);
    } catch (error) {
      console.error("Error fetching team:", error);
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
      const response = await axios.post(
        "http://localhost:1337/addTeam",
        createTeams,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      toggle();
      setCreateTeams({
        teamName: "",
        teamImage: null,
      });
      // setNewTeam(response.data.result)
      getTeamHandler();
      setGetTeamFlag(true);
      toast("Create Team Succesfully", {
        autoClose: 1000,
      });
    } catch (error) {
      toast(error?.response?.data?.message, {
        autoClose: 1000,
      });
      console.error("Error uploading team:", error);
    }
  };

  const editTeamHandler = (data, id) => {
    console.log("----data", data);
    setIndex(id);
    setButtonFlag(true);
    toggle();
    setCreateTeams(data);
  };
  const modalHandler = () => {
    setCreateTeams({
      teamName: "",
      teamImage: null,
    });
    toggle();
    setButtonFlag(false);
    // setTeam[]
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:1337/updateTeam/${index}`,
        createTeams,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
          },
        }
      );
      console.log("Response update:", response.data);
      toggle();
      setCreateTeams({
        teamName: "",
        teamImage: null,
      });
      toast("Team Update Successfully", {
        autoClose: 1000,
      });
      setIndex(null);
    } catch (error) {
      toast(error?.response?.data?.message, {
        autoClose: 1000,
      });
    }
  };
  const handleRemove = async (id) => {
    setRemoveTeamId(id);
    alertToggle();
  };

  const handleRemoveTeam = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:1337/removeTeam/${removeTeamId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response remove:", response.data);
      toast("Team removed successfully.", {
        autoClose: 1000,
      });
      alertToggle();
      getMasterBufferTeamHandler();
    } catch (error) {
      console.error("Error removing team:", error);
      toast("Failed to remove team. Please try again.", {
        autoClose: 1000,
      });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (teamId) => {
    if (selectedTeams.includes(teamId)) {
      setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
    } else {
      setSelectedTeams([...selectedTeams, teamId]);
    }
  };
  const selectedTeamHandler = () => {
    setTeamFlag(true);
    console.log("-------team", team);
    console.log("-------selectedTeams", selectedTeams);
    const selected = [];
    const notSelected = [];
    team.map((e, i) => {
      console.log("selectedTeams?.includes(i)", selectedTeams?.includes(e.id));
      if (selectedTeams?.includes(e.id)) {
        console.log("-----selected", selected.push(e));
      } else {
        console.log("-----not-selected", notSelected.push(e));
      }
    });

    setTeam(notSelected);
    setSelectedTeamsArr([...selectedTeamsArr, ...selected]);
    setSelectedTeamsArr2([...selectedTeamsArr, ...selected]);
    setSelectedTeams([]);
  };

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
  };
  const addOneTeamHandler = (index) => {
    setTeamFlag(true);
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
    setSelectedTeamsArr2([...selectedTeamsArr, ...selected]);
  };

  const configureTeamHandler = async () => {
    const challengeName = prompt("Enter Challenge Name..");

    if (challengeName) {
      const payload = {
        challengeName,
        teams: selectedTeamsArr,
      };
      try {
        const response = await axios.post(
          "http://localhost:1337/configureBufferTeam",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", response.data);
        bufferToggle();
        setSelectedTeamsArr([]);
        setTeamFlag(false);
        getTeamHandler();
        toast("Buffer Team Create successfully.", {
          autoClose: 1000,
        });
      } catch (error) {
        toast(error?.response?.data?.message, {
          autoClose: 1000,
        });
        console.error("Error uploading team:", error);
      }
    }
  };

  async function getUserProfile() {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(`http://localhost:1337/userProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response:", response.data);
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching team:", error);
    }

  }
  async function getConfigTeamHandler() {
    try {
      const response = await axios.get(
        "http://localhost:1337/getConfigureBufferTeam"
      );
      console.log("Response:", response.data);
      setConfigureTeam(response.data.teams);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  }
  async function registerUserHandler() {
    regValidateForm()
    try {
      const response = await axios.post(
        "http://localhost:1337/userSignin",
        registerForm,
      );
      console.log("Response:", response.data);
      regToggle();
      setRegisterForm(formFields);
      localStorage.setItem('token', JSON.stringify(response.data.newUser.token))

      toast("User Register Succesfully", {
        autoClose: 1000,
      });
    } catch (error) {
      toast(error?.response?.data?.message, {
        autoClose: 1000,
      });
      console.error("Error registering user:", error);
    }
  }
  async function loginUserHandler() {
    setPasswordError(false)
    setEmailError(false)

    logValidateForm()
    try {
      const response = await axios.post(
        "http://localhost:1337/userSignup",
        loginForm,
      );
      console.log("Response login:", response.data);
      logToggle();
      setLoginForm({
        email: '',
        password: ''
      });
      
      localStorage.setItem('token', JSON.stringify(response.data.user.token))
      toast("User Login Succesfully", {
        autoClose: 1000,
      });
    } catch (error) {
      toast(error?.response?.data?.message, {
        autoClose: 1000,
      });
    }
  }
  async function forgetPassword(email) {
    try {
      const response = await axios.post(
        "http://localhost:1337/resetPassword",
        { email: email },
      );
      console.log("Response login:", response.data);
      toast("Link Send Succesfully", {
        autoClose: 1000,
      });
    } catch (error) {
      toast(error?.response?.data?.message, {
        autoClose: 1000,
      });
    }
  }



  return (
    <div>
      <BrowserRouter>
        <NavBar logModal={logModal} logToggle={logToggle} regModal={regModal} regToggle={regToggle} setRegisterForm={setRegisterForm} registerForm={registerForm} loginForm={loginForm} setLoginForm={setLoginForm} token={token} setToken={setToken}
          registerUserHandler={registerUserHandler} loginUserHandler={loginUserHandler} errors={errors} setErrors={setErrors} setPasswordError={setPasswordError} setEmailError={setEmailError} passwordError={passwordError} emailError={emailError} forgetPassword={forgetPassword} />
        <div className="d-flex align-items-start">

          {token ? <SideBar /> : <Routes><Route path="/" element={<Home />} /></Routes>}

          <Routes>
            <Route
              path="/configuration-buffer-team"
              element={<ProtectedRoute componant={<BufferConfigureTeam
                team={team} editTeam={editTeamHandler} handleRemove={handleRemove} getTeamHandler={getTeamHandler} modalHandler={modalHandler} modal={modal} handleSearch={handleSearch} searchTerm={searchTerm}
                handleCheckboxChange={handleCheckboxChange} selectedTeams={selectedTeams} selectedTeamHandler={selectedTeamHandler} selectedTeamsArr={selectedTeamsArr} restoreHandler={restoreHandler} addOneTeamHandler={addOneTeamHandler}
                setSelectedTeamsArr={setSelectedTeamsArr} configureTeamHandler={configureTeamHandler} getConfigTeamHandler={getConfigTeamHandler} configureTeam={configureTeam} bufferToggle={bufferToggle} bufferModal={bufferModal} deSearchTerm={deSearchTerm}
                setDeSearchTerm={setDeSearchTerm} teamFLag={teamFLag} setSearchTerm={setSearchTerm} setTeamFlag={setTeamFlag} getTeamFlag={getTeamFlag} deSelectedTeamsArr={deSelectedTeamsArr}

              />} />
              }
            />
            <Route
              path="/master-buffer-team"
              element={<ProtectedRoute componant={<BufferTeam
                modal={modal} masterTeam={masterTeam} getTeam={getMasterBufferTeamHandler} editTeam={editTeamHandler} handleRemove={handleRemove} selectedTeams={selectedTeams}
                handleSearch={handleSearch} searchTerm={searchTerm} modalHandler={modalHandler} masterBufferTeamsArr={masterBufferTeamsArr}
              />} />
              }
            />
            <Route path='/resetPassword/:id/:token' element={<ResetPassword logToggle={logToggle}/>} />
            <Route path="/profile" element={<ProtectedRoute componant={<Profile getUserProfile={getUserProfile} userProfile={userProfile} />} />} />
            <Route path='/unauthorized' element={<Unauthorized logModal={logModal} regModal={regModal} />} />
          </Routes>
        </div>
      </BrowserRouter>
      <AlertModel
        alertToggle={alertToggle}
        alertModal={alertModal}
        handleRemoveTeam={handleRemoveTeam}
      />
      <AddTeam
        modal={modal}
        toggle={toggle}
        createTeams={createTeams}
        handleNameChange={handleNameChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        buttonFlag={buttonFlag}
        handleUpdate={handleUpdate}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
