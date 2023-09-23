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
import React, { useState } from "react";
import Bred from "../components/Bred";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

function Request() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitData = async (data) => {
    setIsLoading(true);
    const student = {
      firstName: data.firstName,
      lastName: data.lastName,
      studentId: data.studentId,
      phone: data.phoneStudent,
      email: data.emailStudent,
    };
    const company = {
      c_name: data.company,
      c_address: data.address,
      c_phone: data.phone,
      c_email: data.email,
    };
    const document = {
      d_branch: data.major,
      d_coopYear: data.coopYear,
      d_term: data.term,
      d_start_date: data.dateStart,
      d_end_date: data.dateEnd,
      d_type: data.type,
    };
    await axios.post("http://localhost:8080/student", student);
    await axios.post("http://localhost:8080/company", company);
    await axios.post("http://localhost:8080/document", document);
    console.log(student,company,document)
    setIsLoading(false);
  };
  return (
    <Box minW={"100%"}>
      <Bred data={"แบบฟอร์มขอความอนุเคราะห์ผึกงานและสหกิจ"} />
      <Divider my={2} />
      <Box my={4}>
        <Heading as={"h4"} size={"md"} textAlign={"center"}>
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
            name="type"
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
            name="coopYear"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, onChange } }) => (
              <FormControl ml={5} isInvalid={errors[name]} mt={4}>
                <Flex>
                  <Select onChange={onChange} placeholder="ปีการศึกษา">
                    <option value="2566">2566</option>
                    <option value="2065">2565</option>
                    <option value="2064">2564</option>
                    <option value="2063">2563</option>
                    <option value="2062">2562</option>
                  </Select>
                </Flex>
              </FormControl>
            )}
          />

          <Controller
            name="term"
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
            name="dateStart"
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
            name="dateEnd"
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
                name="company"
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
                name="phone"
                control={control}
                defaultValue={""}
                rules={{
                  pattern: {
                    value: /\d/,
                  },
                }}
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
                name="email"
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
            <Controller
              name="address"
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
                rules={{
                  pattern: {
                    value: /\d/,
                  },
                }}
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
          <Button type="reset" colorScheme="#fff" color={"#000"}>
            รีเซ็ต
          </Button>
        </Center>
      </form>
    </Box>
  );
}

export default Request;
