import React, { useEffect, useState } from 'react'
// import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material';
// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormHelperText from '@mui/material/FormHelperText';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const QandA = () => {
  const token = localStorage.getItem('setToken');
  const [formikValues, setFormikValues] = useState({
    questions: "",
    answer: "",
    subcatagoryID: ''
  });
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [subcategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editid, setEditid] = useState(null)
  const [sub, setSub] = useState('')
  const [filterdata, setfilterData] = useState([])
  const [subsub, setsubsub] = useState([])
  console.log("value", subsub)



  console.log("====================>", data.length)
  let questionsanswer = data.length
  localStorage.setItem("questinanswer", questionsanswer)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  const submitButton = (values) => {
    if (editid !== null) {
      axios.patch(`http://localhost:5500/questions/${editid}`, values, {
        headers: {
          Authorization: token
        }
      })
        .then((res) => {
          console.log("res", res)
          getDataApi()
          setEditid(null)
        })
        .catch((err) => {
          console.log("err", err)
        })
    }
    else {
      axios.post('http://localhost:5500/questions/create', values, {
        headers: {
          Authorization: token
        }
      })
        .then((response) => {
          // console.log("response",response)
          getDataApi();
          handleClose();
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  const getDataApi = () => {
    axios.get('http://localhost:5500/questions/', {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        // console.log("''''''''''''''''''", res.data.data)
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const getCategory = () => {
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

  const getSubCategory = () => {
    axios.get('http://localhost:5500/subcatagory/', {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        console.log("response=====>", response.data.data)
        // setSubCategories(response.data.data);
        const filter = response.data.data.filter((e)=>e.catagoryID.status === 'on')
        setSubCategories(filter)
        console.log("filter",filter)
      })
      .catch((err) => {
        console.log("errer", err)
      })
  }

  const getSubCategoryMenu = () => {                           //sub-sub
    axios.get('http://localhost:5500/subcatagory/', {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        // console.log("..........",response.data.data)
        const filt = response.data.data.filter(el => el.catagoryID._id == sub)
        setfilterData(filt)
        // console.log("---------------> sub", filt)

      })
      .catch((err) => {
        console.log("errer", err)
      })
  }

  const dataDelete = (id) => {
    axios.delete(`http://localhost:5500/questions/${id}`, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        // console.log("res......",res)
        getDataApi()
      })
      .catch((err) => {
        console.log("err", err)
      })
  }

  const dataupdate = (item, id) => {
    setFormikValues({
      questions: item.questions,
      answer: item.answer,
      subcatagoryID: item.subcatagoryID._id
    })
    setEditid(id)
  }

  useEffect(() => {
    getDataApi();
    getSubCategory();
    getCategory();
    // getSubCategoryMenu();
  }, []);

  useEffect(() => {
    if (sub) {
      getSubCategoryMenu();
    }
  }, [sub]);

  return (
    <>
      <Box sx={{ padding: '24px' }}>
        <Box sx={{ display: 'flex', justifyContent: "space-between", marginBottom: '15px' }}>
          <Formik>
            {({ values, handleChange }) => (
              <Form>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Catagory</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="catagory"
                    onChange={(e) => setSub(e.target.value)}
                  >
                    {
                      categories.map((item) => {
                        return (
                          <MenuItem value={item._id} key={item._id}>{item.catagoryName}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 190 }}>
                  <InputLabel id="demo-simple-select-helper-label">Sub Catagory</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Sub catagory"
                    onChange={(e) => setsubsub(e.target.value)}
                  >
                    {
                      filterdata.map((item) => (
                        <MenuItem value={item._id}>{item.subCatagoryname}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Form>
            )}
          </Formik>
          <Button variant="outlined" onClick={handleClickOpen} sx={{ backgroundColor: '#102C57', color: '#EEEEEE', padding: "25px 15px", height: '30px', width: { xs: '100%', sm: '100%', md: '20%', lg: '20%', xl: '20%' } }}>
            Add Q & A
          </Button>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Add Q & A
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
                initialValues={formikValues}
                onSubmit={submitButton}
              >
                {({ values, handleChange }) => (
                  <Form>
                    <Field as={TextField} label="Question" name="questions" sx={{ width: '100%', marginBottom: '20px' }} />
                    <Field as={TextField} label="Answer" name="answer" sx={{ width: '100%', marginBottom: '20px' }} />
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id="subcategory-label">Sub Category</InputLabel>
                      <Select
                        labelId="subcategory-label"
                        id="subcategory-select"
                        value={values.subcatagoryID}
                        label="Sub Category"
                        name='subcatagoryID'
                        onChange={handleChange}
                      // onChange={handleSelectChange}
                      >
                        {
                          subcategories.map((item) => {
                            return (
                              <MenuItem value={item._id}>{item.subCatagoryname}</MenuItem>
                              // console.log("qwertyui",item.subcategoryID.subCatagoryname)
                            )
                          })
                        }
                      </Select>
                    </FormControl>
                    <DialogActions>
                      <Button type='submit' sx={{ backgroundColor: '#102C57', color: '#FEFAF6', padding: '6px 16px' }} onClick={handleClose}>Submit</Button>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </BootstrapDialog>
        </Box>
        <Box sx={{ width: '100%' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: '#102C57', color: '#EEEEEE', width: '100%' }}>
                <TableRow>
                  <TableCell sx={{ color: '#EEEEEE' }}>No</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>Questions</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>Answer</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>Sub-Category</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>Category</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>Delete</TableCell>
                  <TableCell sx={{ color: '#EEEEEE' }}>Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: '#787A91' }}>{index + 1}</TableCell>
                    <TableCell sx={{ color: '#787A91' }}>{item.questions}</TableCell>
                    <TableCell sx={{ color: '#787A91' }}>{item.answer}</TableCell>
                    <TableCell sx={{ color: '#787A91' }}>{item.subcatagoryID.subCatagoryname}</TableCell>
                    <TableCell sx={{ color: '#787A91' }}>{item.subcatagoryID.catagoryID.catagoryName}</TableCell>
                    <TableCell onClick={() => dataDelete(item._id)}><DeleteIcon sx={{ color: '#787A91' }} /></TableCell>
                    <TableCell onClick={() => dataupdate(item, item._id)}><EditIcon sx={{ color: '#787A91' }} onClick={handleClickOpen} /></TableCell>
                  </TableRow>
                  // console.log("id",item.catagoryID)
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default QandA;
