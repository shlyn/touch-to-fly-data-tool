import React, { Component } from "react";
import { Button, Segment, Header, Icon, Input, Table } from "semantic-ui-react";
import { deleteResource } from "../../api/Resources/resources";
import ReferenceModal from "../ReferenceModal/ReferenceModal";
const uuidv4 = require("uuid/v4");
export default class ReferenceDispay extends Component {
  state = { adding: false };

  addResources = () => {
    let { resources, resourceName, resourceNumber } = this.props;
    const { adding } = this.state;
    const id = uuidv4();
    const resourceId = uuidv4();
    const resource = {
      resource: {
        documentName: resourceName,
        documentNumber: resourceNumber,
        id: resourceId
      },
      addition: true,
      id
    };
    if (resources) {
      resources.push(resource);
    } else {
      resources = [resource];
    }

    this.props.onAddingElement({
      resources,
      resourceName: "",
      resourceNumber: ""
    });
    this.setState({ adding: !adding });
  };

  deleteHandler = ({ number, id, resource_id }) => {
    const { updateResources } = this.props;
    const result = window.confirm(`Are you sure you want to delete ${number}?`);
    if (result === true) {
      deleteResource({ id: resource_id });
      updateResources({ id });
    }
  };

  addingStateHandler = () => {
    const { adding } = this.state;
    this.setState({ adding: !adding });
  };

  addResourceToTask = ({ documentNumber, documentName }) => {
    let { resources } = this.props;

    const id = uuidv4();
    const resourceId = uuidv4();
    const resource = {
      resource: {
        documentName,
        documentNumber,
        id: resourceId
      },
      addition: true,
      id
    };
    if (resources) {
      console.log(resources);
      resources.push(resource);
    } else {
      resources = [resource];
    }

    // this.props.onAddingElement({
    //   resources,
    //   resourceName: "",
    //   resourceNumber: ""
    // });
  };

  inputHandlerNumber = ({ e, i }) => {
    const { resources } = this.props;
    resources[i].documentNumber = e.target.value;
    this.props.onAddingElement({ resources });
  };

  inputHandlerName = ({ e, i }) => {
    const { resources } = this.props;
    resources[i].documentName = e.target.value;
    this.props.onAddingElement({ resources });
  };

  addResourceInput = () => {
    const { resources } = this.props;
    resources.push({});
    console.log(resources);
    this.props.onAddingElement({ resources });
    this.setState({ adding: true });
  };

  removeResourceInput = ({ i }) => {
    const { resources } = this.props;
    const index = i;
    const newResources = resources.filter((data, i) => {
      return i !== index;
    });
    this.props.onAddingElement({ resources: newResources });
  };

  render() {
    const {
      resources,
      editing,
      inputHandler,
      resourceName,
      resourceNumber,
      editResourceHandler
    } = this.props;
    let { adding } = this.state;

    if (resources.every(data => data.id)) {
      adding = false;
    }
    const referenceDisplay =
      resources &&
      resources.map((data, i) => {
        const { resource, id, resource_id } = data;
        if (editing && id) {
          return (
            <Table.Row key={id}>
              <Table.Cell>
                <Input
                  onChange={e => editResourceHandler({ e, id })}
                  placeholder={resource.documentNumber}
                  name="documentNumber"
                  value={resource.documentNumber}
                  style={{ width: "100%" }}
                  disabled={resource_id === undefined}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  onChange={e => editResourceHandler({ e, id })}
                  placeholder={resource.documentName}
                  name="documentName"
                  value={resource.documentName}
                  style={{ width: "100%" }}
                  disabled={resource_id === undefined}
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  style={{
                    fontSize: "1.2em",
                    padding: "10px",
                    width: "75px"
                  }}
                  color="red"
                  icon
                  disabled={resource_id === undefined}
                  onClick={() =>
                    this.deleteHandler({
                      id,
                      number: resource.documentNumber,
                      resource_id
                    })
                  }
                >
                  <Icon name="trash" position="right" />
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        } else if (id) {
          return (
            <Table.Row key={resource.id}>
              <Table.Cell>{resource.documentNumber}</Table.Cell>
              <Table.Cell>{resource.documentName}</Table.Cell>
            </Table.Row>
          );
        }
      });

    const addingDisplay = resources.map((data, i) => {
      if (!data.id || data.new) {
        return (
          <>
            <Table.Row>
              <Table.Cell>
                <Input
                  placeholder="Document Name"
                  name={"resourceName"}
                  value={resources[i].documentName}
                  onChange={e => this.inputHandlerName({ e, i })}
                  style={{ width: "100%" }}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  placeholder="Document Number"
                  name="resourceNumber"
                  value={resources[i].documentNumber}
                  onChange={e => this.inputHandlerNumber({ e, i })}
                  style={{ width: "100%" }}
                />
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Icon
                  name="delete"
                  color="red"
                  onClick={() => this.removeResourceInput({ i })}
                />
              </Table.Cell>
            </Table.Row>
          </>
        );
      }
    });

    return (
      <>
        <Segment color="red">
          <Header>References</Header>
          <Segment.Group>
            <Table celled structured>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Resource Number</Table.HeaderCell>
                  <Table.HeaderCell>Resource Name</Table.HeaderCell>
                  {editing && <Table.HeaderCell>Delete</Table.HeaderCell>}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {referenceDisplay}
                {adding && editing && addingDisplay}
                {editing && (
                  <Table.Row>
                    <Table.Cell colSpan="3">
                      <Button
                        style={{ background: "transparent" }}
                        onClick={() => this.addResourceInput()}
                      >
                        <Icon name="add" />
                      </Button>
                      <ReferenceModal
                        addResourceToTask={this.addResourceToTask}
                        adding={adding}
                      />
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Segment.Group>
        </Segment>
      </>
    );
  }
}
