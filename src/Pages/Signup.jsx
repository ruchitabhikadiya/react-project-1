import { Box, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Form, Formik, Field } from 'formik'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import * as Yup from 'yup';
import { ErrorMessage } from 'formik'
const Signup = () => {
    const history = useHistory()
    const [data,setData] = useState([])
    const [formikvalues, setFormikValues] = useState({
      email: '',
      password: '',
    })

    const submitHandle = (values) =>{
        console.log("va",values)
        axios.post('http://localhost:5500/admin/signup',values)
        .then((res)=>{
            // console.log("res",res.data.data)
            // setData(res.data.data)
            // localStorage.setItem('email',res.data.data)
            // localStorage.setItem('password',data.password)
            // localStorage.setItem("formikvalues",JSON.stringify(formikvalues));
            history.push('/admin/login');
        })
        .catch((err)=>{
            console.log("err",err)
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
                        <h1 style={{ marginBottom: '20px', color: '#102C57' }}>signup</h1>
                        <p style={{ color: 'red' }}><ErrorMessage name="email" /></p>
                        <Field as={TextField} label="Email" type="email" sx={{ width: '100%', marginBottom: '20px' }} name='email' />
                        <p style={{ color: 'red' }}><ErrorMessage name='password' /></p>
                        <Field as={TextField} label="Password" type='password' sx={{ width: '100%', marginBottom: '20px' }} name='password' />
                        <button type='submit' style={{ backgroundColor: '#102C57', color: '#FEFAF6', padding: '6px 16px', borderRadius: '4px', border: '0' }}>Submit</button>
                        {/* <button onClick={handleLogout} style={{ backgroundColor: '#FF6347', color: '#FEFAF6', padding: '6px 16px', borderRadius: '4px', border: '0' }}>Logout</button> */}
                    </Form>
                </Formik>
            </Box>
        </Box>
    )
}

export default Signup
