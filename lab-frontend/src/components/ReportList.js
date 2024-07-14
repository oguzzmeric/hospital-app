import React, { useState } from 'react';
import { useGetAllReportsQuery, useDeleteReportMutation } from '../services/report';
import { Link } from 'react-router-dom';
import { TextInput ,ActionIcon ,  Burger, Button, Container , Grid, Group, Loader, Title , Table  } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { MdRefresh } from 'react-icons/md';
import { MdDelete } from "react-icons/md";


const ReportList = () => {
  const { data: reports, error, isLoading, refetch } = useGetAllReportsQuery();
  const [deleteReport, { isLoading: isDeleting, isError: deleteError }] = useDeleteReportMutation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id) => {
    try {
      await deleteReport(id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  
  const filteredReports = reports.filter((report) =>
    report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.laborantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof report.tcNumber === 'string' && report.tcNumber.includes(searchTerm)) ||
    report.id.toString().includes(searchTerm)
  );
  
  const sortedReports = filteredReports.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return (

  <div style={{backgroundColor : '#01393A' , minHeight : '100vh' }} >
    <Container size={'lg'} px={'md'}>
      <header style={{ backgroundColor: '#0B6F70', marginBottom: '1%', padding: '1%' , boxShadow : 'inherit' }}>
        <Group position="apart" align="center">
          <Title size={2} style={{ color: 'white' }}>Report List Panel</Title>
          <Group spacing="lg">
            <Button onClick={refetch} variant='outline' color='blue' style={{ padding: '0.5%', backgroundColor: '#AFAFAF', color: '#0B6F70', borderRadius: '18%', fontSize: '110%' }}>
              Refresh <MdRefresh />
            </Button>
            <Button component={Link} to="/add-report" variant='outline' style={{ marginLeft: '2%', padding: '0.5%', backgroundColor: '#AFAFAF', color: '#0B6F70', borderRadius: '18%', fontSize: '110%' }}>
              Add New Report <IoIosAddCircle />
            </Button>
            <TextInput
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              mb="lg"
              style={{  boxShadow : 'inherit' ,fontSize: '110%', padding: '1%' }}
            />
          </Group>
        </Group>
      </header>

      <div style={{ padding: '3%', backgroundColor: '#0B6F70', color: 'white' }}>
        <Table style={{ textAlign: 'center' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid white' }}>
              <th style={{ padding: '10px', borderBottom: '2px solid white' }}>ID</th>
              <th style={{ padding: '10px', borderBottom: '2px solid white' }}>Patient Name</th>
              <th style={{ padding: '10px', borderBottom: '2px solid white' }}>Laborant Name</th>
              <th style={{ padding: '10px', borderBottom: '2px solid white' }}>Diagnosis</th>
              <th style={{ padding: '10px', borderBottom: '2px solid white' }}>Date</th>
              <th style={{ padding: '10px', borderBottom: '2px solid white' }}>TCK No</th>
              <th style={{ padding: '10px', borderBottom: '2px solid white' }}>Details</th>
              <th style={{ padding: '10px', borderBottom: '2px solid white' }}>Update</th>
              <th style={{ padding: '10px', borderBottom: '2px solid white' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sortedReports.map((report) => (
              <tr key={report.id}>
                <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{report.id}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{report.patientName}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{report.laborantName}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{report.diagnosis}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{new Date(report.date).toLocaleDateString()}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{report.tcNumber}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid white' }}>
                  <ActionIcon component={Link} to={`/report/${report.id}`} variant="light" color="blue" style={{ color: 'white' }}>
                    <FaSearch style={{color : '#0000B0'}} />
                  </ActionIcon>
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid white' }}>
                  <Button component={Link} to={`/update-report/${report.id}`} variant="light" color="blue" style={{ color: 'white' }}>
                    Update
                  </Button>
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid white' }}>
                  <Button  onClick={() => handleDelete(report.id)} variant="filled" disabled={isDeleting} style={{backgroundColor : '#0B6F70'}} >
                    {isDeleting ? 'Deleting...' : <MdDelete style={{color : 'red'}} size={20} />}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  </div>
  );
};

export default ReportList;