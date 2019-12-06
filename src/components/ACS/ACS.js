import React, { Component } from "react";
import styled from "styled-components";
import { Header } from "semantic-ui-react";
import { getACS, editACS } from "../../api/ACS/ACS";
import ACSTable from "../ACSTable/ACSTable";
import SuccessMessage from "../Simple/SuccessMessage";

export default class Entries extends Component {
  state = { editing: false, success: false };

  async componentDidMount() {
    const results = await getACS();
    const ACS = results.airman_certification_standards.sort(
      (a, b) => parseFloat(a.order) - parseFloat(b.order)
    );
    this.setState({ ACS });
  }

  updateACSHandler = ({ id, name }) => {
    editACS({ id, name });
  };

  editACS = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  getACS = async () => {
    const results = await getACS();
    const ACS = results.airman_certification_standards.sort(
      (a, b) => parseFloat(a.order) - parseFloat(b.order)
    );
    return ACS;
  };

  updateACS = ({ id }) => {
    const { ACS } = this.state;
    const newACS = ACS.filter(data => data.id !== id);
    this.setState({ ACS: newACS });
    return newACS;
  };

  successHandler = () => {
    this.setState({ success: true });
    setTimeout(() => this.setState({ success: false }), 2000);
  };

  render() {
    const { ACS, editing, success } = this.state;
    console.log(ACS);
    return (
      <Container>
        <Header as="h3">Current Areas Of Operation</Header>
        <SuccessMessage success={success} />
        {ACS && (
          <ACSTable
            airmenCertificationStandards={ACS}
            editing={editing}
            updateACSHandler={this.updateACSHandler}
            editHandler={this.editACS}
            getACS={this.getACS}
            updateACS={this.updateACS}
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
