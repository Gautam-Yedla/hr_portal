// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/authContext';
// import axios from 'axios';

// const Setting = () => {

//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [setting, setSetting] = useState({
//     userId: user._id,
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSetting({ ...setting, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (setting.newPassword !== setting.confirmPassword) {
//       setError('Passwords do not match');
//     } else {
//       try {
//         const response = await axios.put(
//           `https://hr-sample-backend.onrender.com/api/setting/change-password`,
//           setting,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           }
//         );
//         if (response.data.success) {
//           navigate('/admin-dashboard/employees');
//           setError("");
//         }
//       } catch (error) {
//         if (error.response && !error.response.data.success) {
//           setError(error.response.data.error);
//         }
//       }
//     }
//   }

//   return (
//     <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
//       <h2 className='text-2xl font-semibold text-gray-800 text-center mb-6 transform transition-all hover:scale-105'>
//         Change Password
//       </h2>
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//       <form onSubmit={handleSubmit} className='space-y-4'>
        
//         <div>
//           <label className='block text-sm font-medium text-gray-700'>
//             Old Password
//           </label>
//           <input
//             type='password'
//             name='oldPassword'
//             placeholder='Enter old password'
//             onChange={handleChange}
//             className='mt-1 p-2 block w-full border border-gray-300 rounded-md transition-all focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transform hover:scale-105'
//             required
//           />
//         </div>

//         <div>
//           <label className='block text-sm font-medium text-gray-700'>
//             New Password
//           </label>
//           <input
//             type='password'
//             name='newPassword'
//             placeholder='Enter new password'
//             onChange={handleChange}
//             className='mt-1 p-2 block w-full border border-gray-300 rounded-md transition-all focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transform hover:scale-105'
//             required
//           />
//         </div>

//         <div>
//           <label className='block text-sm font-medium text-gray-700'>
//             Confirm Password
//           </label>
//           <input
//             type='password'
//             name='confirmPassword'
//             placeholder='Confirm new password'
//             onChange={handleChange}
//             className='mt-1 p-2 block w-full border border-gray-300 rounded-md transition-all focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transform hover:scale-105'
//             required
//           />
//         </div>

//         <button
//           type='submit'
//           className='mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-md transition-all transform hover:scale-105 shadow-lg'
//         >
//           Change Password
//         </button>
//       </form>
//     </div>
//   )
// }

// export default Setting;



















import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { 
  Container, TextField, Button, Typography, FormControlLabel, Checkbox, Select, 
  MenuItem, InputLabel, FormControl, Card, CardContent, Avatar, Tabs, Tab, Box 
} from '@mui/material';

const Setting = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // Get user and setUser from context
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({
    userId: user?._id || '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    profilePicture: null,
    enable2FA: false,
    securityQuestion: '',
    securityAnswer: '',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    accountAction: '',
  });

  const [error, setError] = useState(null);
  
  // Fetch updated user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://hr-sample-backend.onrender.com/api/setting/get-profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (response.data.success) {
          setUser(response.data.user); // Update user context
          setFormData((prev) => ({ ...prev, ...response.data.user })); // Update form data
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('notifications')) {
      // Handle nested state update for notifications
      const notificationKey = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationKey]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profilePicture: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const formDataToSend = new FormData();

        // Append userId as a string (ensure it's being sent correctly)
        formDataToSend.append("userId", String(formData.userId)); 
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);

        if (formData.profilePicture) {
            formDataToSend.append("profilePicture", formData.profilePicture);
        }

        formDataToSend.append("notifications", JSON.stringify(formData.notifications));

        console.log("🔹 Sending Data:", Object.fromEntries(formDataToSend));

        const response = await axios.put(
            "https://hr-sample-backend.onrender.com/api/setting/update-profile",
            formDataToSend,
            { 
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`, 
                    'Content-Type': 'multipart/form-data' 
                }
            }
        );

        if (response.data.success) {
            setUser(response.data.user);
            navigate("/admin-dashboard");
            setError(null);
        }
    } catch (error) {
        console.error("❌ Error updating profile:", error.response?.data || error);
        setError(error.response?.data?.error || "Something went wrong");
    }
};




  return (
    <Container maxWidth='md'>
      <Card variant='outlined' sx={{ p: 3, mt: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant='h4' gutterBottom>Settings</Typography>
          {error && <Typography color='error'>{error}</Typography>}
          
          <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
            <Tab label='Profile' />
            <Tab label='Security' />
            <Tab label='Notifications' />
            <Tab label='Account' />
          </Tabs>
          
          {tab === 0 && (
            <Box mt={3}>
              <Typography variant='h6'>Profile Settings</Typography>
              <Avatar 
                src={formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : user?.profilePicture || ''} 
                sx={{ width: 80, height: 80, mb: 2 }} 
              />
              <input type='file' name='profilePicture' onChange={handleProfilePictureChange} />
              <TextField fullWidth label='Name' name='name' value={formData.name} onChange={handleChange} margin='normal' />
              <TextField fullWidth label='Email' name='email' value={formData.email} onChange={handleChange} margin='normal' />
              <TextField fullWidth label='Phone Number' name='phone' value={formData.phone} onChange={handleChange} margin='normal' />
            </Box>
          )}

          {tab === 1 && (
            <Box mt={3}>
              <Typography variant='h6'>Security Settings</Typography>
              <TextField fullWidth type='password' label='Old Password' name='oldPassword' onChange={handleChange} margin='normal' />
              <TextField fullWidth type='password' label='New Password' name='newPassword' onChange={handleChange} margin='normal' />
              <TextField fullWidth type='password' label='Confirm Password' name='confirmPassword' onChange={handleChange} margin='normal' />
              <FormControlLabel control={<Checkbox checked={formData.enable2FA} onChange={handleChange} name='enable2FA' />} label='Enable 2FA' />
              <TextField fullWidth label='Security Question' name='securityQuestion' onChange={handleChange} margin='normal' />
              <TextField fullWidth label='Security Answer' name='securityAnswer' onChange={handleChange} margin='normal' />
            </Box>
          )}

          {tab === 2 && (
            <Box mt={3}>
              <Typography variant='h6'>Notification Preferences</Typography>
              <FormControlLabel control={<Checkbox checked={formData.notifications.email} onChange={handleChange} name='notifications.email' />} label='Email' />
              <FormControlLabel control={<Checkbox checked={formData.notifications.sms} onChange={handleChange} name='notifications.sms' />} label='SMS' />
              <FormControlLabel control={<Checkbox checked={formData.notifications.push} onChange={handleChange} name='notifications.push' />} label='Push Notifications' />
            </Box>
          )}

          {tab === 3 && (
            <Box mt={3}>
              <Typography variant='h6'>Account Management</Typography>
              <FormControl fullWidth margin='normal'>
                <InputLabel>Account Action</InputLabel>
                <Select name='accountAction' value={formData.accountAction} onChange={handleChange}>
                  <MenuItem value=''>Select Action</MenuItem>
                  <MenuItem value='deactivate'>Deactivate Account</MenuItem>
                  <MenuItem value='delete'>Delete Account</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          
          <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>Save Settings</Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Setting;













