import React, { Component } from 'react'
import styled from "styled-components"
 
export default class Entries extends Component {
    render() {
        return (
            <Container>
            {/* <SideBar/> */}
               <div>these are my existing entries</div> 
            </Container>
        )
    }
}



const Container = styled.div`
margin-left: 10%;
width: 90%;
height: 100vh;
`