import React, { Component } from "react";
import { Button, Segment, Header, Input } from "semantic-ui-react";
import styled from "styled-components";
import ReferenceDisplay from "../ReferenceDisplay/ReferenceDisplay";
import KnowledgeDisplay from "../KnowledgeDisplay/KnowledgeDisplay";
import RiskManagementDisplay from "../RiskManagementDisplay/RiskManagementDisplay";
import SkillsDisplay from "../SkillsDisplay/SkillsDisplay";
import HeaderInputs from "../Simple/HeaderInputs";
import SuccessMessage from "../Simple/SuccessMessage";
import { editTask, deleteTask } from "../../api/Tasks/tasks";
import { createResource, editResource } from "../../api/Resources/resources";
import { createElement, editElement } from "../../api/Elements/elements";
import { updateTask } from "../../utils/helpers";
const uuidv4 = require("uuid/v4");

export default class TaskDisplay extends Component {
  state = {
    editing: false,
    ...this.props,
    success: false
  };

  stateChanges = ({ changes }) => {
    this.setState(changes);
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    updateTask({
      state: this.state,
      editTask,
      stateChanges: this.stateChanges,
      createResource,
      editResource,
      createElement,
      editElement
    });
  };

  onAddingElement = params => {
    this.setState(params);
  };

  cancelHandler = async ({ taskName }) => {
    const { setActiveItem } = this.props;

    await this.resetTasks();
    setActiveItem({ activeItem: taskName });
  };

  resetTasks = async () => {
    const { getTasks } = this.props;
    const { editing } = this.state;
    await getTasks();
    this.setState({
      ...this.props,
      editing: !editing
    });
  };

  deleteHandler = () => {
    const { updateTasks } = this.props;
    const { taskId, name } = this.state;
    const result = window.confirm(`Are you sure you want to delete ${name}?`);
    if (result === true) {
      updateTasks({ id: taskId });
      deleteTask({ id: taskId });
    }
    return null;
  };

  editElementHandler = ({ e, id }) => {
    const { elements } = this.state;
    elements.map((data, i) => {
      if (data.id === id) {
        elements[i][e.target.name] = e.target.value;
        elements[i].updated = true;
        this.setState({ elements });
      }
      return null;
    });
    return null;
  };

  editSubElementHandler = ({ e, i, mainId }) => {
    console.log("editSubElementHandler");
    const { elements } = this.state;
    const index = i;
    elements.map((data, i) => {
      let { sub_elements } = data;
      if (data.id === mainId) {
        sub_elements[index][e.target.name] = e.target.value;
        sub_elements[index].updated = true;
        this.setState({ elements });
      }
      return null;
    });
    return null;
  };

  editResourceHandler = ({ e, id }) => {
    const { resources } = this.state;
    resources.map((data, i) => {
      if (data.id === id) {
        resources[i].resource[e.target.name] = e.target.value;
        resources[i].updated = true;
        this.setState({ resources });
      }
      return null;
    });
  };

  updateElements = ({ id }) => {
    const { elements } = this.state;
    const newElements = elements.filter(data => data.id !== id);
    this.setState({ elements: newElements });
  };

  updateSubElements = ({ id }) => {
    const { elements } = this.state;
    elements.map((data, i) => {
      const { sub_elements } = data;
      const newSubElements = sub_elements.filter(data => data.id !== id);
      elements[i].sub_elements = newSubElements;
    });

    this.setState({ elements });
  };

  updateResources = ({ id }) => {
    const { resources } = this.state;
    const newResources = resources.filter(data => data.id !== id);
    this.setState({ resources: newResources });
  };

  addElementInput = ({ element_id }) => {
    const id = uuidv4();
    const { elements } = this.state;
    const element = {
      type: { id: element_id },
      id,
      addition: true,
      sub_elements: []
    };
    elements.push(element);
    this.setState({ elements });
  };

  inputHandlerCodeSub = ({ e, i, mainId }) => {
    console.log("inputHandlerCodeSub");
    const index = i;
    const { elements } = this.state;
    elements.map((data, i) => {
      let { sub_elements, id } = data;

      if (id === mainId) {
        sub_elements[index].abbreviation_code = e.target.value;
      }
    });

    this.setState({ elements });
  };

  inputHandlerDescriptionSub = ({ e, i, mainId }) => {
    const index = i;
    const { elements } = this.state;
    elements.map((data, i) => {
      let { sub_elements, id } = data;
      if (id === mainId) {
        sub_elements[index].text = e.target.value;
      }
    });

    this.setState({ elements });
  };

  inputHandlerCode = ({ e, i }) => {
    let { elements } = this.state;
    elements[i].abbreviation_code = e.target.value;
    this.setState({ elements });
  };

  inputHandlerDescription = ({ e, i }) => {
    let { elements } = this.state;
    elements[i].text = e.target.value;
    this.setState({ elements });
  };

  removeInput = ({ i }) => {
    const { elements } = this.state;
    const index = i;
    const newElements = elements.filter((data, i) => {
      return i !== index;
    });
    this.setState({ elements: newElements });
  };

  addSubElement = ({ id }) => {
    const subId = uuidv4();
    const { elements } = this.state;
    console.log(id, elements);
    elements.map((data, i) => {
      let { sub_elements } = data;
      if (data.id === id) {
        console.log("MATCH");
        sub_elements.push({
          abbreviation_code: "",
          id: subId,
          text: "",
          addition: true
        });
      }
    });
    this.setState({ elements });
  };

  removeInputSub = ({ i, mainId }) => {
    const { elements } = this.state;
    const index = i;

    elements.map((data, i) => {
      let { sub_elements } = data;
      const newSubElements = sub_elements.filter((data, i) => {
        return i !== index;
      });
      elements[i].sub_elements = newSubElements;
    });
    this.setState({ elements });
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
      letter,
      success
    } = this.state;
    console.log(this.state);

    return (
      <TaskContainer>
        <Button
          color={editing ? "grey" : "green"}
          onClick={() =>
            editing
              ? this.cancelHandler({ taskName: name })
              : this.setState({ editing: !editing })
          }
        >
          {editing ? "Done" : "Edit"}
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
        <SuccessMessage success={success} />
        {editing ? (
          <HeaderInputs
            name={name}
            letter={letter}
            inputHandler={this.inputHandler}
          />
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
            inputHandlerCode={this.inputHandlerCode}
            inputHandlerDescription={this.inputHandlerDescription}
            inputHandlerCodeSub={this.inputHandlerCodeSub}
            inputHandlerDescriptionSub={this.inputHandlerDescriptionSub}
            editElementHandler={this.editElementHandler}
            editSubElementHandler={this.editSubElementHandler}
            updateElements={this.updateElements}
            addElementInput={this.addElementInput}
            removeInput={this.removeInput}
            addSubElement={this.addSubElement}
            removeInputSub={this.removeInputSub}
            updateSubElements={this.updateSubElements}
          />
          <RiskManagementDisplay
            riskManagementDescription={riskManagementDescription}
            elements={elements}
            editing={editing}
            inputHandler={this.inputHandler}
            inputHandlerCode={this.inputHandlerCode}
            inputHandlerDescription={this.inputHandlerDescription}
            inputHandlerCodeSub={this.inputHandlerCodeSub}
            inputHandlerDescriptionSub={this.inputHandlerDescriptionSub}
            editElementHandler={this.editElementHandler}
            updateElements={this.updateElements}
            addElementInput={this.addElementInput}
            removeInput={this.removeInput}
            addSubElement={this.addSubElement}
            removeInputSub={this.removeInputSub}
            updateSubElements={this.updateSubElements}
          />
          <SkillsDisplay
            skillsDescription={skillsDescription}
            elements={elements}
            editing={editing}
            inputHandler={this.inputHandler}
            inputHandlerCode={this.inputHandlerCode}
            inputHandlerDescription={this.inputHandlerDescription}
            inputHandlerCodeSub={this.inputHandlerCodeSub}
            inputHandlerDescriptionSub={this.inputHandlerDescriptionSub}
            editElementHandler={this.editElementHandler}
            updateElements={this.updateElements}
            addElementInput={this.addElementInput}
            removeInput={this.removeInput}
            addSubElement={this.addSubElement}
            removeInputSub={this.removeInputSub}
            updateSubElements={this.updateSubElements}
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
