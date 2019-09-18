import React, { useState, useEffect } from "react";
import { Button, Header, Segment, Modal } from "semantic-ui-react";
import { getAllResources } from "../../api/Resources/resources";
import ResourceList from "../ResourceList/ResourceList";

const ReferenceModal = ({ addResourceToTask, resources }) => {
  const [resourceList, setResourceList] = useState([]);
  const [open, setOpen] = useState(false);
  console.log(open);
  useEffect(() => {
    const getResources = async () => {
      const resourceList = await getAllResources();
      console.log(resourceList);
      setResourceList({ resourceList });
    };
    getResources();
  }, []);
  return (
    <Modal
      trigger={
        <Button onClick={() => setOpen(true)} color="green">
          Add Resource
        </Button>
      }
      open={open}
    >
      <Modal.Header>Select a Resource</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Current Resources</Header>
          <Segment>
            <ResourceList
              resourceList={resourceList}
              addResourceToTask={addResourceToTask}
              setOpen={setOpen}
              resources={resources}
            />
          </Segment>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default ReferenceModal;
