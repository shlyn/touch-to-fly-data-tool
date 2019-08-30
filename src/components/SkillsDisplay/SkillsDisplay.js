import React, { Component } from "react";
import { skillsId } from "../../utils/data";
import { Segment, Header, Table, Input } from "semantic-ui-react";
import { deleteElement } from "../../api/Elements/elements";
import AddingDisplay from "../Simple/AddingDisplay";
import ElementsDisplay from "../Simple/ElementsDisplay";
import AddButton from "../Simple/AddButton";
import { addNewElement } from "../../utils/helpers";

export default class SkillsDisplay extends Component {
  state = { adding: false, newCode: "", newText: "" };

  stateChanges = ({ changes }) => {
    this.setState(changes);
  };

  addElement = () => {
    const { elements, onAddingElement } = this.props;
    const { newCode, newText, adding } = this.state;

    addNewElement({
      elements,
      newCode,
      newText,
      adding,
      elementId: skillsId,
      stateChanges: this.stateChanges,
      onAddingElement
    });
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

  addingStateHandler = () => {
    const { adding } = this.state;
    this.setState({ adding: !adding });
  };

  render() {
    const {
      elements,
      skillsDescription,
      editing,
      editElementHandler,
      inputHandler
    } = this.props;
    const { adding, newCode, newText } = this.state;

    return (
      <>
        <Segment color="green">
          <Header>Skills</Header>
          <Segment.Group>
            <Segment>
              {" "}
              {editing ? (
                <Input
                  placeholder={skillsDescription}
                  style={{ width: "100%" }}
                  value={skillsDescription}
                  name="skillsDescription"
                  onChange={e => inputHandler(e)}
                />
              ) : (
                skillsDescription
              )}
            </Segment>
            <Segment>
              <Table celled structured>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Code</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    {editing && <Table.HeaderCell>Delete</Table.HeaderCell>}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {elements && (
                    <ElementsDisplay
                      elements={elements}
                      editElementHandler={editElementHandler}
                      editing={editing}
                      deleteHandler={this.deleteHandler}
                      elementId={skillsId}
                    />
                  )}

                  {editing && !adding && (
                    <AddButton addingStateHandler={this.addingStateHandler} />
                  )}
                  {adding && editing && (
                    <AddingDisplay
                      newCode={newCode}
                      newText={newText}
                      inputHandler={this.inputHandler}
                      addingStateHandler={this.addingStateHandler}
                      addElement={this.addElement}
                    />
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
