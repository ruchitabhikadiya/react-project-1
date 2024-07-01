import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import axios from 'axios';
import { ThemeConsumer } from 'styled-components';
import { Container, Typography, colors } from '@mui/material';
import Dashboard from './Dashboard';
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import Categorymainpage from './Maincategory';
import Mainheader from './Mainheader';
import image from '../images/logo.jpg'
import image_two_part from '../images/why-us.png'
import carosal from '../images/main-carosal.jpg'
import CategoryIcon from '@mui/icons-material/Category';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import building from '../images/dashboard.jpg'

const Mainpage = () => {

  return (
    <>
      {/* header part start */}
      <Mainheader />
      {/* header part end */}

      {/* carosal part start */}
      <Box class='carosal-image'>
        <img src={carosal} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
        <Box sx={{ width: '100%', position: { xs: 'absolute', sm: 'absolute', md: 'absolute', lg: 'absolute', xl: 'absolute' }, top: '40%', zIndex: '99', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          <Box>
            <Container>
              <Typography variant='h3' sx={{ color: 'white', fontSize: { xs: '30px', sm: '40px', md: '60px', lg: '60px', xl: '60px' }, padding: '0 50px', textAlign: 'center' }}>Learn IT Skills That Enhance Your Career</Typography>
            </Container>
          </Box>
        </Box>
      </Box>
      {/* carosal part end*/}

      {/* About us part start */}
      <Box sx={{ margin: '50px 0px' }}>
        <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <Box sx={{ width: { xs: 'calc(100% - 10px)', sm: 'calc(100% - 10px)', md: "calc(50% - 10px)", lg: 'calc(50% - 10px)', xl: 'calc(50% - 10px)' } }} >
            <img src={image_two_part} style={{ width: '100%' }} />
          </Box>

          <Box sx={{ width: { xs: 'calc(100% - 10px)', sm: 'calc(100% - 10px)', md: "calc(50% - 10px)", lg: 'calc(50% - 10px)', xl: 'calc(50% - 10px)' }, padding: { xs: '70px 0px', sm: '70px 0px', md: '70px 50px', lg: '70px 50px', xl: '70px 50px' } }}>
            <Typography variant='p' sx={{ fontSize: "24px", color: '#102C57' }}> Prepare many interview-related questions, One of the best platforms to learn and grow in the information technology field.</Typography>
            <br /><br /><br />
            <Typography variant='p' sx={{ fontSize: "24px", color: '#102C57' }}>Skill your career and find your way to a better job with our value added question and answer.</Typography>
          </Box>
        </Container>
      </Box>
      {/* About us part end */}

      {/* dashboard start */}
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Box class='dashboard-img'></Box>
        <Box sx={{ position: 'absolute', top: { xs: '0', sm: '30%', md: '22%', lg: '22%', xl: '22%' }, zIndex: '20', display: 'flex', flexWrap: 'wrap', justifyContent: "center", gap: '20px', width: '100%' }}>
          <Box sx={{ backgroundColor: 'white', width: { xs: '100%', sm: "25%", md: 'calc(25% - 10px)', lg: 'calc(25% - 10px)', xl: 'calc(25% - 10px)' }, padding: '20px', border: '2px solid #102C57' }}>
            <Link to='/Categorymainpage'>
              <CategoryIcon sx={{ color: '#DAC0A3', fontSize: '30px' }} />
              <Typography variant='h5' sx={{ color: '#102C57' }}>Categories</Typography>
              <Typography variant='h6' sx={{ color: '#787A91', display: { xs: "none", sm: 'none', md: 'block', lg: 'block', xl: 'block' } }}>Our platform provides category wise question answer</Typography>
            </Link>
          </Box>
          <Box sx={{ backgroundColor: 'white', width: { xs: '100%', sm: "25%", md: 'calc(25% - 10px)', lg: 'calc(25% - 10px)', xl: 'calc(25% - 10px)' }, padding: '20px', border: '2px solid #102C57' }}>
            <Link to='/Allsubcategory'>
              <ControlPointDuplicateIcon sx={{ color: '#DAC0A3', fontSize: '30px' }} />
              <Typography variant='h5' sx={{ color: '#102C57' }}>Sub Categories</Typography>
              <Typography variant='h6' sx={{ color: '#787A91', display: { xs: "none", sm: 'none', md: 'block', lg: 'block', xl: 'block' } }}>Our platform provides sub category wise question answer</Typography>
            </Link>
          </Box>
          <Box sx={{ backgroundColor: 'white', width: { xs: '100%', sm: "25%", md: 'calc(25% - 10px)', lg: 'calc(25% - 10px)', xl: 'calc(25% - 10px)' }, padding: '20px', border: '2px solid #102C57' }}>
            <Link to='/Allquestion'>
              <HelpOutlineIcon sx={{ color: '#DAC0A3', fontSize: '30px' }} />
              <Typography variant='h5' sx={{ color: '#102C57' }}>Question Answer</Typography>
              <Typography variant='h6' sx={{ color: '#787A91', display: { xs: "none", sm: 'none', md: 'block', lg: 'block', xl: 'block' } }}>question answer</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
      {/* dashboard end */}

      {/* footer start */}
      <Box class='footer'>
        <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
          <Box sx={{ width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', zIndex: '30' } }}>
            <Link to='/'><QuestionAnswerIcon sx={{ fontSize: '45px', color: '#102C57' }} /></Link>
            <Typography variant='h5' sx={{ color: '#787A91' }} >This is an online practice platform that has been operating since 2024 until now.</Typography>
          </Box>
          <Box sx={{ zIndex: '30' }}>
            <Typography variant='h4' sx={{ color: '#102C57', width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' } }}>Menu</Typography>
            <Typography variant='ul'>
              <Link to='/' ><Typography component='li' variant='li' sx={{ fontSize: '18px', color: '#787A91' }} className='hover'>Home</Typography></Link>
              <Link to='/Categorymainpage'><Typography component='li' variant='li' sx={{ fontSize: '18px', color: '#787A91' }} className='hover'>Categories</Typography></Link>
              <Link to='/Allsubcategory'><Typography component='li' variant='li' sx={{ fontSize: '18px', color: '#787A91' }} className='hover'>Sub Categories</Typography></Link>
              <Link to='/Allquestion'><Typography component='li' variant='li' sx={{ fontSize: '18px', color: '#787A91' }} className='hover'>Question-Answer</Typography></Link>
            </Typography>
          </Box>
        </Container>
      </Box>
      {/* footer end */}
    </>
  );
}

export default Mainpage;

