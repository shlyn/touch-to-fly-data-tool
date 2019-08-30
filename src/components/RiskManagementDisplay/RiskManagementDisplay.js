import React, { Component } from "react";
import { Button, Segment, Header, Table, Icon, Input } from "semantic-ui-react";
import { riskManagementId } from "../../utils/data";
import { deleteElement } from "../../api/Elements/elements";
const uuidv4 = require("uuid/v4");

export default class RiskManagementDisplay extends Component {
  state = { adding: false, newCode: "", newText: "" };

  addElement = () => {
    const { elements } = this.props;
    const { newCode, newText } = this.state;
    const { adding } = this.state;
    const id = uuidv4();

    const element = {
      abbreviation_code: newCode,
      text: newText,
      type: { id: riskManagementId },
      id,
      addition: true
    };

    elements.push(element);
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

  deleteHandler = ({ abbreviation_code, id }) => {
    const { updateElements } = this.props;
    const result = window.confirm(
      `Are you sure you want to delete ${abbreviation_code}?`
    );
    if (result === true) {
      deleteElement({ id });
      updateElements({ id });
    }
  };

  render() {
    const {
      elements,
      riskManagementDescription,
      editing,
      editElementHandler
    } = this.props;
    const { adding, newCode, newText } = this.state;

    const riskManagementDisplay =
      elements &&
      elements.map(data => {
        const { text, abbreviation_code, type, id } = data;
        if (type.id === riskManagementId) {
          if (editing) {
            return (
              <Table.Row key={id}>
                <Table.Cell>
                  <Input
                    placeholder={abbreviation_code}
                    value={abbreviation_code}
                    name="abbreviation_code"
                    onChange={e => editElementHandler({ e, id })}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input
                    placeholder={text}
                    value={text}
                    name="text"
                    style={{ width: "100%" }}
                    onChange={e => editElementHandler({ e, id })}
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
                    onClick={() =>
                      this.deleteHandler({ id, abbreviation_code })
                    }
                  >
                    <Icon name="trash" position="right" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          } else {
            return (
              <Table.Row key={id}>
                <Table.Cell>{abbreviation_code}</Table.Cell>
                <Table.Cell>{text}</Table.Cell>
              </Table.Row>
            );
          }
        }
        return null;
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
                    {editing && <Table.HeaderCell>Delete</Table.HeaderCell>}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {riskManagementDisplay}
                  <Table.Row>
                    {editing && !adding && (
                      <Button
                        style={{ background: "transparent" }}
                        onClick={() => this.setState({ adding: !adding })}
                      >
                        <Icon name="add" />
                      </Button>
                    )}
                  </Table.Row>
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
