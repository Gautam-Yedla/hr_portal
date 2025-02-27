// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, Grid, CardActions, Button, CircularProgress, LinearProgress, Tooltip } from '@mui/material';
// import { motion } from 'framer-motion';
// import { Group, Domain, AttachMoney, CheckCircle, HourglassEmpty, Cancel } from '@mui/icons-material';
// import CountUp from 'react-countup'; // For animated number counters
// import { Line } from 'react-chartjs-2'; // For a simple line graph (can be replaced with your desired chart type)
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);
// import { useNavigate } from 'react-router-dom';

// const AdminSummary = () => {
//   const [summary, setSummary] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const summary = await axios.get('https://hr-sample-backend.onrender.com/api/dashboard/summary', {
//           headers: {
//             "Authorization": `Bearer ${localStorage.getItem('token')}`,
//           }
//         });
//         setSummary(summary.data);
//         setLastUpdated(new Date().toLocaleString());  
//       } catch (error) {
//         if (error.response) {
//           alert(error.response.data.error);
//         }
//         console.error(error.message);
//       }
//     };
//     fetchSummary();
//   }, []);

//   if (!summary) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <CircularProgress />
//       </div>
//     );
//   }

//   const dataForGraph = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         label: 'Leave Applications',
//         data: [25, 30, 20, 45, 60, 50],
//         fill: false,
//         borderColor: '#34D399', 
//         tension: 0.1
//       }
//     ]
//   };

//   return (
//     <div className="p-6">
//       <Typography variant="h4" fontWeight={600} color="textPrimary" gutterBottom>
//         Dashboard Overview
//       </Typography>

//       <Typography variant="body2" color="textSecondary" align="right" className="mb-4">
//         Last Updated: {lastUpdated}
//       </Typography>

//       <Grid container spacing={4} className="mt-6">
//         {/* Employee Card */}
//         <Grid item xs={12} sm={6} md={4}>
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
//               <CardContent>
//                 <Group fontSize="large" style={{ color: '#1E3A8A' }} />
//                 <Typography variant="h6" fontWeight={500} color="textSecondary" gutterBottom>
//                   Total Employees
//                 </Typography>
//                 <Typography variant="h4" fontWeight={600} color="primary">
//                   <CountUp start={0} end={summary.totalEmployees} duration={2} separator="," />
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small" color="primary" onClick={() => navigate('/admin-dashboard/employees')}>View Details</Button>
//               </CardActions>
//             </Card>
//           </motion.div>
//         </Grid>

//         {/* Department Card */}
//         <Grid item xs={12} sm={6} md={4}>
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
//               <CardContent>
//                 <Domain fontSize="large" style={{ color: '#6B21A8' }} />
//                 <Typography variant="h6" fontWeight={500} color="textSecondary" gutterBottom>
//                   Total Departments
//                 </Typography>
//                 <Typography variant="h4" fontWeight={600} color="primary">
//                   <CountUp start={0} end={summary.totalDepartments} duration={2} separator="," />
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small" color="primary" onClick={() => navigate('/admin-dashboard/departments')}>View Details</Button>
//               </CardActions>
//             </Card>
//           </motion.div>
//         </Grid>

//         {/* Salary Card */}
//         <Grid item xs={12} sm={6} md={4}>
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
//               <CardContent>
//                 <AttachMoney fontSize="large" style={{ color: '#10B981' }} />
//                 <Typography variant="h6" fontWeight={500} color="textSecondary" gutterBottom>
//                   Monthly Salary
//                 </Typography>
//                 <Typography variant="h4" fontWeight={600} color="primary">
//                   <CountUp start={0} end={summary.totalSalaries} duration={2} separator="," prefix="$" />
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small" color="primary">View Details</Button>
//               </CardActions>
//             </Card>
//           </motion.div>
//         </Grid>
//       </Grid>

//       <div className="mt-12">
//         <Typography variant="h5" fontWeight={600} color="textPrimary" gutterBottom align="center">
//           Leave Details
//         </Typography>

//         <Grid container spacing={4}>
//           {/* Leave Cards */}
//           <Grid item xs={12} sm={6} md={3}>
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
//                 <CardContent>
//                   <CheckCircle fontSize="large" style={{ color: '#16A34A' }} />
//                   <Typography variant="h6" fontWeight={500} color="textSecondary" gutterBottom>
//                     Leaves Approved
//                   </Typography>
//                   <Typography variant="h4" fontWeight={600} color="primary">
//                     {summary.leaveSummary.approved}
//                   </Typography>
//                   <LinearProgress variant="determinate" value={(summary.leaveSummary.approved / summary.leaveSummary.appliedFor) * 100} className="mt-2" />
//                 </CardContent>
//                 <CardActions>
//                   <Button size="small" color="primary" onClick={() => navigate('/admin-dashboard/leaves')}>View Details</Button>
//                 </CardActions>
//               </Card>
//             </motion.div>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
//                 <CardContent>
//                   <HourglassEmpty fontSize="large" style={{ color: '#F59E0B' }} />
//                   <Typography variant="h6" fontWeight={500} color="textSecondary" gutterBottom>
//                     Leaves Pending
//                   </Typography>
//                   <Typography variant="h4" fontWeight={600} color="primary">
//                     {summary.leaveSummary.pending}
//                   </Typography>
//                   <LinearProgress variant="determinate" value={(summary.leaveSummary.pending / summary.leaveSummary.appliedFor) * 100} className="mt-2" />
//                 </CardContent>
//                 <CardActions>
//                 <Button size="small" color="primary" onClick={() => navigate('/admin-dashboard/leaves')}>View Details</Button>
//                 </CardActions>
//               </Card>
//             </motion.div>
//           </Grid>

//           {/* Graph */}
//           <Grid item xs={12}>
//             <Card className="shadow-lg">
//               <CardContent>
//                 <Typography variant="h6" fontWeight={500} color="textSecondary" gutterBottom>
//                   Leave Applications Trend (Last 6 Months)
//                 </Typography>
//                 <Line data={dataForGraph} />
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// };

// export default AdminSummary;















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, CardActions, Button, CircularProgress, LinearProgress, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Group, Domain, AttachMoney, CheckCircle, HourglassEmpty, Notifications } from '@mui/icons-material';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import { fetchAnnouncements } from '../../utils/AnnouncementHelper';

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('https://hr-sample-backend.onrender.com/api/dashboard/summary', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setSummary(summary.data);
        setLastUpdated(new Date().toLocaleString());
      } catch (error) {
        console.error(error.message);
      }
    };

    const loadAnnouncements = async () => {
      const data = await fetchAnnouncements();
      setAnnouncements(data);
    };

    fetchSummary();
    loadAnnouncements();
  }, []);

  if (!summary) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <CircularProgress />
      </div>
    );
  }

  // Filter Announcements
  const filteredAnnouncements = announcements.filter((ann) => {
    if (filter === 'latest') {
      return new Date(ann.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Last 7 days
    }
    if (filter === 'important') {
      return ann.isImportant;
    }
    return true;
  });

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h4" fontWeight={600} color="textPrimary" gutterBottom>
        Dashboard Overview
      </Typography>

      <Typography variant="body2" color="textSecondary" align="right" className="mb-4">
        Last Updated: {lastUpdated}
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={4}>
        {/* Total Employees */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg hover:shadow-2xl transition-all">
              <CardContent>
                <Group fontSize="large" style={{ color: '#1E3A8A' }} />
                <Typography variant="h6" color="textSecondary">Total Employees</Typography>
                <Typography variant="h4" color="primary">
                  <CountUp start={0} end={summary.totalEmployees} duration={2} separator="," />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => navigate('/admin-dashboard/employees')}>View Details</Button>
              </CardActions>
            </Card>
          </motion.div>
        </Grid>

        {/* Total Departments */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg hover:shadow-2xl transition-all">
              <CardContent>
                <Domain fontSize="large" style={{ color: '#6B21A8' }} />
                <Typography variant="h6" color="textSecondary">Total Departments</Typography>
                <Typography variant="h4" color="primary">
                  <CountUp start={0} end={summary.totalDepartments} duration={2} separator="," />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => navigate('/admin-dashboard/departments')}>View Details</Button>
              </CardActions>
            </Card>
          </motion.div>
        </Grid>

        {/* Monthly Salary */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg hover:shadow-2xl transition-all">
              <CardContent>
                <AttachMoney fontSize="large" style={{ color: '#10B981' }} />
                <Typography variant="h6" color="textSecondary">Monthly Salary</Typography>
                <Typography variant="h4" color="primary">
                  <CountUp start={0} end={summary.totalSalaries} duration={2} separator="," prefix="$" />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">View Details</Button>
              </CardActions>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Leave Details */}
      <div className="mt-12">
        <Typography variant="h5" fontWeight={600} color="textPrimary" gutterBottom align="center">
          Leave Details
        </Typography>

        <Grid container spacing={4}>
          {/* Approved Leaves */}
          <Grid item xs={12} sm={6} md={3}>
            <Card className="shadow-lg hover:shadow-2xl">
              <CardContent>
                <CheckCircle fontSize="large" style={{ color: '#16A34A' }} />
                <Typography variant="h6" color="textSecondary">Leaves Approved</Typography>
                <Typography variant="h4" color="primary">{summary.leaveSummary.approved}</Typography>
                <LinearProgress variant="determinate" value={(summary.leaveSummary.approved / summary.leaveSummary.appliedFor) * 100} className="mt-2" />
              </CardContent>
            </Card>
          </Grid>

          {/* Pending Leaves */}
          <Grid item xs={12} sm={6} md={3}>
            <Card className="shadow-lg hover:shadow-2xl">
              <CardContent>
                <HourglassEmpty fontSize="large" style={{ color: '#F59E0B' }} />
                <Typography variant="h6" color="textSecondary">Leaves Pending</Typography>
                <Typography variant="h4" color="primary">{summary.leaveSummary.pending}</Typography>
                <LinearProgress variant="determinate" value={(summary.leaveSummary.pending / summary.leaveSummary.appliedFor) * 100} className="mt-2" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* Notifications Section */}
      <div className="mt-12">
        <Typography variant="h5" fontWeight={600} color="textPrimary" gutterBottom align="center">
          <Notifications style={{ verticalAlign: 'middle', marginRight: 8 }} /> Notifications
        </Typography>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
          <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={() => setFilter('all')} color="primary">All</Button>
          <Button variant={filter === 'latest' ? 'contained' : 'outlined'} onClick={() => setFilter('latest')} color="info">Latest</Button>
          <Button variant={filter === 'important' ? 'contained' : 'outlined'} onClick={() => setFilter('important')} color="error">Important</Button>
        </div>

        {/* Announcements Grid */}
        <Grid container spacing={3} justifyContent="center">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((ann) => (
              <Grid item xs={12} md={5} lg={4} key={ann._id}>
                <Card className="shadow-lg hover:shadow-2xl transition-transform"
                  style={{
                    borderLeft: ann.isImportant ? '5px solid #EF4444' : '5px solid #3B82F6',
                    backgroundColor: ann.isImportant ? '#FEF2F2' : '#FFFFFF',
                    borderRadius: '8px',
                    minHeight: '120px',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} style={{ display: 'flex', alignItems: 'center' }}>
                      {ann.title}
                      {ann.isImportant && <Chip label="Important" color="error" size="small" style={{ marginLeft: 8 }} />}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">{new Date(ann.createdAt).toLocaleDateString()}</Typography>
                    <Typography variant="body1" className="mt-2">{ann.content}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => navigate('/admin-dashboard/announcements')}>
                      View Full Announcement
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary" align="center">No announcements found.</Typography>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default AdminSummary;

