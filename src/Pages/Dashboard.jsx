import React from 'react'
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  const categories = localStorage.getItem("categorieslenght")
  console.log("...........",categories)
  const subcategories = localStorage.getItem("subcategorieslenght")
  const questionanswer = localStorage.getItem("questinanswer")
  return (
    <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',width:'100%',gap:'10px',padding:'24px'}}>
      <Box sx={{width:{ xs: '100%', sm: "calc(50% - 10px)", md: 'calc(33.33% - 10px)', lg: 'calc(33.33% - 10px)', xl: 'calc(33.33% - 10px)' },boxShadow:'#787A91 0px 0px 5px',padding:'20px',textAlign:'center',borderRadius:'5px'}}>
        <Typography variant='h5' sx={{marginBottom:'20px',fontWeight:'700'}}>Total Category</Typography>
        <Typography variant='h3' sx={{fontWeight:'700'}}>{categories}</Typography>
      </Box>
      <Box sx={{width:{ xs: '100%', sm: "calc(50% - 10px)", md: 'calc(33.33% - 10px)', lg: 'calc(33.33% - 10px)', xl: 'calc(33.33% - 10px)' },boxShadow:'#787A91 0px 0px 5px',padding:'20px',textAlign:'center',borderRadius:'5px'}}>
        <Typography variant='h5' sx={{marginBottom:'20px',fontWeight:'700'}}>Total Sub Category</Typography>
        <Typography variant='h3' sx={{fontWeight:'700'}}>{subcategories}</Typography>
      </Box>
      <Box sx={{width:{ xs: '100%', sm: "calc(50% - 10px)", md: 'calc(33.33% - 10px)', lg: 'calc(33.33% - 10px)', xl: 'calc(33.33% - 10px)' },boxShadow:'#787A91 0px 0px 5px',padding:'20px',textAlign:'center',borderRadius:'5px'}}>
        <Typography variant='h5' sx={{marginBottom:'20px',fontWeight:'700'}}>Total Q / A</Typography>
        <Typography variant='h3' sx={{fontWeight:'700'}}>{questionanswer}</Typography>
      </Box>
    </Box>
  )
}

export default Dashboard;
