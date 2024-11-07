import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

function AddTeam({ toggle, modal, createTeams, handleNameChange, handleImageChange, handleSubmit, buttonFlag, handleUpdate }) {

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        {
          buttonFlag ? <ModalHeader toggle={toggle}>Update Team</ModalHeader> : <ModalHeader toggle={toggle}>Create Team</ModalHeader>
        }

        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="teamName">Team Name</Label>
              <Input
                id="teamName"
                name="name"
                placeholder="Enter Team Name"
                type="text"
                value={createTeams.teamName}
                onChange={handleNameChange}
              />
            </FormGroup>
            <FormGroup className='border'>
              <Label for="teamImage">Team Image</Label>
              {/* File input to change the team image */}
              <Input
                id="teamImage"
                name="image"
                type="file"
                onChange={handleImageChange} // Handle file selection
              />

              {createTeams.teamImage && typeof createTeams.teamImage === 'string' && (
                <div>
                  <img
                    src={createTeams.teamImage} // Use the URL directly for existing image
                    alt="Current"
                    className='mt-3'
                    width={70}
                  />
                </div>
              )}

              {/* If teamImage is a File (new image selected) */}
              {createTeams.teamImage && createTeams.teamImage instanceof File && (
                <div>
                  <img
                    src={URL.createObjectURL(createTeams.teamImage)} // Create a local URL for image preview
                    alt="Selected"
                    className='mt-3'
                    width={70}
                  />
                </div>
              )}


            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {
            buttonFlag ? <Button color="primary" onClick={handleUpdate}>
              Update
            </Button> :
              <Button color="primary" onClick={handleSubmit}>
                Add
              </Button>
          }

          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddTeam;
