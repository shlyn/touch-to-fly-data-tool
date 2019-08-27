import React, { Component } from "react";
import { skillsId } from "../../utils/data";
import { Button, Segment, Header, Table, Icon } from "semantic-ui-react";
export default class SkillsDisplay extends Component {
  render() {
    const { elements, skillsDescription, editing } = this.props;

    const skillsDisplay =
      elements &&
      elements.map(data => {
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
      <>
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
                  {skillsDisplay}{" "}
                  {editing && (
                    <Button
                      style={{ background: "transparent" }}
                      onClick={() => this.setState({})}
                    >
                      <Icon name="add" />
                    </Button>
                  )}
                </Table.Body>
              </Table>
            </Segment>
          </Segment.Group>
        </Segment>
      </>
    );
  }
}
