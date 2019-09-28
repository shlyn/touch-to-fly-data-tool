import React, { Component } from "react";
import styled from "styled-components";
import { Header } from "semantic-ui-react";
import { getAllResources, editResource } from "../../api/Resources/resources";
import SuccessMessage from "../Simple/SuccessMessage";
import ResourcesTable from "./ResourcesTable";

export default class Resources extends Component {
  state = { editing: false, success: false };

  async componentDidMount() {
    this.setState({ resources: await this.getResources() });
  }

  updateResourceHandler = ({ resource_id, documentNumber, documentName }) => {
    editResource({ resource_id, documentNumber, documentName });
  };

  editHandler = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  getResources = async () => {
    const resources = await getAllResources();
    // const areasOfOperation = results.area_of_operation.sort(
    //   (a, b) => parseFloat(a.order) - parseFloat(b.order)
    // );
    return resources.resources;
  };

  updateResources = ({ id, resources }) => {
    const newResources = resources.filter(data => data.id !== id);
    this.setState({ resources: newResources });
    return newResources;
  };

  successHandler = () => {
    this.setState({ success: true });
    setTimeout(() => this.setState({ success: false }), 2000);
  };

  render() {
    const { resources, editing, success } = this.state;
    console.log(success);
    return (
      <Container>
        <Header as="h3">Current Resources</Header>
        <SuccessMessage success={success} />
        {resources && (
          <ResourcesTable
            resources={resources}
            editing={editing}
            updateResourceHandler={this.updateResourceHandler}
            editHandler={this.editHandler}
            getResources={this.getResources}
            updateResources={this.updateResources}
            successHandler={this.successHandler}
          />
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  margin-left: 150px;
  width: 90%;
  height: 100vh;
  padding: 30px;
`;
