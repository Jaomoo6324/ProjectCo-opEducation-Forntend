import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  ListItem,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Bred from "../components/Bred";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Home() {
  const { control } = useForm();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();
  const [isTrigger,setIstrigger] = useState(false)

  // const [data4, setData4] = useState();
  // const [data5, setData5] = useState();

  useEffect(() => {
    getData();
  }, [isTrigger]);

  useEffect(() => {
    combind();
  }, [data3]);

  const onDelete = (id) =>{
    axios.delete(`http://localhost:8080/student/${id}`).then((res) => console.log(res)) 
    setIstrigger(!isTrigger)
  };
  

  const getData = async () => {
    await axios.get("http://localhost:8080/student").then((res) => {
      setData1(res.data);
    });
    await axios.get("http://localhost:8080/company").then((res) => {
      setData2(res.data);
    });
    await axios.get("http://localhost:8080/coopEducation").then((res) => {
      setData3(res.data);
    });

    // await axios.get("http://localhost:8080/document").then((res) => {
    //   setData3(res.data);
    // });
    // await axios.get("http://localhost:8080/staff").then((res) => {
    //   setData4(res.data);
    // });
    // await axios.get("http://localhost:8080/major").then((res) => {
    //   setData5(res.data);
    // });
  };
  
  
  const combind = () => {
    if (data1.length > 0 && data2.length > 0 && data3.length > 0) {
      console.log("combind");
      let allList = [];
      let list = {};
      data1.forEach((item, index) => {
        list = {
          s_name: item.student_name,
          s_lastName: item.student_lastname,
          c_name: data2[index]?.company_name,
          k_name: data3[index]?.kindofwork_name,
        };
        console.log(list)
        allList.push(list);
      });
      setAllData(allList);
    }
  };

  return (
    <Box minW={"100%"}>
      <Bred />
      <Divider my={2} />
      <Box my={4}>
        <Center>
          <Heading as={"h4"} size={"md"}>
            รายการข้อมูลขอความอนุเคราะห์ผึกงานและสหกิจ
          </Heading>
        </Center>
        <Text>ชื่อผู้ใช้งาน : ผศ.ดร.สายัณห์ อุ่นนันกาศ </Text>
        <Box mt={4}>
          <form>
            <Controller
              name="search"
              defaultValue={""}
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControl>
                  <Flex alignItems={"center"}>
                    <Box maxH={"fit-content"} borderRadius={"16px"}>
                      <InputGroup>
                        <InputLeftElement>
                          <AiOutlineSearch />
                        </InputLeftElement>
                        <Input
                          value={value}
                          onChange={onChange}
                          placeholder="ค้นหาชื่อ นศ."
                          borderRadius={"16px"}
                        />
                      </InputGroup>
                    </Box>
                  </Flex>
                </FormControl>
              )}
            />
          </form>

          <Box mt={5}>
            <Table>
              <Thead bg={"green"}>
                <Tr>
                  <Th color={"#fff"} textAlign={"center"}>
                    ประเภทปฏิบัติงาน
                  </Th>
                  <Th color={"#fff"} textAlign={"center"}>
                    ชื่อสถานประกอบการ
                  </Th>
                  <Th color={"#fff"} textAlign={"center"}>
                    รายชื่อนักศึกษา
                  </Th>
                  <Th color={"#fff"} textAlign={"center"}>
                    จักการ
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {allData &&
                  allData.map((item, index) => (
                    <Tr key={index}>
                      <Td textAlign={"center"}>{item.k_name}</Td>
                      <Td textAlign={"center"}>{item.c_name}</Td>
                      <Td textAlign={"center"}>
                        {item.s_name} {item.sName}
                      </Td>
                      <Td textAlign={"center"}>
                        <Flex>
                          <Button mx={2} colorScheme="yellow" onClick={() => navigate(`/EditRequestForm/${item.id}`)}>
                              แก้ไข
                          </Button>
                          <Button 
                          colorScheme="red" 
                          className = "delete" 
                          onClick = {() => onDelete(item.id)}
                          style = {{marginLeft:"10px"}}
                          > 
                          ลบ
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
