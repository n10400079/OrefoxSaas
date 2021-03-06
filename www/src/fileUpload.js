import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import {DropzoneDialog} from 'material-ui-dropzone'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';


const styles = theme => ({
    fab: {
        margin: theme.spacing(2),
      },
    absolute: {
        top:theme.spacing(0.5),
        bottom: theme.spacing(10),
        right: theme.spacing(2),
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
      },
      formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
      },
      formControlLabel: {
        marginTop: theme.spacing(1),
      },
      dialogtext:{
        marginTop:theme.spacing(4)
      }
  });

  class FileForm extends Component{
    constructor(props){
      super(props)
      this.state={open:false,file:[],selection:null,ProjectName:"",fullWidth:true,maxWidth:'',projectData:[],name:[], value: true};
      // this.state={value: true};
    }



    handleClose = (e) => {
      this.setState({open:false});
      
    };
    handleOpen = (e) => {
      fetch('/api/ListProjects')
        .then(response => response.json())
        .then(data => {console.log(data);this.setState({ projectData:data.Projects });console.log(this.state.projectData)});
      this.setState({open:true});
      
    };
    handleClickOpen = () => {
      fetch('/api/ListProjects')
        .then(response => response.json())
        .then(data => {console.log(data);this.setState({ projectData:data.Projects });console.log(this.state.projectData)});
      this.setState({open:true});
      console.log(this.state.open)
    };
  
  
    handleMaxWidthChange = (event) => {
      this.setState({maxWidth:event.target.value});
    };
      handleFullWidthChange = (event) => {
        this.setState({fullWidth:event.target.checked});
      };
    
    //   handleSave=(files)=> {
    //     //Saving files to state for further use and closing Modal.
    //     this.setState({file:files})
    //     this.setState({open:true});
    // }
  
    onChangeHandler=(event)=>{
      this.setState({file:event.target.files[0]})
      console.log(event.target.files[0])
    }
    selection=(event)=>{
      event.preventDefault();
      this.setState({value: event.target.value});
      // console.log(this.state.value);
    }
    upload=(event)=>{
      console.log('upload');
      const data = new FormData();
      data.append('file', this.state.file);
      axios.post("/api/UploadFile/"+this.state.value, data, { 
      // receive two    parameter endpoint url ,form data
      }).then(res => { // then print response status
        console.log(res)
    });
    this.setState({open:false});;
    }
  

    componentDidMount() {
      fetch('/api/ListProjects')
        .then(response => response.json())
        .then(data => {console.log(data);this.setState({ projectData:data.Projects });console.log(this.state.projectData)});
        //this.projectData.map(name=>name.ProjectName)
      }
      render(){
        // const { projectData } = this.state;
        const { classes } = this.props;
        return(
          <div>
        <Tooltip title="Add New File" aria-label="add" onClick={this.handleClickOpen}>
        <Fab variant="extended" size="small">
          <AddIcon className={classes.extendedIcon} />
            File Upload
        </Fab>
        </Tooltip>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Please Enter the Following Details to Create a New Project
          </DialogContentText>
          <form className={classes.form} noValidate method="post">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="Project Name">Project Name</InputLabel>
              <Select
                // autoFocus
                // onChange={this.handleMaxWidthChange}
                onChange={this.selection}
              >
              {this.state.projectData.map((row) => (
                <option value={row} >{row}</option>  
                ))}

              </Select>
              <DialogContentText className={classes.dialogtext}>
              Upload Your File
              </DialogContentText>
                <input type="file" className={classes.form} multiple onChange={this.onChangeHandler}/>

            </FormControl>
          </form>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          {/* <Link to="/"> */}
          <Button onClick={this.upload} color="primary">
            Confirm
          </Button>
          {/* </Link> */}
        </DialogActions>
      </Dialog>
    </div>
        )
      }

    }

    export default withStyles(styles, { withTheme: true })(FileForm);
  
































/*



    
export default function FormDialog1() {
  const classes = useStyles();  
  const [open, setOpen] = React.useState(false);
  const [files,setFiles] = React.useState([]);
  const [selection,setSelection] = React.useState(null)
  const [ProjectName,setProjectName]=React.useState("")
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('');
  const [projectData, setProjectData] = React.useState([])
  const [name,setName] = React.useState([]);


  const handleClose = (e) => {
    setOpen(false);
    
  };
  const handleOpen = (e) => {
    setOpen(false);
    
  };
  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
    console.log("entering")
    const handleFullWidthChange = (event) => {
      setFullWidth(event.target.checked);
    };
  
    const handleSave=(files)=> {
      //Saving files to state for further use and closing Modal.
      setFiles(files)
      setOpen(false)
  }
  };

  
  

  const onChangeHandler=(event)=>{
    setSelection(event.target.files[0])
    console.log(event.target.files[0])
  }

  const fetching=()=>{
    fetch('/api/ListProjectFiles')
      .then(response => response.json())
      .then(data => {setProjectData(data);console.log(projectData)});

      setName(projectData.map(name=>name.ProjectName))
      console.log(name)
  }



  return (
    
    <div>
        <Tooltip title="Add New Project" aria-label="add" onClick={()=>{handleClickOpen();fetching();}}>
        <Fab variant="extended" size="small">
          <AddIcon className={classes.extendedIcon} />
            File Upload
        </Fab>
        </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Please Enter the Following Details to Create a New Project
          </DialogContentText>
          <form className={classes.form} noValidate method="post">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="Project Name">Project Name</InputLabel>
              <Select
                autoFocus
                onChange={handleMaxWidthChange}
                inputProps={{
                  name: 'Project Name',
                  id: 'Project Name',
                }}
              >
                

                {name.map(function(name){
                return <MenuItem>{name}</MenuItem>  
          })}
                
              
               
                
                
                {/* 
                  <MenuItem>{projectData.map(x=>x.ProjectName)}</MenuItem>
                  
                
                
              </Select>
              <DialogContentText className={classes.dialogtext}>
              Upload Your File
              </DialogContentText>
                <input type="file" className={classes.form} multiple onChange={onChangeHandler}/>

            </FormControl>
          </form>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* <Link to="/"> 
          <Button onClick={handleOpen} color="primary">
            Confirm
          </Button>
          {/* </Link> 
        </DialogActions>
      </Dialog>
    </div>
  );
}


*/