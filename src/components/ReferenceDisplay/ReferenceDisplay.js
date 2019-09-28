import React, { Component } from "react";
import { Button, Segment, Header, Icon, Input, Table } from "semantic-ui-react";
import { deleteResource } from "../../api/Resources/resources";
import ReferenceModal from "../ReferenceModal/ReferenceModal";
const uuidv4 = require("uuid/v4");
export default class ReferenceDispay extends Component {
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
    const { resources, editing } = this.props;
    console.log(resources);
    const referenceDisplay =
      resources &&
      resources.map((data, i) => {
        const { resource, id, addition, deleted } = data;
        if (editing && !addition && !deleted) {
          return (
            <Table.Row key={id}>
              <Table.Cell>{resource.documentNumber}</Table.Cell>
              <Table.Cell>{resource.documentName}</Table.Cell>
              <Table.Cell>
                <Icon
                  name="delete"
                  color="red"
                  onClick={() =>
                    this.removeResourceInput({ i, existing: true })
                  }
                />
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
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {referenceDisplay}
                {editing && (
                  <Table.Row>
                    <Table.Cell colSpan="4">
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
