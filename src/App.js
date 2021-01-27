import  React from 'react';      
import {  BrowserRouter as Router ,Redirect,Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ClassLists from './ClassLists';
import Single from './Single';

const history = createBrowserHistory();
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error:null,
      isPending:true,
      data:null,
      search:null
    }
  }
  componentDidMount(){
    fetch('https://class-cards-nk.herokuapp.com/classes/')
    .then((res)=>{
      if(!res.ok){
        throw Error("cannot fetch the data");
      }
      return res.json();
    })
    .then((data)=>{
      this.setState({
        isPending:false,
        data:data
      })
    })
    .catch((err)=>{
      this.setState({
        err:err
      })
    })
  }
  handleChange = event => {
    this.setState({ search: event.target.value });
  };
  
  render(){
  const search = this.state.search;
  const data = this.state.data;
  const error = this.state.error;
  const isPending = this.state.isPending;
  const id = this.state.class_;
  const classes = data ? data.filter((element)=>{
    if(search === null){
         return element;
    }else if(element.class ==search ||element.subject.toLowerCase().includes(search.toLowerCase())){
         return element;
    }
  }):null;
  return (
    <div className="App"> 
      <Router history={history}>
        <Switch>
          <Route exact path='/'><ClassLists error={error} classes={classes} isPending={isPending} search={search} handleChange={this.handleChange} getSingle={this.getSingle} /></Route>
          <Route path='/class/:id'><Single /></Route>
        </Switch>
      </Router>
    </div>
  );
}
}

export default App;
