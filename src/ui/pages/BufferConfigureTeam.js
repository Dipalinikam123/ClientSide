import React, { useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';
import ConfigureTeamModel from '../model/ConfigureTeamModel';
import axios from 'axios';

export default function BufferConfigureTeam({ team, editTeam, handleRemove, getTeamHandler, modalHandler, modal, handleSearch, searchTerm, handleCheckboxChange, selectedTeams, selectedTeamHandler, selectedTeamsArr, restoreHandler, addOneTeamHandler }) {
  const [modals, setModal] = useState(false);

  const toggle = () => setModal(!modals);
  const [configureTeam, setConfigureTeam] = useState([])

  const configureTeamHandler = () => {
    const challengeName = prompt('Enter Challenge Name..');

    if (challengeName) {
      const payload = {
        challengeName,
        teams: selectedTeamsArr
      };

      fetch('http://localhost:1337/configureBufferTeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          toggle()
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.log('Challenge creation canceled');
    }
  };

  async function getConfigTeamHandler() {
    try {
      const response = await axios.get('http://localhost:1337/getConfigureBufferTeam');
      console.log('Response:', response.data);
      setConfigureTeam(response.data.teams);

    } catch (error) {
      console.error('Error fetching team:', error);
    }
  }

  useEffect(() => {
    getConfigTeamHandler()
  }, [modals])

  console.log('-----get configureTeam', configureTeam)
  return (
    <div className='p-5 w-100' style={{ minHeight: '100vh',}}>
      <Button className='bg-success' onClick={toggle}>Buffer Team</Button>

      <Table className='border border-1 w-100'>
        <thead>
          <tr>
            <th>Challenge Team</th>
            <th>Team Names</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {configureTeam?.map((challenge) => {
            return (
              <React.Fragment key={challenge.id}>
               
                <tr>
                  <td className='fw-bold' colSpan={3}>{challenge.challengeName}</td> {/* Display challenge name across all columns */}
                </tr>

                {/* Nested rows for each team */}
                {challenge.teams?.map((team, index) => {
                  return (
                    <tr key={index}>
                      <td></td> {/* Empty cell for alignment */}
                      <td>{team?.teamName}</td>
                      <td><img width={100} src={team?.teamImage} alt="Team" /></td>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>

      <ConfigureTeamModel modals={modals} modal={modal} toggle={toggle} team={team} editTeam={editTeam} handleRemove={handleRemove} getTeamHandler={getTeamHandler} modalHandler={modalHandler} searchTerm={searchTerm} handleSearch={handleSearch} handleCheckboxChange={handleCheckboxChange} selectedTeams={selectedTeams} selectedTeamHandler={selectedTeamHandler} selectedTeamsArr={selectedTeamsArr} restoreHandler={restoreHandler} addOneTeamHandler={addOneTeamHandler} configureTeamHandler={configureTeamHandler} />

    </div>
  )
}
