import React, { useEffect } from 'react'
// import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import { alpha } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { DataArrayRounded } from '@mui/icons-material';
import * as Yup from 'yup';



const label = { inputProps: { 'aria-label': 'Switch demo' } };
const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#102C57',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#102C57',
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Category = () => {
  const token = localStorage.getItem('setToken')
  // console.log("token ==> ", token);

  const [formikvalues, setFormikValues] = useState({
    catagoryName: '',
  })
  const [data, setData] = useState([])
  const [editid, seteditid] = useState(null)
  const [opendrower, setOpendrower] = useState(false)
  const [checked, setChecked] = useState("")
  // console.log("====================>", data.length)
  let cat = data.length
  localStorage.setItem("categorieslenght", cat)
  const [change, setChange] = useState([])
  const [changesplit, setchangesplit] = useState([])
  // console.log("change", change)


  useEffect(() => {
    getDataApi()
  }, [])


  const submitButton = (values) => {
    console.log(values)
    if (editid !== null) {
      axios.patch(`http://localhost:5500/catagory/${editid}`, values, {
        headers: {
          Authorization: token
        }
      })
        .then((response) => {
          // console.log("response", response)
          getDataApi()
          seteditid(null)
        })
        .catch((err) => {
          console.log("errer", err)
        })
    }
    else {
      axios.post('http://localhost:5500/catagory/create', values, {
        headers: {
          Authorization: token
        }
      })
        .then((res) => {
          // console.log("response ==> ", res)
          getDataApi()
        })
        .catch((err) => {
          console.log("Errer", err)
        })
    }
  }


  const getDataApi = (status) => {
    axios.get('http://localhost:5500/catagory/', {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        // console.log("responce", res.data.data)
        setData(res.data.data)
        // let filter = data.filter((el)=>status === "on" ? status)
        // console.log("filter",filter)
      })
      .catch((error) => {
        console.log("error====>", error)
      })
  }

  const dataDelete = (id) => {
    // console.log("id",id)
    axios.delete(`http://localhost:5500/catagory/${id}`, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        // console.log("success")
        getDataApi()
      })
      .catch((err) => {
        console.log("err", err)
      })
  }

  const updateData = (item, id) => {
    // console.log(item)
    // console.log(id)
    setFormikValues({
      catagoryName: item.catagoryName,
    })
    seteditid(id)
    setOpendrower(true)
  }

  const searchData = (e) => {
    const searchvalue = e.target.value
    console.log(searchvalue)
    axios.get(`http://localhost:5500/catagory/?search=${searchvalue}`, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        // console.log(res)
        setData(res.data.data)
      })
      .catch((err) => {
        console.log("errer", err)
      })
  }

  const SubCateStatus = (filterData) => {
    console.log("filter ==> ", filterData);

    for (let i = 0; i < filterData.length; i++) {
      const id = filterData[i]._id;
      // console.log("id ==> ",id);
      // if(filterData[i].status === 'on')
        // {
      axios.patch(`http://localhost:5500/subcatagory/${id}`, {
        'status': filterData[i].status === 'on' ? 'off' : 'on'
      }, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      })

    // }
  }
  }

  const GetSubFilter = (item) => {
    // console.log("get item ==> ",item);
    axios.get('http://localhost:5500/subcatagory/', {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        // console.log("res==>",res.data.data);
        const filterData = res.data.data.filter((items) => items.catagoryID._id === item._id)
        // console.log("+++++++",filterData);
        SubCateStatus(filterData)
      })
      .catch((error) => {
        console.log("error", error);
      })
  }

  const ChangeStatus = (e, id, item) => {
    
    console.log("==>", e.target.checked);
    axios.patch(`http://localhost:5500/catagory/${id}`, {
      'status': e.target.checked ? 'on' : 'off'
      // 'status': stat
    }, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        // console.log("res", res)
        getDataApi()
        GetSubFilter(item)
        // changesubStatus()
      })
      .catch((err) => {
        console.log("err", err)
      })
  }


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: '24px' }}>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}>
        <Box sx={{ width: { xs: '100%', sm: '100%', md: '80%', lg: '80%', xl: '80%' } }}>
          <TextField label="Search Category" sx={{ width: '100%', marginBottom: '20px' }} onChange={(e) => searchData(e)} />
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '100%', md: '15%', lg: '15%', xl: '15%' } }}>
          <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ backgroundColor: '#102C57', color: '#EEEEEE', padding: "25px 15px", height: '30px', width: '100%' }}>
              Add Category
            </Button>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            // sx={{ width: '30%' }}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Add Catagory
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <Formik
                  initialValues={formikvalues}
                  validationSchema={Yup.object({
                    catagoryName:Yup.string().required('CatagoryName Is Required')
                  })}
                  onSubmit={submitButton}
                >
                  <Form>
                    <Field as={TextField} label="Catagory" name='catagoryName' sx={{ width: '100%', marginBottom: '20px' }} />
                    <p style={{color:'red'}}><ErrorMessage name='catagoryName'/></p>
                    <DialogActions>
                      <button type='submit' style={{ backgroundColor: '#102C57', color: '#FEFAF6', padding: '6px 16px', borderRadius: '4px', border: '0' }} onClick={handleClose}>Submit</button>
                    </DialogActions>
                  </Form>
                </Formik>
              </DialogContent>

            </BootstrapDialog>
          </React.Fragment>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <TableContainer component={Paper} >
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#102C57', color: '#EEEEEE', width: '100%', marginTop: '10px' }}>
              <TableRow>
                <TableCell sx={{ color: '#EEEEEE' }}>No</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Catagory Name</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Status</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Delete	</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell sx={{ color: '#787A91' }}>{index + 1}</TableCell>
                      <TableCell sx={{ color: '#787A91' }}>{item.catagoryName}</TableCell>
                      <TableCell><PinkSwitch {...label} checked={item.status === 'on'} onChange={(e) => ChangeStatus(e, item._id, item)} /></TableCell>
                      <TableCell onClick={() => dataDelete(item._id)}><DeleteIcon sx={{ color: '#787A91' }} /></TableCell>
                      <TableCell onClick={() => updateData(item, item._id)}><EditIcon sx={{ color: '#787A91' }} onClick={handleClickOpen} /></TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Category;
