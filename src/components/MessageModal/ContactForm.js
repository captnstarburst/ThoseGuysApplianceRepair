import React, { Component } from 'react';
import classes from './ContactForm.module.css';
import { Link } from 'gatsby-plugin-modal-routing';
import {Modal, ModalHeader, ModalBody, Container, Col, Row, 
	Button, Form, FormGroup, Label, Input, UncontrolledTooltip} from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {navigate} from 'gatsby';

class ContactInfoForm extends Component {
  constructor(props) {
    super(props);
    
    this.handleFormChange = this.handleFormChange.bind(this);
    this.checkFormValues = this.checkFormValues.bind(this);
  }
  
  state = {
  	fName : "",
	lName : "",
	phoneNumber : "",
	inputAddress : "",
	inputAddress2 : "",
	inputCity : "",
	inputZip : "",
	shouldBtnMount: false
  };
  
  
  handleFormChange = (e) =>{
  	const alphaOnly = /^[a-zA-Z]+$/;
  	const numbersOnly = /^\d+$/;
  	const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  	
  	
  	switch(e.target.id){
  		case "fName":
  			if(alphaOnly.test(e.target.value) || e.target.value === ""){
  				this.setState({
  					fName: e.target.value
  				}, function() {
					this.checkFormValues();
				});
  			}
  			break;
		case "lName":
			if(alphaOnly.test(e.target.value) || e.target.value === ""){
  				this.setState({
  					lName: e.target.value
  				}, function() {
					this.checkFormValues();
				});
  			}
			break;
		case "phoneNumber":
			if(numbersOnly.test(e.target.value) || e.target.value === ""){
				let newValue = e.target.value
				
				if(newValue.length === 10){
					newValue = e.target.value.replace(phoneRegex, "($1) $2-$3");
				}
				
				this.setState({
					phoneNumber: newValue
				}, function() {
					this.checkFormValues();
				});
			}else if (this.state.phoneNumber.length === 14 && e.target.value.length === 13){
				this.setState({
					phoneNumber: ""
				});
			}
			
			break;
		case "inputAddress":
			this.setState({
				inputAddress: e.target.value
			}, function() {
					this.checkFormValues();
			});
			break;
		case "inputAddress2":
			this.setState({
				inputAddress2: e.target.value
			}, function() {
					this.checkFormValues();
			});
			break;
		case "inputCity":
			if(alphaOnly.test(e.target.value) || e.target.value === ""){
				this.setState({
					inputCity: e.target.value
				}, function() {
					this.checkFormValues();
				});
			}
			break;
		case "inputZip":
			if(numbersOnly.test(e.target.value) || e.target.value === ""){
				if(e.target.value.length <  6){
					this.setState({
						inputZip: e.target.value
					}, function() {
						this.checkFormValues();
					});
				}
			}
			break;
  		default:	
  			break;
  	}
  }
  
  checkFormValues = () =>{
  	if(this.state.fName !== "" && this.state.lName !== "" && this.state.phoneNumber !== ""
  		&& this.state.inputAddress !== ""  && this.state.inputCity !== "" && this.state.inputZip !== ""
  	){
  		if(this.state.phoneNumber.length === 14 && this.state.inputZip.length ===5){
  			this.setState({shouldBtnMount: true});
  		}else{
  			this.setState({shouldBtnMount: false});
  		}
  	}else{
  		this.setState({shouldBtnMount: false});
  	}
  }
  

  handleSend = (e) =>{
	e.preventDefault();

	const url = "https://those-guys-form-handler-k9ct4vv58.now.sh/";
	// const url = "http://localhost:5000/";
	
	let payload;

	switch(this.props.messageType){
		case "repair":
			payload = {
				type: "repair", 
				name: this.state.fName + " " + this.state.lName,
				appliance: this.props.appliance[0],
				issue: this.props.issue,
				phone: this.state.phoneNumber,
				address: this.state.inputAddress +  " " + this.state.inputAddress2 + 
					" " + this.state.inputCity + " " + this.state.inputZip
			};
			break;
		case "recycle":
			payload = {
				type:"recycle",
				name: this.state.fName + " " + this.state.lName,
				phone: this.state.phoneNumber,
				address: this.state.inputAddress +  " " + this.state.inputAddress2 + 
					" " + this.state.inputCity + " " + this.state.inputZip
			};
			break;
		case "refinishing":
			payload = {
				type:"refinishing",
				name: this.state.fName + " " + this.state.lName,
				phone: this.state.phoneNumber,
				address: this.state.inputAddress +  " " + this.state.inputAddress2 + 
					" " + this.state.inputCity + " " + this.state.inputZip
			};
			break;
		case "sales":
			payload = {
				type:"sales",
				name: this.state.fName + " " + this.state.lName,
				appliance: this.props.appliance, 
				phone: this.state.phoneNumber,
				address: this.state.inputAddress +  " " + this.state.inputAddress2 + 
					" " + this.state.inputCity + " " + this.state.inputZip
			};
			break;
		default:
			break;	
	}

	fetch(url, {
	  method: 'POST',
	  mode: 'no-cors',
	  headers: {
		'Content-Type': 'application/json'
		// 'Content-Type': 'application/x-www-form-urlencoded',
	  },
	  body: JSON.stringify(payload)
	}).then(function(response) {
	  if(response.status === 201){
		navigate(
			"/message_sent/",
				{
					state: { modal: true },
				}
			);
	  }else{
		navigate(
			"/message_error/",
				{
					state: { modal: true },
				}
			);
	  }
	}).catch((err) => {
		navigate(
			"/message_error/",
				{
					state: { modal: true },
				}
			);
	})
  }


  render(){
    const closeBtn = <Link to={this.props.linkBack}><button className="close" onClick ={this.props.clearState}>&times;</button></Link>;
    return(
        <Modal isOpen={true} >
        	<ModalHeader close={closeBtn}>Contact Information</ModalHeader>  
        <ModalBody>
        <Container>
    		<Form autocomplete="on">
		      <Row form>
		        <Col md={6}>
		          <UncontrolledTooltip placement="top" target="requiredFirst">
	        		Required Info
    			  </UncontrolledTooltip>
		          <FormGroup>
		            <Label for="fName">First Name
		            	<span syle={{color:"red"}} id="requiredFirst">*</span>
		            </Label>
		            <Input required onChange={this.handleFormChange} value={this.state.fName}
		            	type="text" name="firstName" id="fName" placeholder="John"/>
		          </FormGroup>
		        </Col>
		        <Col md={6}>
		        	<UncontrolledTooltip placement="top" target="requiredLast">
	        			Required Info
    				</UncontrolledTooltip>
		          <FormGroup>
		            <Label for="lName">Last Name
		            	<span syle={{color: "red"}} id="requiredLast">*</span>
		            </Label>
		            <Input required onChange={this.handleFormChange} value={this.state.lName}
		            	type="text" name="LastName" id="lName" placeholder="Smith" />
		          </FormGroup>
		        </Col>
		      </Row>
		      <FormGroup>
		    	<UncontrolledTooltip placement="top" target="requiredPhone">
	        			Required Info
    			</UncontrolledTooltip>
		        <Label for="phoneNumber">Phone Number
		        	<span syle={{color: "red"}} id="requiredPhone">*</span>
		        </Label>
		        <Input required 
		        	inputmode="numeric"
		        	onChange={this.handleFormChange} value={this.state.phoneNumber}
		        	type="text" name="phoneNumber" id="phoneNumber" placeholder="(575) 555-5555"/>
		      </FormGroup>
		      <FormGroup>
		    	<UncontrolledTooltip placement="top" target="requiredAddress">
	        			Required Info
    			</UncontrolledTooltip>
		        <Label for="inputAddress">Address
		        	<span syle={{color: "red"}} id="requiredAddress">*</span>
		        </Label>
		        <Input required onChange={this.handleFormChange} value={this.state.inputAddress}
		        	type="text" name="address" id="inputAddress" placeholder="1234 Main St"/>
		      </FormGroup>
		      <FormGroup>
		        <Label for="inputAddress2">Address 2</Label>
		        <Input onChange={this.handleFormChange} value={this.state.inputAddress2}
		        	type="text" name="address2" id="inputAddress2" placeholder="Apt 1"/>
		      </FormGroup>
		      <Row form>
		        <Col md={6}>
		        	<UncontrolledTooltip placement="top" target="requiredCity">
	        			Required Info
    				</UncontrolledTooltip>
		          <FormGroup>
		            <Label for="inputCity">City
		            	<span syle={{color: "red"}} id="requiredCity">*</span>
		            </Label>
		            <Input required onChange={this.handleFormChange} value={this.state.inputCity} 
		            	type="text" name="city" id="inputCity" placeholder="Clovis" />
		          </FormGroup>
		        </Col>
		        
		        <Col md={{ size: '2', offset: 4 }}>
		          <FormGroup>
		        	<UncontrolledTooltip placement="top" target="requiredZip">
	        			Required Info
    				</UncontrolledTooltip>
		            <Label for="inputZip">Zip
		            	<span syle={{color: "red"}} id="requiredZip">*</span>
		            </Label>
		            <Input required onChange={this.handleFormChange} value={this.state.inputZip} 
		            	inputmode="numeric"
		            	type="text" name="zip" id="inputZip"/>
		          </FormGroup>  
		        </Col>
		      </Row>
		      
		      <div className={classes.FlexEnd}>
	    		{this.state.shouldBtnMount ?

	      				<Button onClick={this.handleSend}>
	      					Send Message 	
	      				</Button>
	      				
	      			:
	      			<></>
	    		}
		      </div>
		    </Form>
    	</Container>
        </ModalBody>
        </Modal>
    );
  }
  
};

ContactInfoForm.propTypes = {
	clearState: PropTypes.func.isRequired,
	messageType: PropTypes.string.isRequired,
	appliance: PropTypes.array.isRequired,
	issue: PropTypes.string.isRequired,
  };
	  
const mapStateToProps = ({ messageType, appliance, issue }) => {
	return {messageType, appliance, issue};
};
	  
const mapDispatchToProps = dispatch => {
	return { clearState: () => dispatch({type: `CLEAR_STATE`})};
};
	  
export default connect(mapStateToProps, mapDispatchToProps)(ContactInfoForm);
