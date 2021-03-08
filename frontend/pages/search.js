import { useRouter } from 'next/router';
import { Space, Form, Input, Alert, Button, Row, Col, Card, Select } from 'antd';
const {Option} = Select;
const { Search } = Input;


import { InstagramOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { setState, useState, useContext } from 'react';
import API from '../config';
import axios from 'axios';


const users = [{name: "Oskar", age: 19, tags: ["abs", "core", "cardio"]}, {name: "Oskar6", age: 19, tags: ["abs", "core", "cardio"]}, {name: "Oskar5", age: 19, tags: ["abs", "core", "cardio"]}, {name: "Oskar2", age: 19, tags: ["abs", "test2", "cardio"]}, {name: "Oskar3", age: 19, tags: ["abs", "test3", "cardio"]}, {name: "Oskar4", age: 19, tags: ["abs", "test4", "cardio"]}]


const getData = async () => {
    const resp =  await searchName('o');                
    return resp;
}
const test = [ { name: 'Oskar' }, { name: 'Oskar2' } ];



const SearchBar = () => {

    const [q, setQuery] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState(0);
    const [data, setData] = useState(users);
    const searchName = (q, gender) => {
        axios.get(`http://localhost:4000/api/users/instructors/?q=${q}&&gender=${gender}&&age=${age}`).then(({data}) => {
            setData(data);
        })
    }
    const handleChange = i => {
        setQuery(i);
    }
    return(
    <>
        <div style={{display: "inline-flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", flexDirection: "column"}}>
            <Search type="text" enterButton="Search" size="large" onSearch={searchName(q, gender)} onChange={e => setQuery(e.target.value)} placeholder="Search me..." style={{ width: "90%"}}/>
            {/* TODO: ADD LINK TO PROFILE! */}
            <div id="filterrow" style={{display: "inline-block", paddingTop: "2rem"} }>
                <Select defaultValue="All Genders" style={{marginLeft: "1rem", marginRight: "1rem"}} placeholder="Gender" onChange={setGender}>
                    <Option value="female">Female</Option>
                    <Option value="male">Male</Option>
                    <Option value="non-binary">Non-Binary</Option>
                    <Option value="">All Genders</Option>
                </Select>

                <Select defaultValue="All Ages" style={{marginLeft: "1rem", marginRight: "1rem"}} placeholder="Age" onChange={setAge}>
                    <Option value="0">All Ages</Option> 
                    <Option value="23">18-28</Option>
                    <Option value="34">29-39</Option>
                    <Option value="45">40-50</Option>
                    <Option value="56">51-61</Option>
                    <Option value="62">62+</Option>
                </Select>
                <Select style={{marginLeft: "1rem", marginRight: "1rem"}} placeholder="Tags"></Select>
            </div>
        </div>
        

        <Row style={{marginTop: "2rem", marginLeft: "2rem"}}>
        {
            data.map((val,key ) => {
                return (
                    <Col xs={24} md={8}>
                        <Card key={key} title={val.name} extra={<a href="#">Profile</a>} style={{ width: "90%" , marginTop: "2rem"}}>
                            <p> Gender: {val.gender}</p>
                            <p> Age: {val.age}</p>
                            <p> Tags: {val.tags.map((val) => {return(<>{val} </>);})}</p>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    </>);
};

export default SearchBar;