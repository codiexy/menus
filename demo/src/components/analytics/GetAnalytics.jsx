import React, { useEffect, useState } from 'react'
import firebase from './FireBase';
import { Bar } from "react-chartjs-2";
import { db } from '../../firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CardContent, Card, Typography, Grid } from '@mui/material';
import { Cell, PieChart, Pie, ResponsiveContainer } from "recharts";


const data = [
  { name: "Facebook", value: 300 },
  { name: "LinkedIn", value: 600 },
  { name: "Instagram", value: 300 },
];
const COLORS = [
  "orange",
  "purple",
  "skyblue"
  
];



export default function GetAnalytics() {

  const [userData, setUserData] = useState([]);
  const [urls, setUrls] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      const usersRef = firebase.firestore().collection("users");
      const snapshot = await usersRef.get();
      const data = snapshot.docs.map((doc) => doc.data());

      setUserData(data);
    };
    fetchUserData();
  }, []);

  const getDeviceCounts = () => {
    const deviceCounts = {};
    userData.forEach((user) => {
      if (deviceCounts[user.device]) {
        deviceCounts[user.device]++;
      } else {
        deviceCounts[user.device] = 1;
      }
    });
    return deviceCounts;
  };

  let renderLabel = function(entry) {
    return entry.name;
}


  return (
    <div>
      <h1>Get Analytics</h1>
      {/* {renderChart()} */}
      <div>
        <Grid item container>
          <Grid md={7}>
            <Card>
              <Typography>Most Visited Pages</Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Page Name</TableCell>
                      <TableCell align="right">Visitors</TableCell>
                      <TableCell align="right">Unique Page Visits</TableCell>
                      <TableCell align="right">Bounce Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {urls.map((url) => (
                      <TableRow
                        key={url.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {url.name}
                        </TableCell>
                        <TableCell align="right">{url.calories}</TableCell>
                        <TableCell align="right">{url.fat}</TableCell>
                        <TableCell align="right">{url.carbs}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
          <Grid md={5}>
            <ResponsiveContainer maxHeight={400} aspect={1}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={data}
                  cx={300}
                  cy={200}
                  labelLine={false}
                  label={renderLabel}
                  innerRadius={100}
                >
                  {data.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} key={`cell-${index}`} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </div>

    </div>
  )
}
