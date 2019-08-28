import React, { Component } from "react";
import { Button, Menu, Icon, Header, Input, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import { getTasksById, createNewTask, editTask } from "../../api/index";
import TaskDisplay from "../TaskDisplay/TaskDisplay";
import { getTaskId } from "../../redux/tasks/actions";
import { connect } from "react-redux";
import { letterOptions } from "../../utils/data";

class Entry extends Component {
  state = {
    activeItem: "task",
    taskInput: false,
    taskName: "",
    taskLetter: ""
  };

  async componentDidMount() {
    let { id, name } = this.props;

    if (id === undefined) {
      id = localStorage.getItem("taskId");
    }
    if (name === undefined) {
      name = localStorage.getItem("taskName");
    }

    const results = await getTasksById({ id });
    const tasks =
      results.task.length > 0 &&
      results.task.sort((a, b) => parseFloat(a.letter) - parseFloat(b.letter));
    if (tasks.length > 0) {
      this.setState({
        tasks: tasks,
        activeItem: tasks[0].name,
        areaOfOperationId: tasks[0].area_of_operation.id,
        areaOfOperationName: tasks[0].area_of_operation.name,
        order: tasks[0].area_of_operation.order,
        numeral: tasks[0].area_of_operation.numeral
      });
    } else {
      this.setState({
        tasks: [],
        areaOfOperationId: id,
        areaOfOperationName: name
      });
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    const { areaOfOperationId, taskName, taskLetter, tasks } = this.state;

    createNewTask({
      areaOfOperationId,
      taskName,
      taskLetter
    });
    const task = { name: taskName, letter: taskLetter };
    tasks.push(task);
    this.setState({ tasks, activeItem: taskName, taskInput: false });
  };

  addTaskHandler = () => {
    this.setState({ taskInput: true });
  };

  dropdownHandler = (e, data) => {
    this.setState({ taskLetter: data.value });
  };

  getTasks = async () => {
    let { id, name } = this.props;

    if (id === undefined) {
      id = localStorage.getItem("taskId");
    }
    if (name === undefined) {
      name = localStorage.getItem("taskName");
    }

    const results = await getTasksById({ id });
    const tasks =
      results.task.length > 0 &&
      results.task.sort((a, b) => parseFloat(a.letter) - parseFloat(b.letter));
    if (tasks.length > 0) {
      this.setState({
        tasks: tasks,
        activeItem: tasks[0].name,
        areaOfOperationId: tasks[0].area_of_operation.id,
        areaOfOperationName: tasks[0].area_of_operation.name,
        order: tasks[0].area_of_operation.order,
        numeral: tasks[0].area_of_operation.numeral
      });
    } else {
      this.setState({
        tasks: [],
        areaOfOperationId: id,
        areaOfOperationName: name
      });
    }
  };
  render() {
    const {
      activeItem,
      tasks,
      taskInput,
      taskName,
      taskLetter,
      areaOfOperationName
    } = this.state;

    const taskMenu =
      tasks &&
      tasks.map(data => {
        const { name, letter } = data;
        return (
          <Menu.Item
            name={name}
            active={activeItem === name}
            onClick={this.handleItemClick}
            content={`${letter}.   ${name}`}
          />
        );
      });

    const taskDisplay =
      tasks &&
      tasks.map(data => {
        const {
          resources,
          name,
          knowledge_description,
          skills_description,
          risk_management_description,
          objective,
          elements,
          id,
          letter
        } = data;
        if (activeItem === name) {
          return (
            <TaskDisplay
              resources={resources}
              name={name}
              knowledgeDescription={knowledge_description}
              skillsDescription={skills_description}
              riskManagementDescription={risk_management_description}
              objective={objective}
              elements={elements}
              taskId={id}
              letter={letter}
              getTasks={this.getTasks}
            />
          );
        }
      });

    return (
      <Container>
        <MenuContainer>
          <Header>{areaOfOperationName}</Header>
          <Menu pointing vertical>
            {taskMenu}
            {taskInput && (
              <Menu.Item
                name="new"
                active={true}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100px"
                }}
              >
                <Dropdown
                  placeholder="A"
                  scrolling
                  options={letterOptions}
                  value={taskLetter}
                  name="taskLetter"
                  onChange={(e, data) => this.dropdownHandler(e, data)}
                />
                <Input
                  onChange={e => this.inputHandler(e)}
                  name="taskName"
                  value={taskName}
                  style={{ marginTop: "10px" }}
                />
              </Menu.Item>
            )}
            <Menu.Menu position="right">
              <Button
                style={{
                  background: "transparent",
                  color: `${taskInput && "green"}`
                }}
                onClick={() =>
                  taskInput ? this.submitHandler() : this.addTaskHandler()
                }
              >
                <Icon name="add" />
              </Button>
            </Menu.Menu>
          </Menu>
        </MenuContainer>
        {taskDisplay}
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getTaskId
};

export default connect(
  state => state,
  mapDispatchToProps
)(Entry);

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  margin-left: 150px;
  width: 90%;
  height: 100vh;
  padding: 30px;
`;

const MenuContainer = styled.div`
  height: 100vh;
  padding: 30px;
`;
