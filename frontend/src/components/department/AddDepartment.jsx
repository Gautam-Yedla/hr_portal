// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CircularProgress, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material'; 
// import { motion } from 'framer-motion'; 

// const AddDepartment = () => {
//     const [department, setDepartment] = useState({
//        dep_name: '',
//        description: '',
//        head: '', 
//        status: 'active', 
//        notes: '' 
//     });
//     const [loading, setLoading] = useState(false); 
//     const [users, setUsers] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch users to assign as department heads
//         const fetchUsers = async () => {
//             try {
//                 // Mock data
//                 const mockUsers = [
//                     { id: 1, name: 'Head01' },
//                     { id: 2, name: 'Head02' },
//                     { id: 3, name: 'Head03' },
//                 ];
//                 setUsers(mockUsers);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };
//         fetchUsers();
//     }, []);

//     const handleChange = (e) => {
//        const { name, value } = e.target;
//        setDepartment({ ...department, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!department.dep_name || !department.description || !department.head) {
//             alert("All fields are required.");
//             return;
//         }

//         setLoading(true); 

//         try {
//             const response = await axios.post('https://hr-sample-backend.onrender.com/api/department/add', department, {
//                 headers: {
//                     "Authorization": `Bearer ${localStorage.getItem("token")}`
//                 }
//             });

//             if (response.data.success) {
//                 alert("Department added successfully!");
//                 setDepartment({ dep_name: '', description: '', head: '', status: 'active', notes: '' }); 
//                 navigate("/admin-dashboard/departments"); 
//             }
//         } catch (error) {
//             if (error.response && !error.response.data.success) {
//                 alert(error.response.data.error);
//             }
//         } finally {
//             setLoading(false); 
//         }
//     };

//   return (
//     <div className="min-h-screen flex flex-col px-6 py-4 bg-gradient-to-r from-teal-200 via-teal-400 to-teal-600">
//       <motion.div
//         className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-in-out"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ type: 'spring', stiffness: 120, damping: 25 }}
//       >
//         <h3 className="text-4xl font-semibold text-gray-800 mb-6">Add New Department</h3>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Department Name */}
//           <div>
//             <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700">
//               Department Name
//             </label>
//             <input
//               type="text"
//               id="dep_name"
//               name="dep_name"
//               value={department.dep_name}
//               onChange={handleChange}
//               placeholder="Enter department name"
//               className="mt-2 block w-full p-2 text-lg border-2 border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={department.description}
//               placeholder="Enter department description"
//               onChange={handleChange}
//               className="mt-2 block w-full p-5 text-lg border-2 border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//             ></textarea>
//           </div>

//           {/* Department Head (Dropdown) */}
//           <div>
//             <FormControl fullWidth>
//               <InputLabel id="head-label">Department Head</InputLabel>
//               <Select
//                 labelId="head-label"
//                 id="head"
//                 name="head"
//                 value={department.head}
//                 onChange={handleChange}
//                 className="mt-2 text-lg border-2 border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//               >
//                 {users.map((user) => (
//                   <MenuItem key={user.id} value={user.id}>
//                     {user.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>

//           {/* Status (Active/Inactive Toggle) */}
//           <div>
//             <label htmlFor="status" className="block text-sm font-medium text-gray-700">
//               Status
//             </label>
//             <select
//               id="status"
//               name="status"
//               value={department.status}
//               onChange={handleChange}
//               className="mt-2 block w-full p-2 text-lg border-2 border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>

//           {/* Notes */}
//           <div>
//             <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
//               Additional Notes (Optional)
//             </label>
//             <TextField
//               id="notes"
//               name="notes"
//               value={department.notes}
//               onChange={handleChange}
//               placeholder="Enter additional notes"
//               multiline
//               rows={4}
//               variant="outlined"
//               fullWidth
//               className="mt-2 border-2 border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//             />
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             disabled={loading} // Disable button when loading
//             className={`w-full py-5 px-6 rounded-md font-semibold text-white transition-all duration-300 ${loading ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-500'}`}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {loading ? <CircularProgress size={24} className="mx-auto" /> : "Add Department"}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default AddDepartment;













import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, MenuItem, Select, FormControl, InputLabel, TextField, Typography, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: '',
        head: '',
        status: 'active',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const mockUsers = [
                    { id: 1, name: 'Head01' },
                    { id: 2, name: 'Head02' },
                    { id: 3, name: 'Head03' },
                ];
                setUsers(mockUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!department.dep_name || !department.description || !department.head) {
            alert("All fields are required.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://hr-sample-backend.onrender.com/api/department/add', department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data.success) {
                alert("Department added successfully!");
                setDepartment({ dep_name: '', description: '', head: '', status: 'active', notes: '' });
                navigate("/admin-dashboard/departments");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
            <Grid item xs={12} sm={10} md={8} lg={6}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper elevation={4} style={{ padding: '2rem', borderRadius: '12px' }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Add New Department
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {/* Department Name */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Department Name"
                                        id="dep_name"
                                        name="dep_name"
                                        value={department.dep_name}
                                        onChange={handleChange}
                                        placeholder="Enter department name"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                {/* Description */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        id="description"
                                        name="description"
                                        value={department.description}
                                        onChange={handleChange}
                                        placeholder="Enter department description"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                {/* Department Head */}
                                <Grid item xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel id="head-label">Department Head</InputLabel>
                                        <Select
                                            labelId="head-label"
                                            id="head"
                                            name="head"
                                            value={department.head}
                                            onChange={handleChange}
                                        >
                                            {users.map((user) => (
                                                <MenuItem key={user.id} value={user.id}>
                                                    {user.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Status */}
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="status-label">Status</InputLabel>
                                        <Select
                                            labelId="status-label"
                                            id="status"
                                            name="status"
                                            value={department.status}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="active">Active</MenuItem>
                                            <MenuItem value="inactive">Inactive</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Additional Notes */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Additional Notes (Optional)"
                                        id="notes"
                                        name="notes"
                                        value={department.notes}
                                        onChange={handleChange}
                                        placeholder="Enter any additional notes"
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        disabled={loading}
                                        size="large"
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : "Add Department"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </motion.div>
            </Grid>
        </Grid>
    );
};

export default AddDepartment;
