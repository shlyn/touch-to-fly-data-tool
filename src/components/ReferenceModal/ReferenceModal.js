import React, { useState, useEffect } from "react";
import { Button, Header, Segment, Modal } from "semantic-ui-react";
import { getAllResources } from "../../api/Resources/resources";
import ResourceList from "../ResourceList/ResourceList";

const ReferenceModal = ({ addResourceToTask, adding }) => {
  const [resourceList, setResourceList] = useState([]);
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
        <Button color="green" disabled={adding}>
          Add Resource
        </Button>
      }
    >
      <Modal.Header>Select a Resource</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Current Resources</Header>
          <Segment>
            <ResourceList
              resourceList={resourceList}
              addResourceToTask={addResourceToTask}
            />
          </Segment>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default ReferenceModal;
