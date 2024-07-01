import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import questionlogo from '../images/questionlogo.png'

const Mainquestion = () => {
  const location = useLocation()
  const { scategory } = location.state || {}
  const [qustion, setquestion] = useState([])

  const getQuestion = (scategory) => {
    axios.get('http://localhost:5500/questions/', {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzM1YzNmOTViZDhjMmQ3MTYxMWFkYyIsImlhdCI6MTcxNzc5MDE3Mn0.S2hYRL-amm9VKWtLNgnVoPGx4mKXHkCHR7Ixj_UWJ6s'
      }
    })
      .then((res) => {
        console.log("''''''''''''''''''", res.data.data)
        const filter = res.data.data.filter((el) => el.subcatagoryID.subCatagoryname == scategory)
        console.log("filter", filter)
        setquestion(filter)
        //   setData(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  useEffect(() => {
    getQuestion(scategory)
  }, [scategory])

  return (
    <>
     <Box>
        <Container>
          <Box sx={{ width: '100%', height: '100%',backgroundColor:'#C4E4FF', margin: '100px 0px', display: 'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems: 'center', gap: '10px',padding:'20px 20px' }}>
            <Box>
              <Typography variant='h6'>Question-Answer</Typography>
            </Box>
            <Box>
              <Typography variant='h6'><Link to='/' style={{color:'black'}}>Home</Link>/Question-Answer</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box sx={{ margin: '50px 0px' }}>
        <Container>
          {
            qustion.map((item, index) => (
              <>
              <Box sx={{width:'100%',padding:'20px 10px',boxShadow: '0 0 5px #102C57 inset'}}>
                <Typography variant='h5'>{index + 1}.{item.questions}</Typography>
                <Typography variant='answer'>{item.answer}</Typography>
              </Box>
              <br/>
              </>
            ))
          }
        </Container>
      </Box>
    </>
  )
}

export default Mainquestion
