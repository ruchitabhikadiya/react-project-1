import { Box, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Form, Formik, Field } from 'formik'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import * as Yup from 'yup';
import { ErrorMessage } from 'formik'
const Login = () => {

  const history = useHistory()
  const [formikvalues, setFormikValues] = useState({
    email: '',
    password: '',
  })

  const submitHandle = (values) => {
    console.log("==> ", values)

    const data = JSON.parse(localStorage.getItem(formikvalues))

    axios.post('http://localhost:5500/admin/login', values)
      .then((res) => {
        console.log(res.data.token)
        // if(data == res.data.data){
          localStorage.setItem('setToken', res.data.token)
          history.push('/dashboard')
        // }
      })
      .catch((err) => {
        console.log("Error", err)
      })
  }
  
  return (
    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', width: '100%', height: '100vh' }}>
      <Box sx={{ width:{xs:'70%',sm:"50%",md:'30%',lg:'30%',xl:'30%'}, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #102C57', padding: '25px', borderRadius: '25px', boxShadow: '0 0 5px #102C57' }}>
        <Formik
          initialValues={formikvalues}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Email Address Is Required'),
            password: Yup.string().required('Password Is Required')
          })}
          onSubmit={submitHandle}
        >
          <Form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <h1 style={{ marginBottom: '20px', color: '#102C57' }}>Admin Panel</h1>
            <p style={{ color: 'red' }}><ErrorMessage name="email" /></p>
            <Field as={TextField} label="Email" type="email" sx={{ width: '100%', marginBottom: '20px' }} name='email' />
            <p style={{ color: 'red' }}><ErrorMessage name='password' /></p>
            <Field as={TextField} label="Password" type='password' sx={{ width: '100%', marginBottom: '20px' }} name='password' />
            <button type='submit' style={{ backgroundColor: '#102C57', color: '#FEFAF6', padding: '6px 16px', borderRadius: '4px', border: '0' ,marginRight:'5px'}}>Submit</button>
          </Form>
        </Formik>
      </Box>
    </Box>
  )
}

export default Login;
