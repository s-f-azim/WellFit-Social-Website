import React, { Component } from 'react';
import { Carousel, Button, Form, Input } from 'antd';
class Questionnaire extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            bmi: '',
        }

        this.carousel = React.createRef();
    }

    next = () => {
        this.carousel.current.next();
    }

    prev = () => {
        this.carousel.current.prev();
    }

    carouselStyle = {
        margin: '50px 100px',
        height: '400px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        padding:' 50px',
    };

    render() {
        return (
            <div>
                 <Form layout='vertical'>
                    <Carousel dotPosition='top' style={this.carouselStyle} ref={this.carousel}>
                        <div>
                            <Form.Item label="What is yout BMI?" name="bmi">
                                <Input />
                            </Form.Item>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                    </Carousel>
                </Form>
                <div>
                    <Button type="danger">CANCEL</Button>
                    <Button type="primary" onClick={this.prev}>PREVIOUS</Button>
                    <Button>SKIP</Button>
                    <Button type="primary" onClick={this.next}>NEXT</Button>
                </div>
            </div>
        );
    }

}

export default Questionnaire;