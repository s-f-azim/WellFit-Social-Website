import { useRef, useState } from 'react';
import { Form, InputNumber, Button, Carousel, Select, Row, Col, Card, Steps } from 'antd';

// import { useRouter } from "next/router";
import updateUser from '../utils/user';
// import { UserContext } from "../contexts/UserContext.js";

const { Option } = Select;

const { Step } = Steps;

const Questionnaire = () => {
  const carousel = useRef();
  const [form] = Form.useForm();
  const [valid, setValid] = useState(true);

  // const router = useRouter();
  // const { user, setUser } = useContext(UserContext);

  const totalSlides = 5;
  const [currentSlide, setCurrentSlide] = useState(0);

  const onFinish = async (values) => {
    try {
      await updateUser(values);
    } catch (err) {
      setCurrentSlide(5);
    }
  };

  const haveErrors = (fields) => fields.find((field) => field.errors.length !== 0);

  const onFieldsChange = (changedFields) => {
    setValid(!haveErrors(changedFields));
  };

  const previous = () => {
    carousel.current.prev();
  };

  const next = () => {
    carousel.current.next();
  };

  const PreviousButton = () => (
    <Button
      size="large"
      type="primary"
      onClick={previous}
      disabled={!valid || currentSlide <= 0}
      block
    >
      PREVIOUS
    </Button>
  );

  const NextButton = () =>
    currentSlide === totalSlides - 1 ? (
      <Button size="large" type="primary" disabled={!valid} onClick={() => form.submit()} block>
        SUBMIT
      </Button>
    ) : (
      <Button size="large" type="primary" onClick={next} disabled={!valid} block>
        NEXT
      </Button>
    );

  return (
    <>
      <Card
        className="container-card"
        style={{ padding: '0 1rem' }}
        actions={[<PreviousButton />, <NextButton />]}
      >
        <Form
          name="questionnaire"
          onFinish={onFinish}
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
              <Steps progressDot current={currentSlide} direction="vertical">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Step key={i} />
                ))}
              </Steps>
            </Col>

            <Col span={23}>
              <Carousel
                ref={carousel}
                dots={false}
                effect="fade"
                beforeChange={(from, to) => setCurrentSlide(to)}
              >
                <Card>
                  <Card.Grid>
                    <Form.Item
                      label="What is your weight? (kg)"
                      name="weight"
                      rules={[
                        {
                          type: 'number',
                          min: 0,
                          message: 'Please enter positive numbers only',
                        },
                      ]}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Card.Grid>

                  <Card.Grid>
                    <Form.Item
                      label="What is your height? (cm)"
                      name="height"
                      rules={[
                        {
                          type: 'number',
                          min: 0,
                          message: 'Please enter positive numbers only',
                        },
                      ]}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Card.Grid>
                </Card>

                <Card>
                  <Card.Grid>
                    <Form.Item label="Preferred instructor's gender?" name="preferredGender">
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
                    <Form.Item label="What is your Fitness Level?" name="fitnessLevel">
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
                      label="Preferred training duration? (minutes)"
                      name="trainingDuration"
                      rules={[
                        {
                          type: 'number',
                          min: 0,
                          message: 'Please enter positive numbers only',
                        },
                        {
                          validator: async (_, value) => {
                            if (!value || Number.isInteger(value)) return Promise.resolve();
                            return Promise.reject('Please enter a whole number');
                          },
                        },
                      ]}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Card.Grid>
                </Card>

                <Card>
                  <Card.Grid>
                    <Form.Item
                      label="What training equipment do you have available?"
                      name="trainingEquipment"
                    >
                      <Select mode="multiple" allowClear>
                        <Option value="dumbbells">Dumbbells</Option>
                        <Option value="barbells">Barbells</Option>
                        <Option value="resistanceBands">Resistance Bands</Option>
                        <Option value="treadmill">Treadmill</Option>
                      </Select>
                    </Form.Item>
                  </Card.Grid>
                </Card>

                <Card>
                  <Card.Grid />
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
