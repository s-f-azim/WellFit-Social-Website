import React, { Component, useEffect, useRef, useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Button,
    Carousel,
    Select,
} from 'antd';

const { Option } = Select;

import axios from "axios";

const Questionnaire = () => {

    const carousel = useRef();
    const [form] = Form.useForm();
    const [valid, setValid] = useState(true);

    const onFinish = async (values) => {
        console.log('Success:', values);
        
        const response = await axios.post('http://localhost:4000/users/edit/602e49521e619c1742306434', {
            weight: values.weight,
            height: values.height,
            bmi: values.bmi,
            gender: values.gender,
            isPregnant: values.isPregnant,
            fitnessLevel: values.fitnessLevel,
        });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failure:', errorInfo);
    }

    const onFieldsChange = (changedFields, allFields) => {
        changedFields.find(field => field.errors.length !== 0) ? setValid(false) : setValid(true);
    }

    const previous = () => {
        if (valid) carousel.current.prev();
    }

    const next = () => {
        if (valid) carousel.current.next();
    }

    return (
        <>
        <Form
            name="questionnaire"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onFieldsChange={onFieldsChange}
            form={form}
        >

            <Carousel className="carousel" ref={carousel}>

            <Form.Item
                label="Weight:"
                name="weight"
                rules={[
                    { type: 'number', min: 0, message: 'Please enter numbers only' }
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                label="Height:"
                name="height"
            >
                <InputNumber min={0} />
            </Form.Item>

            <Form.Item
                label="BMI:"
                name="bmi"  
            >
                <InputNumber min={0} />
            </Form.Item>

            <Form.Item
                label="Gender:"
                name="gender"  
            >
                 <Select allowClear>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Fitness Level:"
                name="fitnessLevel"  
            >
                 <Select allowClear>
                    <Option value="beginner">Beginner</Option>
                    <Option value="intermediate">Intermediate</Option>
                    <Option value="advanced">Advanced</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            </Carousel>

        </Form>

        <Button onClick={previous}>PREVIOUS</Button>

        <Button onClick={next}>NEXT</Button>

        </>
    );

}

export default Questionnaire;