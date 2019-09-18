import React, { Component } from "react";
import { Button, Segment, Header, Icon, Input, Table } from "semantic-ui-react";
import { deleteResource } from "../../api/Resources/resources";
import ReferenceModal from "../ReferenceModal/ReferenceModal";
const uuidv4 = require("uuid/v4");
export default class ReferenceDispay extends Component {
  state = { adding: false };

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

  addResourceToTask = ({ documentNumber, documentName, resource_id, id }) => {
    let { resources } = this.props;

    const resource = {
      resource: {
        documentName,
        documentNumber,
        id
      },
      existing: true,
      resource_id: id
    };
    if (resources) {
      resources.push(resource);
    } else {
      resources = [resource];
    }
    this.props.onAddingElement({ resources });
  };

  inputHandlerNumber = ({ e, i }) => {
    let { resources } = this.props;
    resources[i].resource.documentNumber = e.target.value;
    this.props.onAddingElement({ resources });
  };

  inputHandlerName = ({ e, i }) => {
    let { resources } = this.props;
    resources[i].resource.documentName = e.target.value;
    this.props.onAddingElement({ resources });
  };

  addResourceInput = () => {
    const id = uuidv4();
    const resource_id = uuidv4();
    const { resources } = this.props;

    if (resources) {
      resources.push({ resource: { resource_id }, id, addition: true });
    } else {
      resources = [{ resource: { resource_id }, id, addition: true }];
    }

    this.props.onAddingElement({ resources });
    this.setState({ adding: true });
  };

  removeResourceInput = ({ i, existing }) => {
    console.log(existing);
    let { resources } = this.props;
    const index = i;
    if (existing) {
      resources[index].deleted = true;
      this.props.onAddingElement({ resources });
    } else {
      const newResources = resources.filter((data, i) => {
        return i !== index;
      });
      this.props.onAddingElement({ resources: newResources });
    }
  };

  render() {
    const { resources, editing, editResourceHandler } = this.props;
    console.log(resources);
    const referenceDisplay =
      resources &&
      resources.map((data, i) => {
        const { resource, id, resource_id, addition, deleted } = data;
        if (editing && !addition && !deleted) {
          return (
            <Table.Row key={id}>
              <Table.Cell>
                <Input
                  onChange={e => editResourceHandler({ e, id })}
                  placeholder={resource.documentNumber}
                  name="documentNumber"
                  value={resource.documentNumber}
                  style={{ width: "100%" }}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  onChange={e => editResourceHandler({ e, id })}
                  placeholder={resource.documentName}
                  name="documentName"
                  value={resource.documentName}
                  style={{ width: "100%" }}
                />
              </Table.Cell>
              <Table.Cell>
                <Icon
                  name="delete"
                  color="red"
                  onClick={() =>
                    this.removeResourceInput({ i, existing: true })
                  }
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
        } else if (!editing) {
          return (
            <Table.Row key={resource.id}>
              <Table.Cell>{resource.documentNumber}</Table.Cell>
              <Table.Cell>{resource.documentName}</Table.Cell>
            </Table.Row>
          );
        }
      });

    const addingDisplay = resources.map((data, i) => {
      if (data.addition === true) {
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
              <Table.Cell colSpan="2">
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
                  {editing && (
                    <Table.HeaderCell>Remove From Task</Table.HeaderCell>
                  )}
                  {editing && <Table.HeaderCell>Delete</Table.HeaderCell>}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {referenceDisplay}
                {editing && addingDisplay}
                {editing && (
                  <Table.Row>
                    <Table.Cell colSpan="4">
                      <Button
                        style={{ background: "transparent" }}
                        onClick={() => this.addResourceInput()}
                      >
                        <Icon name="add" /> New
                      </Button>
                      <ReferenceModal
                        addResourceToTask={this.addResourceToTask}
                        resources={resources}
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
