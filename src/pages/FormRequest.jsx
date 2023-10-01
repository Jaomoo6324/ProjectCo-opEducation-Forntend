import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Bred from "../components/Bred";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Request() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  useEffect(() => {
    setValue("yearcoop",new Date().getFullYear()+543);

  }, []);

  const submitData = async (data) => {
    setIsLoading(true);
    const student = {
      student_name: data.firstName,
      student_lastname: data.lastName,
      student_id: data.studentId,
      student_phone_no: data.phoneStudent,
      student_email: data.emailStudent,
    };
    const company = {
      company_name: data.namecompany,
      company_address: data.addresscompany,
      company_phone_no: data.phonecompany,
      company_email: data.emailcompany,
      company_line: data.linecompany,
      company_facebook: data.facebookcompany,
    };
    // const document = {
    //   doc_name: data.namedocument,
    //   doc_upload_date: data.uploaddate,
    //   // d_branch: data.major,
    //   // d_coopYear: data.coopYear,
    //   // d_term: data.term,
    //   // d_start_date: data.dateStart,
    //   // d_end_date: data.dateEnd,
    //   // d_type: data.type,
    // };
    const coopEducation = {
      coop_name: data.namecoop,
      coop_year: data.yearcoop,
      coop_term: data.termcoop,
      coop_start_date: data.startdatecoop,
      coop_end_date: data.enddatecoop,
      status: data.statuscoop,
      kindofwork_name: data.kindofworkname,
    };
    // const staff = {
    //   staff_name: data.namestaff,
    //   staff_lastname: data.lastnamestaff,
    //   staff_phone_no: data.phonenostaff,
    //   staff_role: data.role,
    //   staff_email: data.email,
    //   staff_password: data.password,
    // };
    const major = {
      major_name: data.major,
    };

    // const history = useHistor();
    // const {id} = useParams();

    if(id){
      await axios.post("http://localhost:8080/student", student);
      await axios.post("http://localhost:8080/company", company);
       // await axios.post("http://localhost:8080/document", document);
      await axios.post("http://localhost:8080/coopEducation", coopEducation);
      // await axios.post("http://localhost:8080/staff", staff);
      await axios.post("http://localhost:8080/major", major);
    
    } else {
      await axios.put("http://localhost:8080/student", student);
      await axios.put("http://localhost:8080/company", company);
       // await axios.post("http://localhost:8080/document", document);
      await axios.put("http://localhost:8080/coopEducation", coopEducation);
      // await axios.post("http://localhost:8080/staff", staff);
      await axios.put("http://localhost:8080/major", major);
    }
    

    console.log(student,company,coopEducation,major)
    setIsLoading(false);

  
  };
  return (
    <Box minW={"100%"}>
      <Bred data={"แบบฟอร์มขอความอนุเคราะห์ผึกงานและสหกิจ"} />
      <Divider my={2} />
      <Box my={4}>
        <Heading as={"h4"} size={"md"} textAlign={"center"} name="namecoop" value="ขอความอนุเคราะห์">
          แบบฟอร์มขอความอนุเคราะห์ผึกงานและสหกิจ
        </Heading>
         
      </Box>
      <Text color={"red"}>
        *ยังไม่มีใบตอบรับจากสถานประกอบการให้กรอกฟอร์มนี้*
      </Text>
      <Text>หลักสูตร : วิทยาศาสตร์ บัณฑิต</Text>
      <form onSubmit={handleSubmit(submitData)}>
        <Controller
          name="major"
          control={control}
          rules={{ required: true }}
          render={({ field: { name, onChange } }) => (
            <FormControl isInvalid={errors[name]} mt={4} w={"50%"}>
              <Flex alignItems={"center"}>
                <FormLabel>สาขาวิชา</FormLabel>
                <Select
                  w={"50%"}
                  onChange={onChange}
                  placeholder="--- เลือกสาขา ---"
                >
                  <option value={"CS"}>สาขาวิชาวิทยาการคอมพิวเตอร์</option>
                  <option value={"BO"}>สาขาเทคโนโลยีชีวภาพ</option>
                  <option value={"CM"}>สาขาเคมี</option>
                  <option value={"ST"}>สาขาวิชาสถิติ</option>
                  <option value={"IT"}>สาขาวิชาเทคโนโลยีสารสนเทศ</option>
                  <option value={"MT"}>สาขาวิชาคณิตศาสตร์</option>
                  <option value={"MS"}>สาขาวิชาวัสดุศาสตร์</option>
                  <option value={"ICT"}>สาขาเคมีอุตสาหกรรมและเทคโนโลยีสิ่งทอ</option>
                  <option value={"AP"}>สาขาวิชาฟสิกส์ประยุกต์</option>
                </Select>
              </Flex>
            </FormControl>
          )}
        />
        <Flex>
          <Controller
            name="kindofworkname"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, onChange } }) => (
              <FormControl isInvalid={errors[name]} mt={4}>
                <Flex>
                  <FormLabel>ประเภทการปฏิบัติงาน</FormLabel>
                  <RadioGroup onChange={onChange}>
                    <Stack spacing={5} direction="column">
                      <Radio colorScheme="green" value="ฝึกงาน">
                        ฝึกงาน
                      </Radio>
                      <Radio colorScheme="green" value="ฝึกสหกิจ">
                        ฝึกสหกิจ
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>
              </FormControl>
            )}
          />
  
          {/* <Controller
            name="coopYear"
            control={control}
            defaultValue={""}
            rules={{
              required: true,
              pattern: { value: /\d/ },
            }}
            render={({ field: { name, value, onChange } }) => (
              <FormControl isInvalid={errors[name]} mt={4}>
                <Flex alignItems={"center"}>
                  <FormLabel minW={"90px"}>ปีการศึกษา</FormLabel>
                  <Input
                    value={value}
                    placeholder="ปีการศึกษา"
                    onChange={onChange}
                  />
                </Flex>
              </FormControl>
            )}
          /> */}

          <Controller
            name="yearcoop"
            control={control}
            rules={{ required: true }}
            render={({ field: { name,value, onChange } }) => (
              <FormControl ml={5} isInvalid={errors[name]} mt={4}>
                <Flex>
                <FormLabel minW={"90px"}>ปีการศึกษา</FormLabel>
                <Input
                    value={value}
                    onChange={onChange}
                    placeholder="Select year"
                    size="md"
                    type="text"
                    isDisabled
                  />
                </Flex>
              </FormControl>
            )}
          />

          <Controller
            name="termcoop"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, onChange } }) => (
              <FormControl ml={5} isInvalid={errors[name]} mt={4}>
                <Flex>
                  <Select onChange={onChange} placeholder="ภาคเรียนที่">
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </Select>
                </Flex>
              </FormControl>
            )}
          />
        </Flex>
        <Flex>
          <Controller
            name="startdatecoop"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, value, onChange } }) => (
              <FormControl isInvalid={errors[name]} mt={4}>
                <Flex alignItems={"center"}>
                  <FormLabel minW={"90px"}>วันที่เริ่ม</FormLabel>
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder="Select Date"
                    size="md"
                    type="date"
                  />
                </Flex>
              </FormControl>
            )}
          />
          <Controller
            name="enddatecoop"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, value, onChange } }) => (
              <FormControl isInvalid={errors[name]} ml={4} mt={4}>
                <Flex alignItems={"center"}>
                  <FormLabel minW={"90px"}>ถึงวันที่กลับ</FormLabel>
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder="Select Date"
                    size="md"
                    type="date"
                  />
                </Flex>
              </FormControl>
            )}
          />
        </Flex>
        <Text fontWeight={"bold"}>ข้อมูลสถานประกอบการ*</Text>
        <Flex>
          <Box>
            <Box>
              <Controller
                name="namecompany"
                control={control}
                rules={{ required: true }}
                defaultValue={""}
                render={({ field: { name, value, onChange } }) => (
                  <FormControl isInvalid={errors[name]} mt={4}>
                    <Flex alignItems={"center"}>
                      <FormLabel minW={"90px"}>ชื่อบริษัท</FormLabel>
                      <Input value={value} onChange={onChange} />
                    </Flex>
                  </FormControl>
                )}
              />
            </Box>
            <Box>
              <Controller
                name="phonecompany"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { name, value, onChange } }) => (
                  <FormControl isInvalid={errors[name]} mt={4}>
                    <Flex alignItems={"center"}>
                      <FormLabel minW={"90px"}>เบอร์โทร</FormLabel>
                      <Input value={value} onChange={onChange} />
                    </Flex>
                  </FormControl>
                )}
              />
            </Box>
            <Box>
              <Controller
                name="emailcompany"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { name, value, onChange } }) => (
                  <FormControl isInvalid={errors[name]} mt={4}>
                    <Flex alignItems={"center"}>
                      <FormLabel minW={"90px"}>อีเมล</FormLabel>
                      <Input type="email" value={value} onChange={onChange} />
                    </Flex>
                  </FormControl>
                )}
              />
            </Box>
            <Box>
              <Controller
                name="linecompany"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { name, value, onChange } }) => (
                  <FormControl isInvalid={errors[name]} mt={4}>
                    <Flex alignItems={"center"}>
                      <FormLabel minW={"90px"}>ไลน์</FormLabel>
                      <Input type="linefacebook" value={value} onChange={onChange} />
                    </Flex>
                  </FormControl>
                )}
              />
            </Box>
            <Box>
              <Controller
                name="facebookcompany"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { name, value, onChange } }) => (
                  <FormControl isInvalid={errors[name]} mt={4}>
                    <Flex alignItems={"center"}>
                      <FormLabel minW={"90px"}>เฟสบุ้ค</FormLabel>
                      <Input type="companyfacebook" value={value} onChange={onChange} />
                    </Flex>
                  </FormControl>
                )}
              />
            </Box>
          </Box>
          <Box>
            <Controller
              name="addresscompany"
              control={control}
              defaultValue={""}
              rules={{ required: true }}
              render={({ field: { name, value, onChange } }) => (
                <FormControl isInvalid={errors[name]} ml={4} mt={4}>
                  <Flex>
                    <FormLabel minW={"90px"}>ที่อยู่บริษัท</FormLabel>
                    <Textarea value={value} onChange={onChange} />
                  </Flex>
                </FormControl>
              )}
            />
          </Box>
        </Flex>
        <Text fontWeight={"bold"}>ข้อมูลนักศึกษา 1.*</Text>
        <Flex>
          <Box>
            <Box>
              <Controller
                name="firstName"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { name, value, onChange } }) => (
                  <FormControl isInvalid={errors[name]} mt={4}>
                    <Flex alignItems={"center"}>
                      <FormLabel minW={"90px"}>ชื่อ</FormLabel>
                      <Input value={value} onChange={onChange} />
                    </Flex>
                  </FormControl>
                )}
              />
            </Box>
            <Box>
              <Controller
                name="studentId"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                // rules={{
                //   pattern: {
                //     value: /\d/,
                //   },
                // }}
                render={({ field: { name, value, onChange } }) => (
                  <FormControl isInvalid={errors[name]} mt={4}>
                    <Flex alignItems={"center"}>
                      <FormLabel minW={"90px"}>รหัสนักศึกษา</FormLabel>
                      <Input value={value} onChange={onChange} />
                    </Flex>
                  </FormControl>
                )}
              />
            </Box>
            <Box>
              <Controller
                name="emailStudent"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { name, value, onChange } }) => (
                  <FormControl isInvalid={errors[name]} mt={4}>
                    <Flex alignItems={"center"}>
                      <FormLabel minW={"90px"}>อีเมล</FormLabel>
                      <Input type="email" value={value} onChange={onChange} />
                    </Flex>
                  </FormControl>
                )}
              />
            </Box>
          </Box>
          <Box>
            <Box>
              <Controller
                name="lastName"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { name, value, onChange } }) => (
                  <FormControl isInvalid={errors[name]} ml={4} mt={4}>
                    <Flex alignItems={"center"}>
                      <FormLabel minW={"90px"}>นามสกุล</FormLabel>
                      <Input value={value} onChange={onChange} />
                    </Flex>
                  </FormControl>
                )}
              />
            </Box>
            <Box>
              <Controller
                name="phoneStudent"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { name, value, onChange } }) => (
                  <FormControl isInvalid={errors[name]} ml={4} mt={4}>
                    <Flex alignItems={"center"}>
                      <FormLabel minW={"90px"}>เบอร์โทร</FormLabel>
                      <Input value={value} onChange={onChange} />
                    </Flex>
                  </FormControl>
                )}
              />
            </Box>
          </Box>
        </Flex>
        <Center mt={5}>
          <Box>
            <Flex>
              <Text>ประวัติส่วนตัว / ไฟล์ DPF*</Text>
              <Input w={"100px"} p={0} m={0} h={"fit-content"} type="file" />
              <Text>Resume/CV/Transcript</Text>
            </Flex>
          </Box>
        </Center>
        <Center my={3}>
          
          <Button
            isLoading={isLoading}
            type="submit"
            mx={4}
            colorScheme="green" 
          >
            บันทึก
          </Button>
          
          <Button type="reset" colorScheme="#fff" color={"#000"} >
            รีเซ็ต
          </Button>
        </Center>
      </form>
    </Box>
  );
}

export default Request;
