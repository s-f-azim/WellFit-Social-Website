import { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Carousel,
  Select,
  Radio,
  Row,
  Col,
  Layout,
  Card,
  Steps,
} from "antd";

const { Option } = Select;

const { Header, Content, Footer } = Layout;

const { Step } = Steps;

import axios from "axios";

const Questionnaire = () => {
  const carousel = useRef();
  const [form] = Form.useForm();
  const [valid, setValid] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const onFinish = async (values) => {
    console.log("Success:", values);
    /*
    const response = await axios.post(
      "http://localhost:4000/users/edit/602e49521e619c1742306434",
      {
        weight: values.weight,
        height: values.height,
        bmi: values.bmi,
        gender: values.gender,
        isPregnant: values.isPregnant,
        fitnessLevel: values.fitnessLevel,
      }
    );
    */
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failure:", errorInfo);
  };

  const haveErrors = (fields) => {
    return fields.find((field) => field.errors.length !== 0);
  };

  const onFieldsChange = (changedFields, allFields) => {
    setValid(!haveErrors(changedFields));
  };

  const previous = () => {
    carousel.current.prev();
  };

  const next = () => {
    carousel.current.next();
  };

  return (
    <>
      <Card
        className="container-card"
        style={{ padding: "0 1rem" }}
        actions={[
          <Button
            size="large"
            type="primary"
            onClick={previous}
            disabled={!valid}
            block
          >
            PREVIOUS
          </Button>,
          <Button
            size="large"
            type="primary"
            onClick={next}
            disabled={!valid}
            block
          >
            NEXT
          </Button>,
        ]}
      >
        <Form
          name="questionnaire"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onFieldsChange={onFieldsChange}
          form={form}
          colon={false}
          layout="vertical"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 12,
          }}
        >
          <Row>
            <Col span={1}>
              <Steps
                progressDot
                current={currentSlide}
                responsive
                direction="vertical"
              >
                <Step />
                <Step />
                <Step />
                <Step />
                <Step />
                <Step />
                <Step />
              </Steps>
            </Col>

            <Col span={23}>
              <Carousel
                ref={carousel}
                dotPosition="top"
                dots={false}
                effect="fade"
                beforeChange={(from, to) => setCurrentSlide(to)}
              >
                <Card bordered={false}>
                  <Card.Grid>
                    <Form.Item
                      label="What is your weight?"
                      name="weight"
                      rules={[
                        {
                          type: "number",
                          min: 0,
                          message: "Please enter positive numbers only",
                        },
                      ]}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Card.Grid>

                  <Card.Grid>
                    <Form.Item
                      label="What is your height?"
                      name="height"
                      rules={[
                        {
                          type: "number",
                          min: 0,
                          message: "Please enter positive numbers only",
                        },
                      ]}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Card.Grid>
                </Card>

                <Card>
                  <Card.Grid>
                    <Form.Item label="Are you pregnant?" name="isPregnant">
                      <Radio.Group>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Card.Grid>
                </Card>

                <Card>
                  <Card.Grid>
                    <Form.Item
                      label="Preferred instructor's gender?"
                      name="gender"
                    >
                      <Select allowClear>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="any">Any</Option>
                      </Select>
                    </Form.Item>
                  </Card.Grid>
                </Card>

                <Card>
                  <Card.Grid>
                    <Form.Item
                      label="What is your Fitness Level?"
                      name="fitnessLevel"
                    >
                      <Select allowClear>
                        <Option value="beginner">Beginner</Option>
                        <Option value="intermediate">Intermediate</Option>
                        <Option value="advanced">Advanced</Option>
                      </Select>
                    </Form.Item>
                  </Card.Grid>
                </Card>

                <Card>
                  <Card.Grid>
                    <Form.Item
                      label="Preferred training duration?"
                      name="trainingDuration"
                    >
                      <InputNumber />
                    </Form.Item>
                  </Card.Grid>
                </Card>

                <Card>
                  <Card.Grid>
                    <Form.Item
                      label="What training equipment do you have available?"
                      name="fitnessLevel"
                    >
                      <Select mode="multiple" allowClear>
                        <Option value="dumbbells">Dumbbells</Option>
                        <Option value="barbells">Barbells</Option>
                        <Option value="resistanceBands">
                          Resistance Bands
                        </Option>
                        <Option value="treadmill">Treadmill</Option>
                      </Select>
                    </Form.Item>
                  </Card.Grid>
                </Card>

                <Card>
                  <Card.Grid>
                    <Form.Item label="Submit to confirm your preferences!">
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Card.Grid>
                </Card>
              </Carousel>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default Questionnaire;
