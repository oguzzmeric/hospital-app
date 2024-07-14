import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { NumberInput,TextInput, Textarea, Button , Loader, Card, Group , Select} from '@mantine/core';
import { useUpdateReportMutation , useGetReportByIdQuery } from '../services/report';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DatePicker } from '@mantine/dates';
import { RiArrowGoBackFill } from 'react-icons/ri';

const UpdateReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: report, error, isLoading } = useGetReportByIdQuery(id);
  const [updateReport] = useUpdateReportMutation();

  const form = useForm({
    initialValues: {
      patientName: '',
      laborantName: '',
      diagnosis: '',
      details: '',
      date: null,
      image: '',
      tcNumber : ''
    },
  });


  useEffect(() => {
    if (report) {
      form.setValues({
        patientName: report.patientName,
        laborantName: report.laborantName,
        diagnosis: report.diagnosis,
        details: report.details,
        date: new Date(report.date), // Tarihi Date objesine dönüştürüyoruz
        image: report.image,
        tcNumber : report.tcNumber
      });
    }
  }, [report]); // report ve form'u bağımlılıklar arasına ekledik

  const handleSubmit = async (values) => {
    await updateReport({ id, ...values });
    navigate('/');
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{minHeight : '100vh' , display : 'grid' , backgroundColor : '#01393A'}}>
      <div style={{ padding: '1%' , alignItems : 'center', marginLeft : '30%',marginRight : '30%' ,marginBottom:'10%' , marginTop : '10%' , textAlign : 'center', alignContent : 'center'}} >
        <Card style={{alignItems : 'center' , textAlign : 'center'   , padding : '3.5%', backgroundColor :'#0B6F70' , borderRadius : '6%' }} >
          <Group>
            <Button component={Link} to='/' variant='filled'> <RiArrowGoBackFill size={25} style={{ boxShadow : 'revert-layer' ,  borderRadius : '20%' ,color:'darkslateblue' , backgroundColor : 'white'}}/> </Button>
          </Group>
          <form onSubmit={form.onSubmit(handleSubmit)} >
            <Group>

              <TextInput required type='text'  label="patient name" {...form.getInputProps('patientName')} ></TextInput>
              <NumberInput label='tck number' hideControls required   {...form.getInputProps('tcNumber')} ></NumberInput>
              <TextInput required type='text' label='laborant name' {...form.getInputProps('laborantName')} ></TextInput>
              <TextInput required type='text' label = "diagnosis" {...form.getInputProps('diagnosis')} ></TextInput>
              <Textarea type='text' label="Details" {...form.getInputProps('details')} />

            </Group>
            <Group>
              <TextInput label='photos url ' {...form.getInputProps('image')}  ></TextInput>
            </Group>
            <Group style={{justifyContent : 'space-between' , display : 'flex' , alignItems : 'center' , textAlign : 'center' }} >
              <TextInput required label = "enter a date" placeholder='YYYY-MM-DD' type='date'{...form.getInputProps('date')} ></TextInput>
              <Button  style={{marginTop : '10%'}} type='submit'>update the report</Button>
            </Group>
          </form>  
        </Card>
      </div>
    </div>
  );
};

export default UpdateReport;