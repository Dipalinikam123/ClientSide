import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SelectedBufferTeam from '../pages/SelectedBufferTeam';
import DeselectedBufferTeam from '../pages/DeselectedBufferTeam';


export default function ConfigureTeamModel({ modals, toggle, team, handleRemove, getTeamHandler, modalHandler, modal,searchTerm,handleSearch,handleCheckboxChange,selectedTeams,selectedTeamHandler,selectedTeamsArr,restoreHandler,addOneTeamHandler,configureTeamHandler,deSearchTerm, setDeSearchTerm,deSelectedTeamsArr,teamFLag}) {

  
  return (
    <div className=''>
      <Modal isOpen={modals} toggle={toggle} size='xl' fullscreen='true' >
        <ModalHeader toggle={toggle}>Buffer Teams</ModalHeader>
        <ModalBody>
          <div className='d-flex w-100'>
            <div className='w-50 border'>
              <DeselectedBufferTeam modal={modal} team={team} handleRemove={handleRemove} getTeam={getTeamHandler} modalHandler={modalHandler} searchTerm={searchTerm} handleSearch={handleSearch} handleCheckboxChange={handleCheckboxChange} selectedTeams={selectedTeams} selectedTeamHandler={selectedTeamHandler} addOneTeamHandler={addOneTeamHandler} deSelectedTeamsArr={deSelectedTeamsArr} teamFLag={teamFLag}/>
            </div>
            <div className='w-50 border'>
              <SelectedBufferTeam selectedTeamsArr={selectedTeamsArr} restoreHandler={restoreHandler} searchTerm={searchTerm} handleSearch={handleSearch} deSearchTerm={deSearchTerm} setDeSearchTerm={setDeSearchTerm}/>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={configureTeamHandler}>
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
