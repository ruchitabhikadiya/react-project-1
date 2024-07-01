import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import subcategorylogo from '../images/subcategorylogo.webp'

const Mainsubcategory = () => {
  const [subcategory, setSubcategory] = useState([])
  const location = useLocation();
  const { category } = location.state || {}; //{} state handle is undefine
  function getSubCategory(category) {
    axios.get('http://localhost:5500/subcatagory/', {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzM1YzNmOTViZDhjMmQ3MTYxMWFkYyIsImlhdCI6MTcxNzc5MDE3Mn0.S2hYRL-amm9VKWtLNgnVoPGx4mKXHkCHR7Ixj_UWJ6s'
      }
    })
      .then((res) => {
        console.log("res--->", res.data.data)
        const filter = res.data.data.filter((el) => el.catagoryID.catagoryName === category)
        // setCategories(filter)
        setSubcategory(filter)
        console.log("filter", filter)
      })
      .catch((err) => {
        console.log("err", err)
      })
    // console.log(categoryName)

  }
  useEffect(() => {
    getSubCategory(category)
  }, [category])

  return (
    <>
    <Box>
        <Container>
          <Box sx={{ width: '100%', height: '100%',backgroundColor:'#C4E4FF', margin: '100px 0px', display: 'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems: 'center', gap: '10px',padding:'20px 20px' }}>
            <Box>
              <Typography variant='h6'>Sub Categories</Typography>
            </Box>
            <Box>
              <Typography variant='h6'><Link to='/' style={{color:'black'}}>Home</Link>/Sub Categories</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={{ margin: '50px 0px' }}>
        <Container sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          {
            subcategory.map((item, index) => (
              <Box sx={{ width: {xs:'calc(100% - 10px)',sm:'calc(50% - 10px)',md:'calc(25% - 10px)',lg:'calc(25% - 10px)',xl:'calc(25% - 10px)'}, boxShadow: '0 0 5px #102C57 inset', padding: '30px 0px 50px 10px', borderRadius: "5px" }} key={index}>
                <Box sx={{ width: '30px', height: '30px', borderRadius: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '-5px 4px 38px #E8E8E8 inset' }}>{index + 1}</Box>
                <Box>
                  <Link to={{ pathname: '/Mainquestion', state: { scategory: item.subCatagoryname } }}><Typography variant='h5' sx={{ textAlign: 'center', color: 'black' }}>{item.subCatagoryname}</Typography></Link>
                </Box>
              </Box>
            ))
          }
        </Container>
      </Box>
    </>
  )

}

export default Mainsubcategory
