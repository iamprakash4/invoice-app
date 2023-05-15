import * as React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

export default function FilterByStatus(props){
    const [filterValue, setFilterValue] = React.useState('');
  
    const handleChange = (event) => {
      setFilterValue(event.target.value);
      props.submitFilterValue(event.target.value)
    };
  
    return (
      <Box >
        <FormControl sx={{width: '220px'}}>
          <InputLabel id="demo-simple-select-label">Filter By status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterValue}
            label="Filter By status"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value={'Active'}>Active</MenuItem>
            <MenuItem value={'In Active'}>In Active</MenuItem>
          </Select>
        </FormControl>
        &nbsp; &nbsp; &nbsp; 
        <Button  variant="outlined" color="success" onClick={()=>{
          setFilterValue('')
          props.reset()
        }}>
          Reset
        </Button>
      </Box>
    );
  }