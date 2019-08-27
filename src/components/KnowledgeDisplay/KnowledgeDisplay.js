import React, { Component } from "react";
import { Button, Segment, Header, Table, Input, Icon } from "semantic-ui-react";
import { knowledgeId } from "../../utils/data";
export default class KnowledgeDisplay extends Component {
  render() {
    const { knowledgeDescription, elements, editing } = this.props;

    const knowledgeDisplay = elements.map(data => {
      const { text, abbreviation_code, type } = data;
      if (type.id === knowledgeId) {
        if (editing) {
          return (
            <Table.Row>
              <Table.Cell>
                <Input
                  placeholder={abbreviation_code}
                  value={abbreviation_code}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  placeholder={text}
                  value={text}
                  style={{ width: "100%" }}
                />
              </Table.Cell>
            </Table.Row>
          );
        } else {
          return (
            <Table.Row>
              <Table.Cell>{abbreviation_code}</Table.Cell>
              <Table.Cell>{text}</Table.Cell>
            </Table.Row>
          );
        }
      }
    });

    return (
      <>
        <Segment color="blue">
          <Header>Knowledge</Header>
          <Segment.Group>
            <Segment>
              {editing ? (
                <Input
                  placeholder={knowledgeDescription}
                  style={{ width: "100%" }}
                  value={knowledgeDescription}
                />
              ) : (
                knowledgeDescription
              )}
            </Segment>
            <Segment>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Code</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {knowledgeDisplay}{" "}
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
