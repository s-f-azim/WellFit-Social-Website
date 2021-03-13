import { useRef, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Carousel,
  Select,
  Row,
  Col,
  Card,
  Steps,
  Tooltip,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';

import createCourse from '../actions/course';

import tags from '../data/tags';

const { Option } = Select;

const { Step } = Steps;

const CourseForm = () => {
  const [form] = Form.useForm();
  const [hasErrors, setHasErrors] = useState(true);

  const onFinish = async (values) => {
    console.log(values);
    createCourse(values);
  };

  const haveErrors = (fields) => fields.find((field) => field.errors.length !== 0);

  const onFieldsChange = (changedFields) => {
    setHasErrors(haveErrors(changedFields));
  };

  return (
    <>
      <Form
        name="courseForm"
        onFinish={onFinish}
        onFieldsChange={onFieldsChange}
        form={form}
        layout="vertical"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 12,
        }}
        scrollToFirstError
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title of the course' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description of the course' }]}
        >
          <Input />
        </Form.Item>

        <Form.List name="creators">
          {(fields, { add, remove }, { errors }) => (
            <>
              <Form.Item label="Additional Creators">
                {fields.map((field, index) => (
                  <>
                    <Row>
                      <Col span={22}>
                        <Form.Item
                          {...field}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please input creator's email or delete this field",
                            },
                            {
                              type: 'email',
                              message: 'Please input a valid email',
                            },
                          ]}
                        >
                          <Input placeholder="example@email.com" />
                        </Form.Item>
                      </Col>
                      <Col span={1} offset={1}>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </Col>
                    </Row>
                  </>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    Add creator
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item label="Tags" name="tags">
          <Select mode="multiple" allowClear>
            {tags.map((tag) => (
              <Option key={tag} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              type: 'number',
              min: 0,
              message: 'Please input a valid price',
            },
          ]}
        >
          <InputNumber precision={2} />
        </Form.Item>

        <Form.Item label="Address">
          <Form.Item label="Street" name={['address', 'street']}>
            <Input />
          </Form.Item>
          <Form.Item label="City" name={['address', 'city']}>
            <Input />
          </Form.Item>
          <Form.Item label="County Code" name={['address', 'country']}>
            <Input />
          </Form.Item>
          <Form.Item label="Postal Code" name={['address', 'postalCode']}>
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CourseForm;
