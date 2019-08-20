import React, { Component } from 'react'
import styled from "styled-components"
import { Header, Image, Segment, Sidebar } from 'semantic-ui-react'
import {getAllAreasOfOperation} from "../../api/index.js"
import EntryTable from "../EntryTable/EntryTable"

export default class Home extends Component {
  componentDidMount(){
  const data = getAllAreasOfOperation()
console.log(data)
  }
  render() {
    return (
     <Container>
                <Header as='h3'>Current Entries</Header>
                <EntryTable/>
      </Container>
    )
  }
}

const Container = styled.div`
margin-left: 10%;
width: 90%;
height: 100vh;
border: solid green 5px;
padding: 30px;
`