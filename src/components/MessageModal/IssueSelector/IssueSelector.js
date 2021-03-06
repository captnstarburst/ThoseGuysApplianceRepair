import React, { Component } from 'react';
import classes from './IssueSelector.module.css';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from 'gatsby-plugin-modal-routing';
import {Modal, ModalHeader, ModalBody, ButtonDropdown, DropdownToggle, DropdownMenu} from 'reactstrap';
import IssueItem from './IssueItem/IssueItem';

class IssueDropDown extends Component {
  constructor(props) {
        super(props);
        
        this.toggleDropDown = this.toggleDropDown.bind(this);
  }
  
  
  state = {
    dropdownOpen : false,
    fridgeIssues : ["Displaying Error", "Dispenser Not Working", "Leaking", "Not Running", "Noise", "Odor",
      "Too Cold", "Too Warm", "Damaged Physically", "Not Sure"],
    washerIssues : ["Displaying Error", "Display/Buttons Not Working", "Noise Vibration", "Not Filling", 
      "Not Draining", "Not Running", "Stopped During Cycle", "Damaged Physically", "Not Sure"],
    dryerIssues : ["Displaying Error", "Not Drying/Long Dry Times", "Display/Buttons Not Working",
      "Noise Vibration", "Not Heating", "Not Running", "Not Starting", "Stopped During Cycle",
      "Damaged Physically", "Not Sure"],
    dishwasherIssues : ["Displaying Error", "Leaking", "Noise/Vibrations", "Not Cleaning Dishes",
      "Not Draining", "Not Drying Dishes", "Not Starting", "Stopped During Cycle", 
      "Damaged Physically", "Not Sure"],
    rangeIssues : ["Displaying Error", "Cooktop/Burners Not Working(Oven OK)", "Display Not Working", 
      "Unable to Close/Open Door", "No Heat", "Noise", "Oven Not Working(Cooktop/Burners OK)", 
      "Oven Temperature Problem", "Damaged Physically", "Not Sure"],
    ovenIssues : ["Displaying Error", "Display Not Working", "Unable to Close/Open Door", "No Heat",
      "Temperature Problem", "Damaged Physically", "Not Sure"],
    waterHeaterIssues : ["Displaying Error", "Leaking", "No Hot Water", "Not Enough Hot Water",
      "Too Hot", "Low Pressure", "Noise", "Water Odor/Color", "Pilot Won't Light", "Pilot Won't Stay Lit",
      "Burner Won't Stay Lit", "Damaged Physically", "Not Sure"],
    freezerIssues : ["Noise", "Frost Build Up", "Not Running", "Not Cold", "Damaged Physically", "Not Sure"],
    cooktopIssues : ["Displaying Error", "Scratched/Cracked", "Slow/Uneven Cooking", "Not Heating", 
      "Damaged Physically", "Not Sure"],
    disposalIssues : ["Not Working", "Jammed/Jamming", "Won't Shut Off", "Noise", "Damaged Physically", "Not Sure"],
    notlistedIssues : ["Displaying Error", "Noise/Vibration", "Not Starting", "Will Not Shut Off", 
      "Damaged Physically", "Not Sure"],
  };
  
  toggleDropDown = ()=>{
    this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
    }));
  }
  
  
  render(){
    
    let issueList = [];
    let titleCase = "";
    const closeBtn = <Link to="/"><button className="close" onClick ={this.props.clearState}>&times;</button></Link>;
    
    if(this.props.appliance[0] === undefined){
      //Do Nothing
      
    }else if(this.props.appliance[0] === "water_heater"){
      titleCase = "Water Heater ";
      for(let i = 0; i < this.state.waterHeaterIssues.length; i++){
        issueList.push(
          <IssueItem
            key = {i} 
            issue = {this.state.waterHeaterIssues[i]}
            itemOnClick = {this.issueItemClick}
          />
        );
      }
    }else if(this.props.appliance[0] === "not_listed"){
      
      titleCase = "Appliance ";
      for(let i =0; i < this.state.notlistedIssues.length; i++){
        issueList.push(
          <IssueItem 
            issue = {this.state.notlistedIssues[i]}
            itemOnClick = {this.issueItemClick}
          />
        );  
      }
    }else{
      let type = this.props.appliance[0] + "Issues";
      
      titleCase = ((this.props.appliance[0]).charAt(0)).toUpperCase() + 
        this.props.appliance[0].slice(1) + " ";
      
      for(let i =0; i < this.state[type].length; i++){
        issueList.push(
          <IssueItem 
            issue = {this.state[type][i]}
            itemOnClick = {this.issueItemClick}
          />
        );  
      }
    }
    
  
    return(
        <Modal isOpen={true} >
            <ModalHeader close={closeBtn}>Appliance Issue List</ModalHeader>  
            <ModalBody>
                <div className={classes.FlexCenter}>
                    <ButtonDropdown isOpen={this.state.dropdownOpen} 
                        toggle={this.toggleDropDown} size="block" 
                    >
                        <DropdownToggle caret>
                            {titleCase}
                            Issues
                        </DropdownToggle>
                        <DropdownMenu>
                            {issueList}
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
            </ModalBody>
          </Modal>     
    );
  }
  
}

IssueDropDown.propTypes = {
    appliance: PropTypes.array.isRequired,
    clearState: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = ({ appliance }) => {
    return { appliance };
  };
  
  const mapDispatchToProps = dispatch => {
    return { clearState: () => dispatch({type: `CLEAR_STATE`})
    };
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(IssueDropDown);
