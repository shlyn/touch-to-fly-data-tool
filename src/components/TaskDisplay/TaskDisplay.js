import React, { Component } from "react";
import { Button, Segment, Header, Table } from "semantic-ui-react";
import styled from "styled-components";

export default class TaskDisplay extends Component {
  render() {
    const {
      resources,
      name,
      knowledgeDescription,
      skillsDescription,
      riskManagementDescription,
      objective
    } = this.props;

    const referenceDisplay = resources.map(data => {
      return <Segment>{data.resource.documentName}</Segment>;
    });
    return (
      <TaskContainer>
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

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                  </Table.Body>
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
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                  </Table.Body>
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
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                  </Table.Body>
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
  margin-left: 50px;
  height: 100vh;
  padding: 30px;
`;
