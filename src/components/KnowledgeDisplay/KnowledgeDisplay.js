import React, { Component } from "react";
import { Button, Segment, Header, Table, Input, Icon } from "semantic-ui-react";
import { knowledgeId } from "../../utils/data";
export default class KnowledgeDisplay extends Component {
  state = { adding: false, newCode: "", newText: "" };

  addElement = () => {
    const { elements } = this.props;
    const { newCode, newText } = this.state;
    const { adding } = this.state;

    const element = {
      abbreviation_code: newCode,
      text: newText,
      type: { id: knowledgeId }
    };

    elements.push(element);
    console.log(elements);
    this.props.onAddingElement({
      elements,
      abbreviation_code: "",
      text: ""
    });
    this.setState({ adding: !adding });
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      knowledgeDescription,
      elements,
      editing,
      inputHandler
    } = this.props;
    const { adding, newCode, newText } = this.state;
    console.log(newCode, newText);
    const knowledgeDisplay =
      elements &&
      elements.map(data => {
        const { text, abbreviation_code, type } = data;
        if (type.id === knowledgeId) {
          if (editing) {
            return (
              <Table.Row>
                <Table.Cell>
                  <Input
                    placeholder={abbreviation_code}
                    value={abbreviation_code}
                    name="abbreviation_code"
                    onChange={e => inputHandler(e)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input
                    placeholder={text}
                    value={text}
                    name="text"
                    style={{ width: "100%" }}
                    onChange={e => inputHandler(e)}
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

    const addingDisplay = (
      <>
        <Table.Row>
          <Table.Cell>
            <Input
              placeholder={"Code"}
              value={newCode}
              name="newCode"
              onChange={e => this.inputHandler(e)}
            />
          </Table.Cell>
          <Table.Cell>
            <Input
              placeholder={"Description"}
              value={newText}
              name="newText"
              style={{ width: "100%" }}
              onChange={e => this.inputHandler(e)}
            />
          </Table.Cell>
        </Table.Row>
        <Button
          style={{ background: "transparent", color: "green" }}
          onClick={() => this.addElement()}
        >
          <Icon name="add" />
        </Button>
      </>
    );

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
                  onChange={e => inputHandler(e)}
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
                  {editing && !adding && (
                    <Button
                      style={{ background: "transparent" }}
                      onClick={() => this.setState({ adding: !adding })}
                    >
                      <Icon name="add" />
                    </Button>
                  )}
                  {adding && editing && addingDisplay}
                </Table.Body>
              </Table>
            </Segment>
          </Segment.Group>
        </Segment>
      </>
    );
  }
}
