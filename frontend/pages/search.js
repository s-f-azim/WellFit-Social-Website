import { useRouter } from 'next/router';
import { Space, Form, Input, Alert, Button, Row, Col, Card, Select } from 'antd';
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
    const [data, setData] = useState(users);
    const searchName = (q) => {
        axios.get(`http://localhost:4000/api/users/instructors/?q=${q}`).then(({data}) => {
            setData(data);
        })
    }
    const handleChange = i => {
        setQuery(i);
    }
    return(
    <>
        <div style={{display: "inline-flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", flexDirection: "column"}}>
            <Search type="text" enterButton="Search" size="large" onSearch={searchName(q)} onChange={e => setQuery(e.target.value)} placeholder="Search me..." style={{ width: "90%"}}/>
            {/* TODO: ADD LINK TO PROFILE! */}
            <div id="filterrow" style={{display: "inline-block", paddingTop: "2rem"} }>
                <Select style={{marginLeft: "1rem", marginRight: "1rem"}} placeholder="Gender"></Select>
                <Select style={{marginLeft: "1rem", marginRight: "1rem"}} placeholder="Age"></Select>
                <Select style={{marginLeft: "1rem", marginRight: "1rem"}} placeholder="Tags"></Select>
            </div>
        </div>
        

        <Row style={{marginTop: "2rem", marginLeft: "2rem"}}>
        {
            data.map((val,key ) => {
                return (
                    <Col xs={24} md={8}>
                        <Card key={key} title={val.name} extra={<a href="#">Profile</a>} style={{ width: "90%" , marginTop: "2rem"}}>
                            <p> Gender: Female/Male/Diverse</p>
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