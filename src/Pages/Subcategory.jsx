import React, { useEffect, useState } from 'react'
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
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Field, Formik, Form } from 'formik';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Category } from '@mui/icons-material';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#102C57',
    // '&:hover': {
    //   backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    // },
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

const Subcategory = () => {
  const token = localStorage.getItem('setToken')
  const [formikvalues, setFormikValues] = useState({
    subCatagoryname: "",
    catagoryID: ''
  })
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([])
  const [categories, setCategories] = useState([]);
  const [editid, setEditid] = useState(null)
  const [opendrower, setOpendrower] = useState(false)


  console.log("====================>", data.length)  //add how manu subcategory on dashboard
  let subcat = data.length
  localStorage.setItem("subcategorieslenght", subcat)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getDataApi()
    getCategory()
  }, [])

  const submitButton = (values, { resetForm }) => {    //submit button
    if (editid !== null) {
      console.log(editid)
      axios.patch(`http://localhost:5500/subcatagory/${editid}`, values, {
        headers: {
          Authorization: token
        }
      })
        .then((response) => {
          console.log("response.....", response)
          getDataApi()
          setEditid(null)
        })
        .catch((err) => {
          console.log("errer", err)
        })
    }
    else {
      axios.post('http://localhost:5500/subcatagory/create', values, {
        headers: {
          Authorization: token
        }
      })
        .then((response) => {
          // console.log("response", response)
          getDataApi()
        })
        .catch((err) => {
          console.log("errer", err)
        })
      resetForm()
    }
  }


  const getCategory = () => {                   //get category
    axios.get('http://localhost:5500/catagory/', {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        // console.log(res.data.data[0].catagoryName)
        setCategories(res.data.data)
      })
      .catch((error) => {
        console.log("error====>", error)
      })
  }


  const getDataApi = () => {                                  // get data
    axios.get('http://localhost:5500/subcatagory/', {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        // console.log("response=====>", response.data.data)
        setData(response.data.data)
      })
      .catch((err) => {
        console.log("errer", err)
      })
  }

  const deleteData = (id) => {                     //delete data
    console.log("...........", id)
    axios.delete(`http://localhost:5500/subcatagory/${id}`, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        getDataApi()

      })
      .catch((err) => {
        console.log("errer", err)
      })
  }
  const dataupdate = (item, id) => {                    //updatedata
    console.log(item.catagoryID.catagoryName)
    // console.log(id)
    setFormikValues({
      subCatagoryname: item.subCatagoryname,
      catagoryID: item.catagoryID._id
    })
    setEditid(id)
    setOpendrower(true)
  }

  const searchData = (e) => {                //search data
    const search = e.target.value
    console.log(search)
    axios.get(`http://localhost:5500/subcatagory/?search=${search}`, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        console.log("re", res.data.data)
        setData(res.data.data)
      })
      .catch((err) => {
        console.log("err", err)
      })
  }

  const ChangeStatus = (e, id, item) => {
    console.log("id", id)
    if (item.catagoryID.status == 'on') {
      axios.patch(`http://localhost:5500/subcatagory/${id}`, {
        'status': e.target.checked ? 'on' : 'off'
      }, {
        headers: {
          Authorization: token
        }
      })
        .then((res) => {
          // const filterData = res.data.data.filter((items)=>items.status == item.catagoryID.status ? 'on' : 'off')
          console.log("filterrrrrrrrr",res.data.data)
          getDataApi();
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }

  return (
    <Box sx={{ padding: '24px' }}>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}>
        <Box sx={{ width: { xs: '100%', sm: '100%', md: '80%', lg: '80%', xl: '80%' } }}>
          <TextField label="Search Category" sx={{ width: '100%', marginBottom: '20px' }} onChange={(e) => searchData(e)} />
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '100%', md: '15%', lg: '15%', xl: '15%' } }}>
          <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ backgroundColor: '#102C57', color: '#EEEEEE', padding: "25px 15px", height: '30px', width: '100%' }}>
              Add Sub Catagory
            </Button>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            // sx={{ width: '30%' }}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Add Sub Catagory
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
                  onSubmit={submitButton}
                >
                  {({ values, handleChange }) => (
                    <Form>
                      <Field as={TextField} label="Sub Catagory" sx={{ width: '100%', marginBottom: '20px' }} name='subCatagoryname'></Field>
                      <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="demo-select-small-label">Category Name</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-large"
                          // value={age}
                          value={values.catagoryID}
                          label="Catagory Name"
                          name='catagoryID'
                          onChange={handleChange}
                        // onChange={(event) => setFormikValues({ ...formikvalues, catagoryID: event.target.value })}
                        // onChange={handleChange}
                        >
                          {
                            categories.map((item) => (
                              <MenuItem value={item._id}>{item.catagoryName}</MenuItem>
                              // console.log("------------",item.catagoryName)
                            ))
                          }
                        </Select>
                      </FormControl>

                      <DialogActions>
                        <button type='submit' style={{ backgroundColor: '#102C57', color: '#FEFAF6', padding: '6px 16px', borderRadius: '4px', border: '0' }} onClick={handleClose}>Submit</button>
                      </DialogActions>
                    </Form>
                  )}
                </Formik>
              </DialogContent>
            </BootstrapDialog>
          </React.Fragment>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#102C57', color: '#EEEEEE', width: '100%', marginTop: '10px' }}>
              <TableRow>
                <TableCell sx={{ color: '#EEEEEE' }}>No</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>Sub-Catagory Name</TableCell>
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
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.subCatagoryname}</TableCell>
                      <TableCell>{item.catagoryID.catagoryName}</TableCell>
                      <TableCell><PinkSwitch {...label} checked={item.status == 'on'} onChange={(e) => ChangeStatus(e, item._id, item)} /></TableCell>
                      <TableCell onClick={() => deleteData(item._id)}><DeleteIcon sx={{ color: '#787A91' }} /></TableCell>
                      <TableCell onClick={() => dataupdate(item, item._id)}><EditIcon sx={{ color: '#787A91' }} onClick={handleClickOpen} /></TableCell>
                    </TableRow>
                    // console.log("==========",item.catagoryID.catagoryName)
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

export default Subcategory;
