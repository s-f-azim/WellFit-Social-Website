import {
  Alert,
  Form,
  Row,
  Card,
  Space,
  Input,
  Select,
  Collapse,
  Button,
  Rate,
  Slider,
  notification,
} from "antd";
import { updateUser } from "../utils/user.js";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/UserContext.js";
import { useState, useEffect, useContext } from "react";
import {
  CloseOutlined,
  PlusOutlined,
  PoundOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const yourCareerText = <h2> Your career </h2>;

const communicationText = <h2> Client Communication (if applicable)</h2>;

const paymentText = <h2> Payment information (if applicable) </h2>;

const additionalText = <h2> Additional information </h2>;

const { Panel } = Collapse;
const { TextArea } = Input;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

// Instructor Questionnaire
const InstQuest = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  //redirect to home page if user not logged in
  useEffect(() => {
    if (!user) router.push("/");
  }, []);
  const [hasError, setHasError] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await updateUser(values);
      if (response.data.success) {
        notification.open({
          message: "Information updated!",
          duration: 2,
          icon: <CheckOutlined style={{ color: "#33FF49" }} />,
        });
        router.push("/");
      }
    } catch (err) {
      setHasError(true);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="Update my info"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Space direction="vertical" size="middle">
          {hasError && (
            <Alert
              type="error"
              message="something went wrong, please try again"
              banner
            />
          )}
          <Collapse bordered={false} ghost={true}>
            <Panel header={yourCareerText} key="1">
              <Form.Item name="trainerType" label="Trainer type">
                <Select placeholder="Select your qualification">
                  <Option value="Physique trainer">Physique trainer</Option>
                  <Option value="Performance trainer">
                    Performance trainer
                  </Option>
                  <Option value="Lifestyle trainer">Lifestyle trainer</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.List name="qualifications" >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space
                        key={field.key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...field}
                          fieldKey={[field.fieldKey, "qualification"]}
                        >
                          <Input
                            style={{ width: "90%" }}
                            placeholder="Enter your qualification"
                          />
                        </Form.Item>
                          <CloseOutlined
                            style={{ color: "red", margin: "7px" }}
                            onClick={() => remove(field.name)}
                          />
                      </Space>
                    ))}
                    <Button
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined style={{ color: "#33FF49" }} />}
                    >
                      Add a Qualification
                    </Button>
                    <br />
                  </>
                )}
              </Form.List>
              <br />
              <Form.Item name="specialty" label="Field of expertise">
                <Input placeholder="bodybuilding, Yoga, nutrition..." />
              </Form.Item>

              <Form.List name="customerStories" label="Customer stories">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space
                        key={field.key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...field}
                          fieldKey={[field.fieldKey, "customerStory"]}
                        >
                          <Row>
                            <TextArea
                              style={{ width: "90%" }}
                              showCount
                              maxLength={200}
                              placeholder="Enter a past customer story, or feedback received"
                            />
                          </Row>
                        </Form.Item>
                            <CloseOutlined
                              style={{ color: "red", margin: "7px" }}
                              onClick={() => remove(field.name)}
                            />
                      </Space>
                    ))}
                    <Button
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined style={{ color: "#33FF49" }} />}
                    >
                      Add a customer story
                    </Button>
                  </>
                )}
              </Form.List>
            </Panel>

            <Panel header={communicationText} key="2">
              <Form.Item name="communicationModes" label="Communication modes">
                <Select mode="multiple" placeholder="Select multiple">
                  <Option value="Email">Email</Option>
                  <Option value="Phone calls">Phone calls</Option>
                  <Option value="Text messages">Text messages</Option>
                  <Option value="Whatsapp">Whatsapp</Option>
                  <Option value="Social Media">Social Media</Option>
                  <Option value="In person preferred">In person only</Option>
                  <Option value="Messaging app">Email</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="communicationFrequency"
                label="Communication frequency"
              >
                <Select placeholder="Select preferred">
                  <Option value="Daily">Daily</Option>
                  <Option value="Three-Four times a week">
                    Three-Four times a week
                  </Option>
                  <Option value="Twice a week">Twice a week</Option>
                  <Option value="Weekly"> Weekly</Option>
                  <Option value="Twice a month">Twice a month</Option>
                  <Option value="Monthly">Monthly</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Panel>

            <Panel header={paymentText} key="3">
              <Form.Item name="priceRange" label="Price range">
                <Rate
                  style={{ color: "green" }}
                  character={<PoundOutlined />}
                />
              </Form.Item>
              <Form.Item name="paymentFrequency" label="Payment frequency">
                <Select placeholder="Select preferred">
                  <Option value="One time">One time</Option>
                  <Option value="Twice a week">Twice a week</Option>
                  <Option value="Weekly"> Weekly</Option>
                  <Option value="Twice a month">Twice a month</Option>
                  <Option value="Monthly">Monthly</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item name="paymentOptions" label="Payment options">
                <Select mode="multiple" placeholder="Select multiple">
                  <Option value="Paypal">Paypal</Option>
                  <Option value="Wired (bank) transfer">
                    Wired (bank) transfer
                  </Option>
                  <Option value="Cash">Cash</Option>
                  <Option value="Other banking app">Other banking app</Option>
                  <Option value="Check">Check</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Panel>

            <Panel header={additionalText} destroyInactivePanel={true} key="4">
              <Form.Item name="serviceFormat" label="Service format">
                <Select mode="multiple" placeholder="Select multiple">
                  <Option value="Non-client-specific videos">
                    Non-client-specific videos
                  </Option>
                  <Option value="In person sessions">
                    In person training or coaching sessions
                  </Option>
                  <Option value="PDFs, Excel sheets or others">
                    {" "}
                    PDFs, Excel sheets or other files
                  </Option>
                  <Option value="Physical product">Physical product</Option>
                  <Option value="Audio content">Audio content</Option>
                  <Option value="Text based content">
                    Text based content (book, guidebook, leaflet...)
                  </Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="clientGenderPreference"
                label="Client gender preference"
              >
                <Select placeholder="Select your preferred client gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Non-Binary">Non-Binary</Option>
                  <Option value="Any">Any</Option>
                </Select>
              </Form.Item>
              <br />
              <Form.Item
                name="clientFitness"
                label="Client overall fitness level preference"
              >
                <Slider range defaultValue={[0, 100]} />
              </Form.Item>
              <br />
              <Form.Item
                name="clientHypertrophy"
                label="Client overall hypertrophy level preference"
              >
                <Slider range defaultValue={[0, 100]} />
              </Form.Item>
              <br />
              <Form.Item
                name="clientStrength"
                label="Client overall strength level preference"
              >
                <Slider range defaultValue={[0, 100]} />
              </Form.Item>
            </Panel>
          </Collapse>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Save info
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};
export default InstQuest;
