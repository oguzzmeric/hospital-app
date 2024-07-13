import React from 'react';
import { useForm } from '@mantine/form';
import {Card , TextInput, Textarea, Button , Group} from '@mantine/core';
import { useAddReportMutation } from '../services/report';
import { Form, useNavigate } from 'react-router-dom';
import { DatePicker} from '@mantine/dates';
import { DateInput } from '@mantine/dates';
import { Link } from 'react-router-dom';
import { RiArrowGoBackFill } from "react-icons/ri";
import { DateTimePicker } from '@mantine/dates';

const AddReport = () => {
    const [addReport] = useAddReportMutation();
    const navigate = useNavigate();
    
    const form = useForm({
        initialValues: {
          patientName: '',
          laborantName: '',
          diagnosis: '',
          details: '',
          date: '',
          image: null,
          tcNumber: '', 
        },
      });

    const handleSubmit = async (values) => {
        await addReport(values);
        navigate('/');
    };

    const handleImageChange  = (event) => {
      form.setFieldValue('image' , event.currentTarget.files[0]);

    }

    return( 
 <div style={{minHeight : '100vh', display : 'grid' , backgroundColor : '#01393A '  }} >  
  <div style={{ padding: '1%' , alignItems : 'center', marginLeft : '30%',marginRight : '30%' ,marginBottom:'10%' , marginTop : '10%' , textAlign : 'center', alignContent : 'center' }} >
    <Card style={{ alignItems : 'center' , textAlign : 'center'   , padding : '3.5%', backgroundColor :'#0B6F70' , borderRadius : '6%' }} >
      <Group style={{display:'flex'}} >
        <Button component={Link} to='/' variant='filled'> <RiArrowGoBackFill size={25}  style={{ boxShadow : 'revert-layer' ,  borderRadius : '20%' ,color:'darkslateblue' , backgroundColor : 'white'}} /> </Button>
      </Group>
      <Group>

        <form onSubmit={form.onSubmit(handleSubmit)} >
          <Group>
            <TextInput label="patient name" {...form.getInputProps('patientName')} ></TextInput>
            <TextInput label="TCK NUMBER" {...form.getInputProps('tcNumber')} ></TextInput>
            <TextInput label = "laborant name" {...form.getInputProps('laborantName')} ></TextInput>
            <TextInput label = "diagnosis" {...form.getInputProps('diagnosis')} ></TextInput>
            <Textarea size='xl'  label = "Details" withAsterisk {...form.getInputProps('details')}  />
          </Group>
          <Group>
            <TextInput label="photo's url"{...form.getInputProps('image')} ></TextInput>
          </Group>

          <Group style={{justifyContent : 'space-between' , display : 'flex' , alignItems : 'center' , textAlign : 'center' }} >
            <TextInput label = "enter a date" placeholder='YYYY-MM-DD' type='date'{...form.getInputProps('date')} ></TextInput>
            <Button  style={{marginTop : '10%'}} type='submit'>add the report</Button>
          </Group>
        </form>

      </Group>
    </Card>
  </div>
 </div> 
    );
};

export default AddReport;
