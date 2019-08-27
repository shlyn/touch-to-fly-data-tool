import React, { Component } from "react";
import { Button, Segment, Header, Table, Icon } from "semantic-ui-react";
import { riskManagementId } from "../../utils/data";
export default class RiskManagementDisplay extends Component {
  render() {
    const { elements, riskManagementDescription, editing } = this.props;

    const riskManagementDisplay = elements.map(data => {
      const { text, abbreviation_code, type } = data;
      if (type.id === riskManagementId) {
        return (
          <Table.Row>
            <Table.Cell>{abbreviation_code}</Table.Cell>
            <Table.Cell>{text}</Table.Cell>
          </Table.Row>
        );
      }
    });

    return (
      <>
        <Segment color="yellow">
          <Header>Risk Management</Header>
          <Segment.Group>
            <Segment>{riskManagementDescription}</Segment>
            <Segment>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Code</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>{riskManagementDisplay}</Table.Body>
                {editing && (
                  <Button
                    style={{ background: "transparent" }}
                    onClick={() => this.setState({})}
                  >
                    <Icon name="add" />
                  </Button>
                )}
              </Table>
            </Segment>
          </Segment.Group>
        </Segment>
      </>
    );
  }
}
