import React, { useState } from 'react'
// import './App.css';
import { Box, Button, Typography } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Dashboard from './Dashboard';
import Category from './Category';
import Subcategory from './Subcategory';
import QandA from './QandA';
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min"
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import LogoutIcon from '@mui/icons-material/Logout';


function Layout(props) {
    const location = useLocation()
    const [buttoncolor, setButtoncolor] = useState(1)
    const addColor = (e, id) => {
        setButtoncolor(id)
    }

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <Box sx={{ color: '#FEFAF6', backgroundColor: '#102C57', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.25rem' }}>Interview Portal</Box>
            <Box sx={{ color: 'black', display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '8px 16px', gap: '10px' }}>
                <Link to='/dashboard'>
                    <Button sx={{ color: 'black', padding: '8px 16px', textTransform: 'capitalize', fontSize: '1rem', width: '200px', textAlign: 'start', justifyContent: 'flex-start' }} onClick={(e) => addColor(e, 1)} className={buttoncolor == 1 ? 'active' : ''}>
                        <SpaceDashboardIcon sx={{ marginRight: '10px' }} />
                        <Box>Dashboard</Box>
                    </Button>
                </Link>
                <Link to='/category'>
                    <Button sx={{ color: 'black', padding: '8px 16px', textTransform: 'capitalize', fontSize: '1rem', width: '200px', textAlign: 'start', justifyContent: 'flex-start' }} onClick={(e) => addColor(e, 2)} className={buttoncolor == 2 ? 'active' : ''}>
                        <CategoryIcon sx={{ marginRight: '10px' }} />
                        <Box>Category</Box>
                    </Button>
                </Link>
                <Link to='/subcategory'>
                    <Button sx={{ color: 'black', padding: '8px 16px', textTransform: 'capitalize', fontSize: '14px', width: '200px', textAlign: 'start', justifyContent: 'flex-start' }} onClick={(e) => addColor(e, 3)} className={buttoncolor == 3 ? 'active' : ''}>
                        <ControlPointDuplicateIcon sx={{ marginRight: '10px' }} />
                        <Box>Sub Category</Box>
                    </Button>
                </Link>
                <Link to='/qanda'>
                    <Button sx={{ color: 'black', padding: '8px 16px', textTransform: 'capitalize', fontSize: '1rem', width: '200px', textAlign: 'start', justifyContent: 'flex-start' }} onClick={(e) => addColor(e, 4)} className={buttoncolor == 4 ? 'active' : ''}>
                        <HelpOutlineIcon sx={{ marginRight: '10px' }} />
                        <Box>Q & A</Box>
                    </Button>
                </Link>
            </Box>
        </Box>
    );
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Box sx={{ width: '240px', borderRight: 1, borderColor: '#EADBC8', height: '100vh', display: { xs: 'none', sm: "none", md: 'block', lg: 'block', xl: 'block' } }}>
                <Box sx={{ color: '#FEFAF6', backgroundColor: '#102C57', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.25rem' }}>Interview Portal</Box>
                <Box sx={{ color: 'black', display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '8px 16px', gap: '10px' }}>
                    <Link to='/dashboard'>
                        <Button sx={{ color: 'black', padding: '8px 16px', textTransform: 'capitalize', fontSize: '1rem', width: '200px', textAlign: 'start', justifyContent: 'flex-start' }} onClick={(e) => addColor(e, 1)} className={buttoncolor == 1 ? 'active' : ''}>
                            <SpaceDashboardIcon sx={{ marginRight: '10px' }} />
                            <Box>Dashboard</Box>
                        </Button>
                    </Link>
                    <Link to='/category'>
                        <Button sx={{ color: 'black', padding: '8px 16px', textTransform: 'capitalize', fontSize: '1rem', width: '200px', textAlign: 'start', justifyContent: 'flex-start' }} onClick={(e) => addColor(e, 2)} className={buttoncolor == 2 ? 'active' : ''}>
                            <CategoryIcon sx={{ marginRight: '10px' }} />
                            <Box>Category</Box>
                        </Button>
                    </Link>
                    <Link to='/subcategory'>
                        <Button sx={{ color: 'black', padding: '8px 16px', textTransform: 'capitalize', fontSize: '14px', width: '200px', textAlign: 'start', justifyContent: 'flex-start' }} onClick={(e) => addColor(e, 3)} className={buttoncolor == 3 ? 'active' : ''}>
                            <ControlPointDuplicateIcon sx={{ marginRight: '10px' }} />
                            <Box>Sub Category</Box>
                        </Button>
                    </Link>
                    <Link to='/qanda'>
                        <Button sx={{ color: 'black', padding: '8px 16px', textTransform: 'capitalize', fontSize: '1rem', width: '200px', textAlign: 'start', justifyContent: 'flex-start' }} onClick={(e) => addColor(e, 4)} className={buttoncolor == 4 ? 'active' : ''}>
                            <HelpOutlineIcon sx={{ marginRight: '10px' }} />
                            <Box>Q & A</Box>
                        </Button>
                    </Link>
                </Box>
            </Box>

            <Box sx={{ width: { xs: '100%', sm: "100%", md: 'calc(100% - 240px)', lg: 'calc(100% - 240px)', xl: 'calc(100% - 240px)' } }}>
                <Box sx={{ backgroundColor: '#102C57', height: '64px', color: '#FEFAF6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 24px', fontSize: '1.25rem' }}>
                    <Button onClick={toggleDrawer(true)} sx={{ display: { xs: 'block', sm: "block", md: 'none', lg: 'none', xl: 'none' }, color: '#EEEEEE', padding: '0' }}><MenuIcon /></Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                    <Box>Dashboard{location.pathname}</Box>
                    <Box>
                        <Link to='/'><LogoutIcon sx={{ color: '#FEFAF6' }} /></Link>
                    </Box>

                </Box>
                {props.children}
            </Box>
        </Box>
    );
}

export default Layout;
