import React, { Component } from "react";
import { Button, Segment, Header, Input } from "semantic-ui-react";
import styled from "styled-components";
import ReferenceDisplay from "../ReferenceDisplay/ReferenceDispay";
import KnowledgeDisplay from "../KnowledgeDisplay/KnowledgeDisplay";
import RiskManagementDisplay from "../RiskManagementDisplay/RiskManagementDisplay";
import SkillsDisplay from "../SkillsDisplay/SkillsDisplay";
import {
  editTask,
  createResource,
  createElement,
  deleteTask,
  editElement,
  editResource
} from "../../api";
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
      resources,
      name,
      letter
    } = this.state;

    this.setState({ editing: !editing });

    editTask({
      taskId,
      knowledgeDescription,
      objective,
      riskManagementDescription,
      skillsDescription,
      name,
      letter
    });

    resources &&
      resources.map(data => {
        const { id, resource, updated, addition, resource_id } = data;
        if (addition === true && updated !== true) {
          createResource({ resource, taskId, id });
        } else if (updated === true) {
          editResource({ resource_id, resource });
        }
      });

    elements &&
      elements.map(data => {
        const { id, abbreviation_code, text, type, updated, addition } = data;
        const typeId = type.id;

        if (addition === true && updated !== true) {
          createElement({
            abbreviation_code,
            text,
            element_type_id: typeId,
            task_id: taskId,
            id
          });
        } else if (updated === true) {
          editElement({ id, text, abbreviation_code });
        }
      });
  };

  onAddingElement = params => {
    this.setState(params);
  };

  cancelHandler = async ({ taskName }) => {
    const { getTasks, setActiveItem } = this.props;
    const { editing } = this.state;
    await getTasks();
    this.setState({ ...this.props, editing: !editing });
    setActiveItem({ activeItem: taskName });
  };

  deleteHandler = () => {
    const { updateTasks } = this.props;
    const { taskId, name } = this.state;
    const result = window.confirm(`Are you sure you want to delete ${name}?`);
    if (result === true) {
      updateTasks({ id: taskId });
      deleteTask({ id: taskId });
    }
  };

  editElementHandler = ({ e, id }) => {
    const { elements } = this.state;
    elements.map((data, i) => {
      if (data.id === id) {
        elements[i][e.target.name] = e.target.value;
        elements[i].updated = true;
        this.setState({ elements });
      }
    });
  };

  editResourceHandler = ({ e, id }) => {
    const { resources } = this.state;
    resources.map((data, i) => {
      if (data.id === id) {
        resources[i].resource[e.target.name] = e.target.value;
        resources[i].updated = true;
        this.setState({ resources });
      }
    });
  };

  updateElements = ({ id }) => {
    const { elements } = this.state;
    const newElements = elements.filter(data => data.id !== id);
    this.setState({ elements: newElements });
  };

  updateResources = ({ id }) => {
    const { resources } = this.state;
    const newResources = resources.filter(data => data.id !== id);
    this.setState({ resources: newResources });
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
      elements,
      name,
      letter
    } = this.state;
    console.log(letter);
    const headerInputs = (
      <>
        <Container>
          <Input
            placeholder={letter}
            name="letter"
            value={letter}
            onChange={e => this.inputHandler(e)}
            style={{ width: "5%" }}
          />
          <Input
            placeholder={name}
            name="name"
            value={name}
            onChange={e => this.inputHandler(e)}
            style={{ marginLeft: "5px" }}
          />
        </Container>
      </>
    );
    return (
      <TaskContainer>
        <Button
          color={editing ? "gray" : "green"}
          onClick={() =>
            editing
              ? this.cancelHandler({ taskName: name })
              : this.setState({ editing: !editing })
          }
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
        {editing ? (
          headerInputs
        ) : (
          <Header as="h3">{`${letter}.   ${name}`}</Header>
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
            editResourceHandler={this.editResourceHandler}
            updateResources={this.updateResources}
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
            editElementHandler={this.editElementHandler}
            updateElements={this.updateElements}
          />
          <RiskManagementDisplay
            riskManagementDescription={riskManagementDescription}
            elements={elements}
            editing={editing}
            inputHandler={this.inputHandler}
            riskManagement={riskManagement}
            onAddingElement={this.onAddingElement}
            editElementHandler={this.editElementHandler}
            updateElements={this.updateElements}
          />
          <SkillsDisplay
            skill={skill}
            skillsDescription={skillsDescription}
            elements={elements}
            editing={editing}
            inputHandler={this.inputHandler}
            onAddingElement={this.onAddingElement}
            editElementHandler={this.editElementHandler}
            updateElements={this.updateElements}
          />
        </Segment.Group>
        <Button
          color="red"
          style={{ marginBottom: "20px" }}
          onClick={() => this.deleteHandler()}
        >
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

const Container = styled.div`
  padding-top: 10px;
`;
