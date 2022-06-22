//styles
import './App.css'
// page components
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Recipe from './pages/recipe/Recipe'
import Search from './pages/search/Search'
import Navbar from './components/Navbar'
import Update from './pages/update/Update'
import ThemeSelector from './components/ThemeSelector'
import { useTheme } from './hooks/useTheme'
import Signup from './pages/singup/Signup'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import UpdateProfile from './pages/updateProfile/UpdateProfile'


function App() {

  const {mode} = useTheme()


  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute path='/create' component={Create} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <PrivateRoute path='/update-profile' component={UpdateProfile} />
          <PrivateRoute path='/profile' component={Profile} />
          <PrivateRoute path='/search' component={Search} />
          <PrivateRoute path='/recipes/:id' component={Recipe} />
          <PrivateRoute path='/update/:id' component={Update} />
          <Route path='/forgot-password' component={ForgotPassword} />
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App

