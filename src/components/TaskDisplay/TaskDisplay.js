import React, { Component } from "react";
import { Button, Segment, Header, Table, Input } from "semantic-ui-react";
import styled from "styled-components";
import { knowledgeId, riskManagementId, skillsId } from "../../utils/data";
export default class TaskDisplay extends Component {
  state = { editing: false, ...this.props };
  render() {
    const {
      resources,
      name,
      knowledgeDescription,
      skillsDescription,
      riskManagementDescription,
      objective,
      elements
    } = this.props;
    const { editing } = this.state;

    console.log(editing);
    const referenceDisplay = resources.map(data => {
      if (editing) {
        return (
          <Segment>
            <Input
              placeholder={data.resource.documentName}
              value={this.state.resourceName}
            />
          </Segment>
        );
      } else {
        return <Segment>{data.resource.documentName}</Segment>;
      }
    });

    const knowledgeDisplay = elements.map(data => {
      const { text, abbreviation_code, type } = data;
      if (type.id === knowledgeId) {
        return (
          <Table.Row>
            <Table.Cell>{abbreviation_code}</Table.Cell>
            <Table.Cell>{text}</Table.Cell>
          </Table.Row>
        );
      }
    });

    const riskManagementDisplay = elements.map(data => {
      const { text, abbreviation_code, type } = data;
      if (type.id === riskManagementId) {
        return (
          <Table.Row>
            <Table.Cell>{abbreviation_code}</Table.Cell>
            <Table.Cell>{text}</Table.Cell>
          </Table.Row>
        );
      }
    });

    const skillsDisplay = elements.map(data => {
      const { text, abbreviation_code, type } = data;
      if (type.id === skillsId) {
        return (
          <Table.Row>
            <Table.Cell>{abbreviation_code}</Table.Cell>
            <Table.Cell>{text}</Table.Cell>
          </Table.Row>
        );
      }
    });

    return (
      <TaskContainer>
        <Button
          color={editing ? "gray" : "green"}
          onClick={() => this.setState({ editing: !editing })}
        >
          {editing ? "Cancel" : "Edit"}
        </Button>
        <Segment.Group>
          <Segment color="red">
            <Header>References</Header>
            <Segment.Group horizontal>{referenceDisplay}</Segment.Group>
          </Segment>

          <Segment color="orange">
            {" "}
            <Header>Objective</Header>
            <Segment>{objective}</Segment>
          </Segment>
          <Segment color="blue">
            <Header>Knowledge</Header>
            <Segment.Group>
              <Segment>{knowledgeDescription}</Segment>
              <Segment>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Code</Table.HeaderCell>
                      <Table.HeaderCell>Description</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{knowledgeDisplay}</Table.Body>
                </Table>
              </Segment>
            </Segment.Group>
          </Segment>

          <Segment color="yellow">
            <Header>Risk Management</Header>
            <Segment.Group>
              <Segment>{riskManagementDescription}</Segment>
              <Segment>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Code</Table.HeaderCell>
                      <Table.HeaderCell>Description</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{riskManagementDisplay}</Table.Body>
                </Table>
              </Segment>
            </Segment.Group>
          </Segment>

          <Segment color="green">
            <Header>Skills</Header>
            <Segment.Group>
              <Segment>{skillsDescription}</Segment>
              <Segment>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Code</Table.HeaderCell>
                      <Table.HeaderCell>Description</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{skillsDisplay}</Table.Body>
                </Table>
              </Segment>
            </Segment.Group>
          </Segment>
        </Segment.Group>
        <Button color="red" style={{ marginBottom: "20px" }}>
          Delete
        </Button>
      </TaskContainer>
    );
  }
}

const TaskContainer = styled.div`
  height: 100vh;
  padding: 30px;
`;
