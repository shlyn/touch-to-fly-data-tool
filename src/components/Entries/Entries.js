import React, { Component } from "react";
import styled from "styled-components";
import { Header } from "semantic-ui-react";
import {
  getAllAreasOfOperation,
  editAreaOfOperation
} from "../../api/AreasOfOperation/areasOfOperation";
import EntryTable from "../EntryTable/EntryTable";
import SuccessMessage from "../Simple/SuccessMessage";

export default class Entries extends Component {
  state = { editing: false, success: false };

  async componentDidMount() {
    const results = await getAllAreasOfOperation();
    const areasOfOperation = results.area_of_operation.sort(
      (a, b) => parseFloat(a.order) - parseFloat(b.order)
    );
    this.setState({ areasOfOperation });
  }

  updateAOOHandler = ({ id, order, numeral, name }) => {
    editAreaOfOperation({ id, order, numeral, name });
  };

  editHandler = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  getAreasOfOperation = async () => {
    const results = await getAllAreasOfOperation();
    const areasOfOperation = results.area_of_operation.sort(
      (a, b) => parseFloat(a.order) - parseFloat(b.order)
    );
    return areasOfOperation;
  };

  updateAreasOfOperation = ({ id }) => {
    const { areasOfOperation } = this.state;
    const newAreasOfOperation = areasOfOperation.filter(data => data.id !== id);
    this.setState({ areasOfOperation: newAreasOfOperation });
    return newAreasOfOperation;
  };

  successHandler = () => {
    this.setState({ success: true });
    setTimeout(() => this.setState({ success: false }), 2000);
  };

  render() {
    const { areasOfOperation, editing, success } = this.state;

    return (
      <Container>
        <Header as="h3">Current Areas Of Operation</Header>
        <SuccessMessage success={success} />
        {areasOfOperation && (
          <EntryTable
            areasOfOperation={areasOfOperation}
            editing={editing}
            updateAOOHandler={this.updateAOOHandler}
            editHandler={this.editHandler}
            getAreasOfOperation={this.getAreasOfOperation}
            updateAreasOfOperation={this.updateAreasOfOperation}
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
