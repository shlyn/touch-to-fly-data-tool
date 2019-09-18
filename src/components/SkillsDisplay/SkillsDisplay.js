import React, { Component } from "react";
import { skillsId } from "../../utils/data";
import { Segment, Header, Table, Input } from "semantic-ui-react";
import { deleteElement } from "../../api/Elements/elements";
import AddingDisplay from "../Simple/AddingDisplay";
import ElementsDisplay from "../Simple/ElementsDisplay";
import AddButton from "../Simple/AddButton";

export default class SkillsDisplay extends Component {
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
      skillsDescription,
      elements,
      editing,
      inputHandlerCode,
      inputHandlerDescription,
      removeInput,
      editElementHandler,
      addElementInput,
      inputHandler
    } = this.props;

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

                  {elements && editing && (
                    <AddingDisplay
                      elements={elements}
                      inputHandlerCode={inputHandlerCode}
                      inputHandlerDescription={inputHandlerDescription}
                      elementId={skillsId}
                      removeInput={removeInput}
                    />
                  )}
                  {editing && (
                    <AddButton
                      addElementInput={addElementInput}
                      elementId={skillsId}
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
