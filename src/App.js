import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import TaskPage from './components/Task/TaskPage';
import CategoriesPage from './components/Category/CategoriesPage';
import AddTask from './components/Task/AddTask';
import HomePage from './components/HomePage';
import LogIn from './components/authentication/LogIn';
import SignUp from './components/authentication/SignUp';
import EmailVerify from './components/authentication/EmailVerify';
import ForgotPassword from './components/ForgetPassword/ForgotPassword';
import Done from './components/Status/Done';
import Inprogress from './components/Status/Inprogress';
import Notyet from './components/Status/Notyet';
import UpdateTask from './components/Task/UpdateTask';
import TasksInCategory from './components/Category/TasksInCategory';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import NotFound from './components/NotFound';
import ResetPassword from './components/ForgetPassword/ResetPassword';
import EmailSent from './components/ForgetPassword/EmailSent';
import ChangePassword from './components/ForgetPassword/ChangePassword';
import PasswordVerified from './components/authentication/PasswordVerified';
import Dashboard from './components/Admin/Dashboard';
import Feedback from './components/Feedback/Feedback';

function App() {
  return (
    <div className='bg-white'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-sending" element={<EmailSent />} />
        <Route path="/reset-password" element={<ChangePassword />} />
        <Route path="/reset-password/success" element={<ResetPassword />} />
        <Route path="/email-verify/success" element={<PasswordVerified />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/unauthorize" element={<Unauthorized />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute element={Dashboard}/>} />
        <Route path="/feedback" element={<ProtectedRoute element={Feedback}/>} />
        <Route path="/home" element={<ProtectedRoute element={HomePage} />} />
        <Route path="/home/tasks" element={<ProtectedRoute element={TaskPage} />} />
        <Route path="/home/tasks/category/:category_id" element={<ProtectedRoute element={TasksInCategory} />} />
        <Route path="/home/tasks/add" element={<ProtectedRoute element={AddTask} />} />
        <Route path="/home/tasks/update/:taskId" element={<ProtectedRoute element={UpdateTask} />} />
        <Route path="/home/categories" element={<ProtectedRoute element={CategoriesPage} />} />
        <Route path="/home/status/done" element={<ProtectedRoute element={Done} />} />
        <Route path="/home/status/inprogress" element={<ProtectedRoute element={Inprogress} />} />
        <Route path="/home/status/notyet" element={<ProtectedRoute element={Notyet} />} />
        <Route path="*" element={<NotFound/>} /> 
      </Routes>
    </div>
  );
}

export default App;
