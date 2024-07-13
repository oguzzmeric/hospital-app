import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetReportByIdQuery , useDeleteReportMutation } from '../services/report';
import {Paper , Image , Button ,CloseButton ,Card, Text, Loader, Badge, Group, Container, Center } from '@mantine/core';
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { MdDelete } from "react-icons/md";



const ReportDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const {data : report , error , isLoading , refetch} = useGetReportByIdQuery(id);
    const [deleteReport, { isLoading: isDeleting, isError: deleteError }] = useDeleteReportMutation();


    const handleDelete = async (id) => {
        try {
          await deleteReport(id);
          navigate('/')
          //refetch();
        } catch (error) {
          console.log(error);
        }
      };

    if(isLoading) return <div>page is loading</div>
    if(error) return <div>error happend : {error.message}</div>

    console.log('report' , report);
    
    return(
  <div>   
    <div style={{minHeight : '100vh', display : 'grid' , backgroundColor : '#01393A '}}> 
        <Card shadow='sm' padding={"lg"} radius={"md"} withBorder  style={{ borderRadius : '7%' ,backgroundColor : '#0B6F70' , alignItems : 'center', marginLeft : '30%',marginRight : '30%' ,padding : '2%' ,marginBottom:'30%' , marginTop : '10%' , textAlign : 'center', alignContent : 'center'}}>
            <Group style={{display : 'flex' , justifyContent : 'space-between'}}>
                <Button component={Link} to="/" variant="filled" style={{}} > <RiArrowGoBackFill style={{backgroundColor : 'white' , color : 'darkslateblue' , borderRadius: '18%', fontSize: '110%' }}  size={30}/> </Button>
                <Button component={Link} to="/add-report" variant='filled' style={{  }}>  <IoIosAddCircle  style={{backgroundColor : 'white' , color : 'green' , borderRadius: '18%', fontSize: '110%'}} size={30} /> </Button>
                <Button onClick={() => handleDelete(report.id)} variant='filled' style={{}} ><MdDelete style={{backgroundColor : 'white' , color : 'red' , borderRadius: '18%', fontSize: '110%'}} size={30} /></Button>
            </Group>              
              <Text size="lg" style={{ color: 'white' , fontSize : '100%', maxWidth: '100%' }}>
                  Patient Name: <Text component="span" weight={700} style={{fontSize : '110%'}}>{report.patientName}</Text>
              </Text>
              <Text size="lg" style={{ color: 'white' , fontSize : '100%', maxWidth: '100%'}}>
                  Laborant Name: <Text component="span" weight={700} color="dark">{report.laborantName}</Text>
              </Text>
              <Text size="lg" style={{ color: 'white' , fontSize : '100%', maxWidth: '100%'}}>
                  Details: <Text component="span" weight={700} color="dark">{report.details}</Text>
              </Text>
              <Text size="lg" style={{ color: 'white' , fontSize : '100%', maxWidth: '100%'}}>
                  TC Number: <Text component="span" weight={700} color="dark">{report.tcNumber}</Text>
              </Text>
              {report.image && (
                        <Image
                            src={report.image}
                            alt='report image'
                            style={{
                                marginTop: '20px',
                                maxHeight: '400px',
                                objectFit: 'contain',
                                width: '100%'
                            }}
                        />
                    )}
              
              <Badge color="green" variant="filled" size="md">{new Date(report.date).toLocaleDateString()}</Badge>

        </Card>
    </div>
 </div>   
    );

};

export default ReportDetail;
