import React, { Component } from "react";
import { Button, Segment, Header, Input } from "semantic-ui-react";
import styled from "styled-components";
import ReferenceDisplay from "../ReferenceDisplay/ReferenceDispay";
import KnowledgeDisplay from "../KnowledgeDisplay/KnowledgeDisplay";
import RiskManagementDisplay from "../RiskManagementDisplay/RiskManagementDisplay";
import SkillsDisplay from "../SkillsDisplay/SkillsDisplay";
import { editTask, createResource, createElement } from "../../api";
export default class TaskDisplay extends Component {
  state = {
    editing: false,
    ...this.props,
    originalElements: this.props.elements,
    originalResources: this.props.resources
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    const {
      editing,
      taskId,
      knowledgeDescription,
      objective,
      riskManagementDescription,
      skillsDescription,
      elements,
      resources
    } = this.state;

    this.setState({ editing: !editing });

    editTask({
      taskId,
      knowledgeDescription,
      objective,
      riskManagementDescription,
      skillsDescription
    });

    resources &&
      resources.map(data => {
        const { id, resource } = data;
        if (id === undefined) {
          createResource({ resource, taskId });
        }
      });

    elements &&
      elements.map(data => {
        const { id, abbreviation_code, text, type } = data;
        const typeId = type.id;

        if (id === undefined) {
          createElement({
            abbreviation_code,
            text,
            element_type_id: typeId,
            task_id: taskId
          });
        }
      });
  };

  onAddingElement = params => {
    this.setState(params);
  };

  render() {
    const {
      editing,
      resourceName,
      resourceNumber,
      knowledge,
      skill,
      riskManagement,
      objective,
      knowledgeDescription,
      skillsDescription,
      riskManagementDescription,
      resources,
      elements
    } = this.state;

    return (
      <TaskContainer>
        <Button
          color={editing ? "gray" : "green"}
          onClick={() => this.setState({ editing: !editing })}
        >
          {editing ? "Cancel" : "Edit"}
        </Button>
        {editing && (
          <Button
            color="green"
            onClick={() => this.submitHandler()}
            style={{ marginLeft: "10px" }}
          >
            Submit
          </Button>
        )}
        <Segment.Group>
          <ReferenceDisplay
            resources={resources}
            editing={editing}
            inputHandler={this.inputHandler}
            resourceName={resourceName}
            resourceNumber={resourceNumber}
            currentResources={this.state.resources}
            onAddingElement={this.onAddingElement}
          />
          <Segment color="orange">
            {" "}
            <Header>Objective</Header>
            <Segment>
              {editing ? (
                <Input
                  placeholder={objective}
                  onChange={e => this.inputHandler(e)}
                  name="objective"
                  value={objective}
                  style={{ width: "100%" }}
                />
              ) : (
                objective
              )}
            </Segment>
          </Segment>
          <KnowledgeDisplay
            knowledgeDescription={knowledgeDescription}
            elements={elements}
            editing={editing}
            inputHandler={this.inputHandler}
            knowledge={knowledge}
            onAddingElement={this.onAddingElement}
          />
          <RiskManagementDisplay
            riskManagementDescription={riskManagementDescription}
            elements={elements}
            editing={editing}
            inputHandler={this.inputHandler}
            riskManagement={riskManagement}
            onAddingElement={this.onAddingElement}
          />
          <SkillsDisplay
            skill={skill}
            skillsDescription={skillsDescription}
            elements={elements}
            editing={editing}
            inputHandler={this.inputHandler}
            onAddingElement={this.onAddingElement}
          />
        </Segment.Group>
        <Button color="red" style={{ marginBottom: "20px" }} disabled>
          Delete
        </Button>
      </TaskContainer>
    );
  }
}

const TaskContainer = styled.div`
  height: 100vh;
  padding: 30px;
  @media (max-width: 1200px) {
    width: 90%;
    margin-left: 50px;
  }
  @media (max-width: 1000px) {
    width: 80%;
    margin-left: 100px;
  }
  @media (max-width: 800px) {
    width: 70%;
    margin-left: 150px;
  }
  @media (max-width: 600px) {
    width: 60%;
    margin-left: 200px;
  }
`;
