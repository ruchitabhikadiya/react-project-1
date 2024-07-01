import React from 'react'
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { Typography, colors } from '@mui/material';
// import image from '../images/logo.jpg'
import image from '../images/logo.jpg'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const Mainheader = () => {
    return (
        <Box className='main-header'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" className='header'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to='/'><QuestionAnswerIcon sx={{ color: 'white' }} /></Link>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant='ul' sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                <Typography variant='li' sx={{display:{xs:'none',sm:'none',md:'block',lg:'block',xl:'block'}}}><Link to='/' className='categories'>HOME</Link></Typography>
                                <Typography variant='li'><Link to='/Categorymainpage' className='categories'>CATEGORIES</Link></Typography>
                            </Typography>
                            
                            <Link to='/admin/login'><Button sx={{ color: 'white',border:'2px solid #102C57',paddingTop:'4px',paddingBottom:'4px',display:{xs:'none',sm:'none',md:'block',lg:'block',xl:'block'}}}>Login</Button></Link>
                            <Link to='/signup'><Button sx={{ color: 'white' ,backgroundColor:'#102C57'}}>Signup</Button></Link>
                        </Box>

                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    )
}

export default Mainheader
