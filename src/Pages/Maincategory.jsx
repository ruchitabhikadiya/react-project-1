import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import categorylogo from '../images/categarylogo.jpg'

 const Maincategory = () => {
  const [categories, setCategories] = useState([])

  function getCategory() {
    axios.get('http://localhost:5500/catagory/', {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzM1YzNmOTViZDhjMmQ3MTYxMWFkYyIsImlhdCI6MTcxNzc5MDE3Mn0.S2hYRL-amm9VKWtLNgnVoPGx4mKXHkCHR7Ixj_UWJ6s'
      }
    })
      .then((res) => {
        const filter = res.data.data.filter((el) => el.status == 'on') //status on containing category show
        setCategories(filter)
      })
      .catch((err) => {
        console.log("err", err)
      })
  }

  useEffect(() => {
    getCategory()
  }, [])
  return (
    <>
      <Box>
        <Container>
          <Box sx={{ width: '100%', height: '100%',backgroundColor:'#C4E4FF', margin: '100px 0px', display: 'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems: 'center', gap: '10px',padding:'20px 20px' }}>
            <Box>
              <Typography variant='h6'>Categories</Typography>
            </Box>
            <Box>
              <Typography variant='h6'><Link to='/' style={{color:'black'}}>Home</Link>/Categories</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box>
        <Container sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          {
            categories.map((item, index) => (
              <Box sx={{ width:{xs:'calc(100% - 10px)',sm:'calc(50% - 10px)',md:'calc(25% - 10px)',lg:'calc(25% - 10px)',xl:'calc(25% - 10px)'}, boxShadow: '0 0 5px #102C57 inset', padding: '30px 0px 50px 10px', borderRadius: "5px"}} key={index}>
                <Box sx={{ width: '30px', height: '30px', borderRadius: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '-5px 4px 38px #E8E8E8 inset' }}>{index + 1}</Box>
                <Box>
                  <Link to={{ pathname: '/Mainsubcategory', state: { category: item.catagoryName } }}><Typography variant='h5' sx={{ textAlign: 'center',color:'black'}}>{item.catagoryName}</Typography></Link>
                </Box>
              </Box>
            ))
          }
        </Container>
      </Box>
    </>
  )
}

export default Maincategory
