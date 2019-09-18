import React, { Component } from "react";
import { Segment, Header, Table, Input } from "semantic-ui-react";
import { knowledgeId } from "../../utils/data";
import { deleteElement } from "../../api/Elements/elements";
import AddingDisplay from "../Simple/AddingDisplay";
import ElementsDisplay from "../Simple/ElementsDisplay";
import AddButton from "../Simple/AddButton";

export default class KnowledgeDisplay extends Component {
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
      knowledgeDescription,
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
        <Segment color="blue">
          <Header>Knowledge</Header>
          <Segment.Group>
            <Segment>
              {editing ? (
                <Input
                  placeholder={knowledgeDescription}
                  style={{ width: "100%" }}
                  value={knowledgeDescription}
                  name="knowledgeDescription"
                  onChange={e => inputHandler(e)}
                />
              ) : (
                knowledgeDescription
              )}
            </Segment>
            <Segment>
              <Table celled structured>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Code</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    {editing && (
                      <>
                        <Table.HeaderCell>Add Sub Element</Table.HeaderCell>{" "}
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                      </>
                    )}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {elements && (
                    <ElementsDisplay
                      elements={elements}
                      editElementHandler={editElementHandler}
                      editing={editing}
                      deleteHandler={this.deleteHandler}
                      elementId={knowledgeId}
                    />
                  )}
                  {elements && editing && (
                    <AddingDisplay
                      elements={elements}
                      inputHandlerCode={inputHandlerCode}
                      inputHandlerDescription={inputHandlerDescription}
                      elementId={knowledgeId}
                      removeInput={removeInput}
                    />
                  )}
                  {editing && (
                    <AddButton
                      addElementInput={addElementInput}
                      elementId={knowledgeId}
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
