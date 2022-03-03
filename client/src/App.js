
import './App.css';
import Navbar from './component/layout/Navbar';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Home from './component/pages/Home';
import Register from './component/Register';
import Login from './component/Login';
import Contact from "./component/Contact/Contact"
import EditContact from './component/EditContact';

function App() {
  return (
   <>
   
   <Router>
   <div className='App'>
     <Navbar/>
   </div>
     <Switch>
       <Route path="/" exact component={Home}/>
       <Route path="/register"  component={Register}/>
       <Route path="/login"  component={Login}/>
       <Route path="/contact"  component={Contact}/>
       <Route path="/search/:keyword"  component={Contact}/>
       <Route path="/edit/:id"  component={EditContact} exact/>
     </Switch>
   </Router>
   </> 
  );
}

export default App;
