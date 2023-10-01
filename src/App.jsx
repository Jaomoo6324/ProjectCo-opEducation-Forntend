import { Box, Center, Container, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Request from "./pages/FormRequest";
import FormSendStudent from "./pages/FormSendStudent";
import ListRequest from "./pages/ListRequest";
import ListSendStudent from "./pages/ListSendStudent";
import ListStatus from "./pages/ListStatus";
import Login from "./pages/Login";
import EditRequestForm from "./pages/EditRequestForm";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user,setUser] = useState()
  const navigate = useNavigate()
  //useEffect
  useEffect(() => {
    if(!isLogin){
      navigate('/login')
    }
  },[])
  return (
    <Container maxW={"container.lg"}>
      <Center>
        <Heading
          minW={"100%"}
          textAlign={"center"}
          bg={"green"}
          py={5}
          color={"#fff"}
        >
          ระบบสหกิจศึกษา
        </Heading>
      </Center>

      <Flex>
        {isLogin && (
          <Box>
            <SideBar setIsLogin={setIsLogin} />
          </Box>
        )}
        <Box ml={4} w={"100%"}>
          <Routes>
            {isLogin ? (
              <>
                <Route path="/homeCourse" element={<Home />} />
                <Route path="/request" element={<Request />} />
                <Route path="/sendStudent" element={<FormSendStudent />} />
                <Route path="/listRequest" element={<ListRequest />} />
                <Route path="/listSendStudent" element={<ListSendStudent />} />
                <Route path="/listStatus" element={<ListStatus />} />
                <Route path="/EditRequestForm/:id" element={<EditRequestForm />} />

              </>
            ) : (
              <Route path="/login" element={<Login isLogin={isLogin} setUser={setUser} setIsLogin={setIsLogin} />} />
            )}
          </Routes>

        </Box>
      </Flex>
    </Container>
  );
}

export default App;
