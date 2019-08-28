import React, { Component } from "react";
import { Button, Segment, Header, Icon, Input, Table } from "semantic-ui-react";
import { deleteResource } from "../../api";
const uuidv4 = require("uuid/v4");
export default class ReferenceDispay extends Component {
  state = { adding: false };

  addResource = () => {
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

  render() {
    const {
      resources,
      editing,
      inputHandler,
      resourceName,
      resourceNumber,
      currentResources,
      editResourceHandler
    } = this.props;
    const { adding } = this.state;
    const referenceDisplay =
      resources &&
      resources.map((data, i) => {
        const { resource, id, resource_id } = data;
        if (editing) {
          return (
            <Table.Row>
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
                {" "}
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
                {" "}
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
        } else {
          return (
            <Table.Row>
              <Table.Cell>{resource.documentNumber}</Table.Cell>
              <Table.Cell>{resource.documentName}</Table.Cell>
            </Table.Row>
          );
        }
      });

    return (
      <>
        <Segment color="red">
          <Header>References</Header>
          <Segment.Group>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Resource Number</Table.HeaderCell>
                  <Table.HeaderCell>Resource Name</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {referenceDisplay}
              {editing && !adding && (
                <Button
                  style={{ background: "transparent" }}
                  onClick={() => this.setState({ adding: !adding })}
                >
                  <Icon name="add" />
                </Button>
              )}
              {adding && editing && (
                <>
                  <Table.Row>
                    <Table.Cell>
                      <Input
                        placeholder="Document Name"
                        name="resourceName"
                        value={resourceName}
                        onChange={e => inputHandler(e)}
                        style={{ width: "100%" }}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        placeholder="Document Number"
                        name="resourceNumber"
                        value={resourceNumber}
                        onChange={e => inputHandler(e)}
                        style={{ width: "100%" }}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Button
                    style={{ background: "transparent", color: "green" }}
                    onClick={() => this.addResource()}
                  >
                    <Icon name="add" />
                  </Button>
                </>
              )}
            </Table>
          </Segment.Group>
        </Segment>
      </>
    );
  }
}
