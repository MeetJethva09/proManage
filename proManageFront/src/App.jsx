import { useState } from 'react'
import Hero from './components/Hero'
import { Work } from './components/Work'
import {Link} from 'react-router-dom'
import { Route , Routes } from 'react-router-dom'
import { Signup } from './components/Signup'
import axios from 'axios'
import { Login } from './components/Login'
import { Dashboard } from './components/member/Dashboard'
import ManagerDashboard from './components/manager/ManagerDashboard'
import OwnerDashboard from './components/owner/OwnerDashboard'
import MemberNavbar from './components/member/MemberNavbar'
import ManagerNavbar from './components/manager/ManagerNavbar'
import OwnerNavbar from './components/owner/OwnerNavbar'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import OwnerUsersDashboard from './components/owner/OwnerUsersDashbord'
import OwnerUserDetail from './components/owner/OwnerUserDetail'
import OwnerChangeUserRole from './components/owner/OwnerChangeUserRole'
import AssignTask from './components/owner/AssignTask'
import MemberTaskList from './components/member/MemberTaskList'
import TaskDetail from './components/member/TaskDetail'
import AssignTaskList from './components/owner/AssignTaskList'
import CreateWorkspace from './components/owner/workspace/CreateWorkspace'
import CreateProject from './components/owner/workspace/CreateProject'
import AddWorkspaceMembers from './components/owner/workspace/AddWorkspaceMember'
import WorkspacesList from './components/owner/workspace/WorkspaceList'
import { LoginWithOtp } from './components/LoginWithOtp'
import { Email } from './components/Email'



function App() {

axios.defaults.baseURL = 'http://localhost:3000';
  
  return (
    <>
       <Routes>
          <Route path='/' element={<Hero/>}/>
          <Route path='/work' element={<Work/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element ={<Login/>}/>
          <Route path='loginwithotp' element={<LoginWithOtp/>}/>
          <Route path='/validateemail' element={<Email/>}/>
            
            <Route path='/' element={<ProtectedRoutes/>}>
               <Route path='/nav' element={<MemberNavbar/>}>
                     <Route path='user-dashboard' element={<Dashboard/>}/>
                     <Route path='tasks/:id' element={<MemberTaskList/>}/>
                     <Route path='taskdetail/:id' element={<TaskDetail/>}/>
               </Route>


               <Route path='/navm' element={<ManagerNavbar/>}>
                  <Route path='manager-dashboard' element={<ManagerDashboard/>}/>
               </Route>

               <Route path='/navo' element={<OwnerNavbar/>}>
                  <Route path='owner-dashboard' element={<OwnerDashboard/>}/>
                  <Route path='all-users' element={<OwnerUsersDashboard/>}/>
                  <Route path='user/:id' element={<OwnerUserDetail/>}/>  
                  <Route path='modify-role/:id' element={<OwnerChangeUserRole/>}/>
                  <Route path='assign-task/:id' element={<AssignTask/>}/>
                  <Route path='task-list' element={<AssignTaskList/>}/>
                  <Route path='create-work' element={<CreateWorkspace/>}/>
                  <Route path='create-project' element={<CreateProject/>}/>
                  <Route path='add-user-work/:wid' element={<AddWorkspaceMembers/>}/>
                  <Route path='work-list' element={<WorkspacesList/>}/>
               </Route>
            </Route>

       </Routes>
    </>
  )
}

export default App
