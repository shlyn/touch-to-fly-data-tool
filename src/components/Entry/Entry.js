import React, { Component } from "react";
import { Button, Menu, Icon, Header } from "semantic-ui-react";
import styled from "styled-components";
import { getTasksById, createNewTask } from "../../api/Tasks/tasks";
import TaskDisplay from "../TaskDisplay/TaskDisplay";
import { getTaskId } from "../../redux/tasks/actions";
import { connect } from "react-redux";
import { sortTasks } from "../../utils/helpers";
import TaskInput from "../Simple/TaskInput";

class Entry extends Component {
  state = {
    activeItem: "task",
    taskInput: false,
    taskName: "",
    taskLetter: ""
  };

  async componentDidMount() {
    const validated = await localStorage.getItem("validated");
    if (!validated) {
      this.props.history.push("/");
    }
    this.getTasks();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async () => {
    const { areaOfOperationId, taskName, taskLetter, tasks } = this.state;

    createNewTask({
      areaOfOperationId,
      taskName,
      taskLetter
    });
    const task = { name: taskName, letter: taskLetter };
    tasks.push(task);
    this.setState({
      tasks,
      taskInput: false,
      taskName: "",
      taskLetter: ""
    });

    setTimeout(() => this.getTasks(), 1000);
  };

  setTaskHandler = () => {
    const { taskInput } = this.state;
    this.setState({ taskInput: !taskInput });
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
    const tasks = sortTasks({ tasks: results.task });
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

  updateTasks = ({ id }) => {
    const { tasks } = this.state;
    const newTasks = tasks.filter(data => data.id !== id);
    this.setState({ tasks: newTasks, activeItem: tasks[0].name });
  };

  setActiveItem = ({ activeItem }) => {
    const { tasks } = this.state;
    this.setState({ activeItem, tasks: sortTasks({ tasks }) });
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
        const { name, letter, id } = data;
        return (
          <Menu.Item
            key={id + name}
            name={name}
            active={activeItem === name}
            onClick={this.handleItemClick}
            content={`${letter}.   ${name}`}
            disabled={taskInput}
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
              key={id + name}
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
              updateTasks={this.updateTasks}
              setActiveItem={this.setActiveItem}
            />
          );
        } else {
          return null;
        }
      });

    return (
      <Container>
        <MenuContainer>
          <Header>{areaOfOperationName}</Header>
          <Menu pointing vertical>
            {taskMenu}
            {taskInput && (
              <TaskInput
                taskLetter={taskLetter}
                taskName={taskName}
                dropdownHandler={this.dropdownHandler}
                inputHandler={this.inputHandler}
                setTaskHandler={this.setTaskHandler}
              />
            )}
            <Menu.Menu position="right">
              <Button
                style={{
                  background: "transparent",
                  color: `${taskInput ? "green" : "grey"}`
                }}
                onClick={() =>
                  taskInput ? this.submitHandler() : this.setTaskHandler()
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

export default connect(state => state, mapDispatchToProps)(Entry);

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
