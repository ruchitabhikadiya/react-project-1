// import logo from './logo.svg';
import './App.css';
import { Box, Button, Typography } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Layout from './Pages/Layout';
import Dashboard from './Pages/Dashboard';
// import Category from '@mui/icons-material/Category';
import Category from './Pages/Category'
import QandA from './Pages/QandA';
import Subcategory from './Pages/Subcategory';
import Login from './Pages/Login';
import Mainpage from './Pages/Mainpage';
// import Categorymainpage from './Pages/Categorymainpage';
import Maincategory from './Pages/Maincategory';
import Mainheader from './Pages/Mainheader';
import Mainsubcategory from './Pages/Mainsubcategory';
import Mainquestion from './Pages/Mainquestion';
import Allsubcategory from './Pages/Allsubcategory';
import Allquestion from './Pages/Allquestion';
import Signup from './Pages/Signup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path = '/dashboard'>
          <Layout>
            <Dashboard />
          </Layout>
        </Route>

        <Route path = '/category'>
          <Layout>
            <Category />
          </Layout>
        </Route>

        <Route path = '/subcategory'>
          <Layout>
            <Subcategory />
          </Layout>
        </Route>

        <Route path = '/qanda'>
          <Layout>
            <QandA/>
          </Layout>
        </Route>

        <Route  path='/admin/login'>
          <Login/>
        </Route>

        <Route  path='/signup'>
          <Signup/>
        </Route>

        <Route exact path='/'>  
          <Mainpage/>
        </Route>
        
        <Route path='/Categorymainpage'>
          <Mainheader/>
          <Maincategory/>
        </Route>

        <Route path='/Mainsubcategory'>
          <Mainheader/>
          <Mainsubcategory/>
        </Route>

        <Route path='/Mainquestion'>
          <Mainheader/>
          <Mainquestion/>
        </Route>

        <Route path='/Allsubcategory'>
          <Mainheader/>
          <Allsubcategory/>
        </Route>

        <Route path='/Allquestion'>
          <Mainheader/>
          <Allquestion/>
        </Route>
        

      </Switch>
    </Router>

    
    </>
  );
}

export default App;
