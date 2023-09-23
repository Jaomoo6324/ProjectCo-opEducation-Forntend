import {
  Box,
  Button,
  Center,
  Divider,
  MenuDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SideBar({ setIsLogin }) {
  const navigate = useNavigate();
  const toast = useToast()

  //functions
  const logOut = () => {
    setIsLogin(false);
    navigate("/login");
    toast({
      position:"top",
      title: 'ออกจากระบบสำเร็จ',
      description: "กำลังออกจากระบบ",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })

  };
  return (
    <Box border={"1px"} minH={"100vh"} minW={"100%"}>
      
      <Link to={"/homeCourse"}>
        <Text p={2} bg={"gray.200"}>
          หน้าหลัก
        </Text>
      </Link>

      <Divider />
      <Link to={"/request"}>
        <Text p={2}>กรอกแบบฟอร์มขอความอนุเคราะห์</Text>
      </Link>

      <Divider />
      <Link to={"/sendStudent"}>
        <Text p={2}>กรอกแบบฟอร์มส่งตัวนักศึกษา</Text>
      </Link>

      <Divider />
      <Link to={"/listRequest"}>
        <Text p={2}>รายการข้อมูลความอนุเคราะห์</Text>
      </Link>

      <Divider />
      <Link to={"/listSendStudent"}>
        <Text p={2}>รายการข้อมูลส่งตัวนักศึกษา</Text>
      </Link>

      <Divider />
      <Link to={"/listStatus"}>
        <Text p={2}>ดูสถานะ</Text>
      </Link>

      <Divider />
      <Center mt={2}>
        <Button onClick={() => logOut()} bg={"red.200"}>
          ออกจากระบบ
        </Button>
      </Center>
    </Box>
  );
}

export default SideBar;
