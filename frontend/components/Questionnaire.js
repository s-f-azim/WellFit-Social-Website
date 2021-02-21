import React, { Component, useEffect, useRef, useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Button,
    Carousel,
} from 'antd';

const carouselStyle = {
    background: '#171717',
};

const Questionnaire = () => {

    const carousel = useRef();
    const [form] = Form.useForm();
    const [fields, setFields] = useState([
        'weight',
        'height',
        'bmi',
    ]);
    const [slideIndex, setSlideIndex] = useState(0);

    const onFinish = (values) => {
        console.log('Success:', values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failure:', errorInfo);
    }

    const previous = () => {
        if (form.getFieldError(fields[slideIndex]).length === 0) {
            carousel.current.prev();
        }
    }

    const next = () => {
        if (form.getFieldError(fields[slideIndex]).length === 0) {
            carousel.current.next();
        }
    }

    const onSlideChange = (from, to) => {
        setSlideIndex(to);
    }

    return (
        <>
            <Form
                name="questionnaire"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >

                <Carousel style={carouselStyle} ref={carousel} beforeChange={onSlideChange}>

                <Form.Item
                    label="Weight:"
                    name="weight"
                    rules={[{ min: 0, message: 'Please input a positive number!' }]}    
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Height:"
                    name="height"
                    rules={[{ min: 0, message: 'Please input a positive number!' }]} 
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="BMI:"
                    name="bmi"
                    rules={[{ min: 0, message: 'Please input a positive number!' }]}     
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

                </Carousel>

            </Form>

            <Button onClick={previous}>
                PREVIOUS
            </Button>

            <Button onClick={next}>
                NEXT
            </Button>

        </>
    );

}

export default Questionnaire;