import React, { Component } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { setTaskId } from "../../redux/tasks/actions";
import { connect } from "react-redux";

class EntryTable extends Component {
  setTaskId = id => {
    localStorage.setItem("taskId", id);
    this.props.setTaskId(id);
  };

  render() {
    const { areasOfOperation } = this.props;
    const rows = areasOfOperation.area_of_operation.map(
      ({ name, numeral, order, id }) => {
        return (
          <Table.Row>
            <Table.Cell selectable>
              {" "}
              <Link to="/entry" onClick={() => this.setTaskId(id)}>
                {order}
              </Link>
            </Table.Cell>
            <Table.Cell selectable>
              {" "}
              <Link to="/entry" onClick={() => this.setTaskId(id)}>
                {numeral}
              </Link>
            </Table.Cell>
            <Table.Cell selectable>
              {" "}
              <Link to="/entry" onClick={() => this.setTaskId(id)}>
                {name}
              </Link>
            </Table.Cell>
          </Table.Row>
        );
      }
    );
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order Number</Table.HeaderCell>
            <Table.HeaderCell>Roman Numeral</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{rows}</Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon disabled>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                {/* <Menu.Item as="a">2</Menu.Item>
              <Menu.Item as="a">3</Menu.Item>
              <Menu.Item as="a">4</Menu.Item> */}
                <Menu.Item as="a" icon disabled>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

const mapDispatchToProps = {
  setTaskId
};

export default connect(
  state => state,
  mapDispatchToProps
)(EntryTable);
