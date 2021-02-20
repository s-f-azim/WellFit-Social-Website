import { Row, Col } from "antd";

// style = {{fontSize: "50px", fontFamily: "Poppins", fontWeight: 800, fontStyle: "italic"}}

const Navbar = () => {
    return (
        <div>
					<Row justify="space-around" align="middle" style = {{backgroundColor: "#E5E5E5"}}>
						<Col span = {1}></Col>
						<Col className ="instaFit">
								InstaFit
						</Col>
						<Col span = {18}></Col>
						<Col style = {{fontSize: "20px"}}>
								<button className="whiteBtn">
									Join us
								</button>
						</Col>
						<Col style = {{fontSize: "20px"}}>
								<button className="blackBtn">
									Login
								</button>
						</Col>
						<Col span = {1}></Col>
        	</Row>
        </div>
    )
}

export default Navbar
