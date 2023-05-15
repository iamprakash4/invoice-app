import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function SearchByInvoiceNumber(props){
    const [search, setSearch] = React.useState('');
  
    const handleChange = (event) => {
      setSearch(event.target.value);
    };
    
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField value={search} id="outlined-basic" label="Invoice no" variant="outlined"  size="small"  onChange={handleChange} />
        <Button variant="contained" color="success" onClick={props.searchSubmit(search)} >
          click to Search
        </Button>
        <Button  variant="outlined" color="success" onClick={()=>{
          setSearch('')
          props.reset()
        }}>
          Reset
        </Button>
      </Box>
    );
  }
  