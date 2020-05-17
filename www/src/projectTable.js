import React,{Component} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { withStyles } from "@material-ui/core/styles";
import SimpleMenu from './ServicesMenu';

function preventDefault(event) {
  event.preventDefault();
}

const styles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
});

class ProjectTable extends Component {
  constructor(props){
    super(props)
    this.state={
      projectData:[]
    }
  }

  reload(){
    console.log("entering")
    fetch('/api/ListProjectFiles')
      .then(response => response.json())
      .then(data => {this.setState({ projectData:data });console.log(this.state.projectData)});
      
  }
  
  componentDidMount() {
    fetch('/api/ListProjectFiles')
      .then(response => response.json())
      .then(data => {this.setState({ projectData:data });console.log(this.state.projectData)});
      
  }
   FileDownload(Projectname, filename){
     fetch('/api/DownloadFile/'+Projectname+'/'+filename)
     .then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
      });
    });
  }
  render(){
    const { classes } = this.props;
    const { projectData } = this.state;
  return (
    <React.Fragment>
    <br></br>
      <Title>Project List <button onclick={this.reload}>Reload</button></Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell>Files</TableCell>
            <TableCell> Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectData.map((row) => (
            <TableRow >
              <TableCell>{row.ProjectName}</TableCell>
              <a onClick={() => this.FileDownload(row.ProjectName,row.File)}>
              <TableCell>{row.File}</TableCell>
              </a>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}
}
export default withStyles(styles, { withTheme: true })(ProjectTable);