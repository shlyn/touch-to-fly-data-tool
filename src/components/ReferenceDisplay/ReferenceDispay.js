import React, { Component } from "react";
import { Button, Segment, Header, Icon, Input, Table } from "semantic-ui-react";

export default class ReferenceDispay extends Component {
  state = { adding: false };

  addResource = () => {
    const { resources, resourceName, resourceNumber } = this.props;
    const { adding } = this.state;

    const resource = {
      resource: { documentName: resourceName, documentNumber: resourceNumber }
    };

    resources.push(resource);
    this.props.onAddingElement({
      resources,
      resourceName: "",
      resourceNumber: ""
    });
    this.setState({ adding: !adding });
  };

  render() {
    const {
      resources,
      editing,
      inputHandler,
      resourceName,
      resourceNumber,
      currentResources
    } = this.props;
    const { adding } = this.state;
    const referenceDisplay =
      resources &&
      resources.map((data, i) => {
        if (editing) {
          return (
            <Table.Row>
              <Table.Cell>
                <Input
                  onChange={e => inputHandler(e)}
                  placeholder={data.resource.documentNumber}
                  value={currentResources[i].resource.documentNumber}
                  style={{ width: "100%" }}
                  disabled
                />
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Input
                  onChange={e => inputHandler(e)}
                  placeholder={data.resource.documentName}
                  value={currentResources[i].resource.documentName}
                  style={{ width: "100%" }}
                  disabled
                />
              </Table.Cell>
            </Table.Row>
          );
        } else {
          return (
            <Table.Row>
              <Table.Cell>{data.resource.documentNumber}</Table.Cell>
              <Table.Cell>{data.resource.documentName}</Table.Cell>
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
              {adding && (
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
