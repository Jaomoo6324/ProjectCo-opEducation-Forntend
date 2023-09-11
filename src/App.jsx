import { Box, Center, Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Request from "./pages/FormRequest";
import FormSendStudent from "./pages/FormSendStudent";
import ListRequest from "./pages/ListRequest";
import ListSendStudent from "./pages/ListSendStudent";
import ListStatus from "./pages/ListStatus";

function App() {
  return (
    <Container maxW={"container.lg"}>
      <Center>
        <Heading minW={'100%'} textAlign={'center'} bg={'green'} py={5} color={'#fff'}>ระบบสหกิจศึกษา</Heading>
      </Center>

      <Flex>
        <Box>
          <SideBar />
        </Box>
        <Box ml={4} w={'100%'} >
          <Routes>
            {/* <Route path="/" element={<Login />}/> */}
            <Route path="/homeCourse" element={<Home />}/>
            <Route path="/request" element={<Request />}/>
            <Route path="/sendStudent" element={<FormSendStudent />}/>
            <Route path="/listRequest" element={<ListRequest />}/>
            <Route path="/listSendStudent" element={<ListSendStudent />}/>
            <Route path="/listStatus" element={<ListStatus />}/>
            {/* <Route path="/HomFaculty" element={<HomeFaculty />}/> */}
          </Routes>

        </Box>
      </Flex>
    </Container>
  );
}

export default App;
