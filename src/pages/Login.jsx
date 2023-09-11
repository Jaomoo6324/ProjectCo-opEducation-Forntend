import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login({ isLogin, setUser, setIsLogin }) {
  console.log(isLogin);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const [logins, setLogins] = useState();
  //functions
  const login = (data) => {
    const email = data.email;
    const password = data.password;
    const cPassword = data.cPassword;
    console.log(data);

    if (password === cPassword) {
      axios
        .get("http://localhost:8080/user")
        .then((res) => {
          let user = "";
          const users = res.data;
          users.forEach((item) => {
            if (item.email === email && password === item.password) {
              user = email;
            }
          });
          if (user !== "") {
            setUser(user);
            setIsLogin(true);
            toast({
              position: "top",
              title: "Login สำเร็จ.",
              description: "กำลังเข้าสู่ระบบ",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            navigate("/");
          } else {
            toast({
              position: "top",
              title: "Login ผิดพลาด.",
              description: "รหัสผ่านหรืออัเมลไม่ถูกต้อง",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      toast({
        position: "top",
        title: "Login ผิดพลาด.",
        description: "รหัสผ่านไม่ตรงกัน",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Container mt={5} maxW={"container.md"}>
      <Flex>
        <Box
          minW={"50%"}
          minH={"50vh"}
          pt={20}
          bg={"green.300"}
          textAlign={"center"}
        >
          <Text fontWeight={"bold"} fontSize={"48px"}>
            Loggin
          </Text>
          <Text>เพื่อเข้าสู่ระบบ</Text>
        </Box>
        <Box
          minW={"50%"}
          minH={"50vh"}
          border={"2px solid green"}
          textAlign={"center"}
          p={5}
        >
          <form onSubmit={handleSubmit(login)}>
            <Controller
              name="email"
              control={control}
              defaultValue={""}
              rules={{ required: true }}
              render={({ field: { value, name, onChange } }) => (
                <FormControl my={5} isInvalid={errors[name]}>
                  <FormLabel>
                    <Flex>
                      <Text>อีเมล</Text>
                      <Text color={"red"}>*</Text>
                    </Flex>
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="AAA@gmail.com"
                    value={value}
                    onChange={onChange}
                  />
                </FormControl>
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue={""}
              rules={{ required: true }}
              render={({ field: { value, name, onChange } }) => (
                <FormControl my={5} isInvalid={errors[name]}>
                  <FormLabel>
                    <Flex>
                      <Text>รหัสผ่าน</Text>
                      <Text color={"red"}>*</Text>
                    </Flex>
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="รหัสผ่าน"
                    value={value}
                    onChange={onChange}
                  />
                </FormControl>
              )}
            />
            <Controller
              name="cPassword"
              control={control}
              defaultValue={""}
              rules={{ required: true }}
              render={({ field: { value, name, onChange } }) => (
                <FormControl my={5} isInvalid={errors[name]}>
                  <FormLabel>
                    <Flex>
                      <Text>ยืนยันรหัสผ่าน</Text>
                      <Text color={"red"}>*</Text>
                    </Flex>
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="ยืนยันรหัสผ่าน"
                    value={value}
                    onChange={onChange}
                  />
                </FormControl>
              )}
            />
            <Center>
              <Button colorScheme="green" type="submit">
                เข้าสู่ระบบ
              </Button>
            </Center>
          </form>
        </Box>
      </Flex>
    </Container>
  );
}

export default Login;
