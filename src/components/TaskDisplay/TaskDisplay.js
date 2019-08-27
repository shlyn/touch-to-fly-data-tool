import React, { Component } from "react";
import { Button, Segment, Header, Table, Input } from "semantic-ui-react";
import styled from "styled-components";
import { skillsId } from "../../utils/data";
import ReferenceDisplay from "../ReferenceDisplay/ReferenceDispay";
import KnowledgeDisplay from "../KnowledgeDisplay/KnowledgeDisplay";
import RiskManagementDisplay from "../RiskManagementDisplay/RiskManagementDisplay";
import SkillsDisplay from "../SkillsDisplay/SkillsDisplay";
import { editTask } from "../../api";
export default class TaskDisplay extends Component {
  state = { editing: false, ...this.props };

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
  };

  render() {
    const {
      resources,
      knowledgeDescription,
      skillsDescription,
      riskManagementDescription,
      objective,
      elements,
      taskId
    } = this.props;
    const { editing } = this.state;
    console.log(this.state);

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
            currentResources={this.state.resources}
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
                  value={this.state.objective}
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
          />
          <RiskManagementDisplay
            riskManagementDescription={riskManagementDescription}
            elements={elements}
            editing={editing}
            inputHandler={this.inputHandler}
          />
          <SkillsDisplay
            skillsDescription={skillsDescription}
            elements={elements}
            editing={editing}
            inputHandler={this.inputHandler}
          />
        </Segment.Group>
        <Button color="red" style={{ marginBottom: "20px" }}>
          Delete
        </Button>
      </TaskContainer>
    );
  }
}

const TaskContainer = styled.div`
  height: 100vh;
  padding: 30px;
`;
