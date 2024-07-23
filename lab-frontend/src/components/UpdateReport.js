import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { NumberInput,TextInput, Textarea,Radio, Button , Loader, Card, Group , Select} from '@mantine/core';
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

  const laborantOptions = [
    { label: 'mehmet ışıklar', value: 'mehmet ışıklar' },
    { label: 'prof.dr Semih akyol', value: 'prof.dr Semih akyol' },
    { label: 'dr umutcan fırat', value: 'dr umutcan fırat' },
    { label: 'dr.ali aksakal', value: 'dr.ali aksakal' },
  ];

  const handleSubmit = async (values) => {
    await updateReport({ id, ...values });
    navigate('/');
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    
    <div style={{ minHeight: '100vh', display: 'grid', backgroundColor: '#01393A' }}>
      <div style={{ padding: '1%', alignItems: 'center', marginLeft: '30%', marginRight: '30%', marginBottom: '10%', marginTop: '10%', textAlign: 'center', alignContent: 'center' }}>
        <Card style={{ alignItems: 'center', textAlign: 'center', padding: '3.5%', backgroundColor: '#0B6F70', borderRadius: '6%' }}>
          <Group style={{ display: 'flex' }}>
            <Button component={Link} to='/' variant='filled'> <RiArrowGoBackFill size={25} style={{ boxShadow: 'revert-layer', borderRadius: '20%', color: 'darkslateblue', backgroundColor: 'white' }} /> </Button>
          </Group>
          <Group>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Group>
                <TextInput label="patient name" required {...form.getInputProps('patientName')} />
                <NumberInput label='tck number' hideControls required {...form.getInputProps('tcNumber')} />
                <h2>SELECT THE Laborant</h2>
                <Group label="Select Laborant" direction="horizontal" style={{ marginBottom: '10px', justifyContent: 'space-between', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  {laborantOptions.map((option) => (
                    <Radio
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      checked={form.values.laborantName === option.value}
                      onChange={() => form.setFieldValue('laborantName', option.value)}
                      size="sm"
                      style={{ marginRight: '10%', width: '1%', height: '1%', padding: '1px', borderRadius: '50%', border: '2px solid #0B6F70'  }}
                    />
                  ))}
                </Group>
                <TextInput label="diagnosis" required {...form.getInputProps('diagnosis')} />
                <Textarea size='xl' label="Details" withAsterisk {...form.getInputProps('details')} />
              </Group>
              <Group>
                <TextInput label="photo's url" {...form.getInputProps('image')} />
              </Group>
              <Group style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <TextInput required label="enter a date" placeholder='YYYY-MM-DD' type='date' {...form.getInputProps('date')} />
                <Button style={{ marginTop: '10%' }} type='submit'>add the report</Button>
              </Group>
            </form>
          </Group>
        </Card>
      </div>
    </div>
  );
};

export default UpdateReport;