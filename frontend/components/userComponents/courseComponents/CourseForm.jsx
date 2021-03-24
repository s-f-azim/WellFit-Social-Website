import { useState, useMemo } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Card,
  notification,
  Alert,
  Space,
  Radio,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons';

import { useSession } from 'next-auth/client';
import createCourse from '../../../actions/course';
import { getUserIdByEmail } from '../../../actions/user';

import tags from '../../../data/tags';

const { Option } = Select;

const CourseForm = () => {
  const [session] = useSession();
  const user = useMemo(() => (session ? session.user : null), [session]);

  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    try {
      if (values.creators) {
        // eslint-disable-next-line no-param-reassign
        values.creators = await Promise.all(
          values.creators.map(async (email) => getUserIdByEmail(email))
        );
      }
      const response = await createCourse(values);
      if (response.success) {
        notification.open({
          message: 'Course Created!',
          duration: 2,
          icon: <CheckOutlined style={{ color: '#33FF49' }} />,
        });
      }
      setError(null);
    } catch (err) {
      if (err.response.data) setError(err.response.data.error);
    }
  };

  return (
    <>
      <Card title="Create a course">
        {error && <Alert type="error" message={error} banner />}
        <Form
          name="courseForm"
          onFinish={onFinish}
          form={form}
          layout="vertical"
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
            <Input.TextArea rows={3} />
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
              { required: true, message: 'Please input the description of the course' },
            ]}
          >
            <InputNumber precision={2} />
          </Form.Item>

          <Form.List name="creators">
            {(fields, { add, remove }) => (
              <>
                <Form.Item label="Additional Creators">
                  {fields.map((field) => (
                    <>
                      <Space align="middle">
                        <Form.Item
                          {...field}
                          key={field.key}
                          validateFirst
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
                            {
                              validator: async (_, email) => {
                                if (!email || user.email !== email) return Promise.resolve();
                                return Promise.reject('You are already a creator');
                              },
                            },
                          ]}
                        >
                          <Input placeholder="example@email.com" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </Space>
                    </>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                      Add creator
                    </Button>
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

          <Form.Item label="Fitness level required" name="fitnessLevel">
            <Select allowClear>
              <Option value="beginner">Beginner</Option>
              <Option value="intermediate">Intermediate</Option>
              <Option value="advanced">Advanced</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Training duration (minutes)"
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

          <Form.Item name="isVirtual" label="Virtual">
            <Radio.Group>
              <Radio value>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="gym" label="Requires gym access">
            <Radio.Group>
              <Radio value>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Training equipment required" name="trainingEquipment">
            <Select mode="multiple" allowClear>
              <Option value="dumbbells">Dumbbells</Option>
              <Option value="barbells">Barbells</Option>
              <Option value="resistanceBands">Resistance Bands</Option>
              <Option value="treadmill">Treadmill</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default CourseForm;
