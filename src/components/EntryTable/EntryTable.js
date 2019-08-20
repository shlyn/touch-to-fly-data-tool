import React from "react";
import { Icon, Label, Menu, Table } from "semantic-ui-react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { getTasksById } from "../../api";

const EntryTable = ({ areasOfOperation }) => {
  console.log(areasOfOperation);
  const rows = areasOfOperation.area_of_operation.map(
    ({ name, numeral, order }) => {
      return (
        <Table.Row selectable>
          <Table.Cell selectable>
            {" "}
            <Link to="/entry">{order}</Link>
          </Table.Cell>
          <Table.Cell selectable>
            {" "}
            <a href="#">{numeral}</a>
          </Table.Cell>
          <Table.Cell selectable>
            {" "}
            <a href="#">{name}</a>
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
              <Menu.Item as="a" icon>
                <Icon name="chevron left" />
              </Menu.Item>
              <Menu.Item as="a">1</Menu.Item>
              <Menu.Item as="a">2</Menu.Item>
              <Menu.Item as="a">3</Menu.Item>
              <Menu.Item as="a">4</Menu.Item>
              <Menu.Item as="a" icon>
                <Icon name="chevron right" />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default EntryTable;
