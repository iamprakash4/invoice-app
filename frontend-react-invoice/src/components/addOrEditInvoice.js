import React from "react";
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import EditIcon from '@mui/icons-material/Edit';


function getFormatedDate (newValue){
    const today = new Date(newValue);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
  
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
  
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    return formattedToday;
  }

export default function AddOrEditInvoice(props){
    const [open, setOpen] = React.useState(false);
    const [invoice, setInvoice] = React.useState(props.invoiceData && Object.keys(props.invoiceData).includes('id') ? props.invoiceData : {
      invoice_no:'',
      description:'',
      status:'Active',
      created_date:dayjs(new Date())
    });
  
  
    const handleInvoiceNumaricChange = (event) => {
      let invoiceObj = {...invoice};
      invoiceObj[event.target.name] =event.target.value
      setInvoice(invoiceObj)
    };
  
    const handleInvoiceStringChange = (event) => {
      invoice[event.target.name] = event.target.value
      setInvoice(invoice)
    };
  
    const handleInvoiceCreatedDate =(newValue) => {
      invoice['created_date'] = getFormatedDate(newValue);
      setInvoice(invoice)
    }
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason !== 'backdropClick') {
        setOpen(false);
      }
    };
  
    const handleOk =()=>{
      props.addInvoice(props.addFlag,invoice)
      setOpen(false);
    }
  
    return (
      <div>
        {props.addFlag && (
         <Button onClick={handleClickOpen}> Add Invoice</Button>
        )}
  
        {!props.addFlag && (
          <EditIcon onClick={handleClickOpen} style={{marginRight: '10px'}} />
        )}
       
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>{props.addFlag ? 'Add': 'Edit '} Invoice form</DialogTitle>
          <DialogContent>
            <Box component="form" >
            <TextField 
              name='invoice_no'
              style={{marginTop: '24px '}}
              value={invoice.invoice_no}
              id="outlined-basic"
              label="Invoice no"
              variant="outlined" 
              size="small" 
              onChange={handleInvoiceNumaricChange} 
            /><br />
            <TextField 
              style={{marginTop: '24px '}}
              defaultValue={invoice.description}
              id="outlined-basic"  
              multiline
              rows={4} 
              label="Description" 
              variant="outlined"  
              size="small"  
              onChange={handleInvoiceStringChange} 
              name='description'
              /> <br />
            <FormControl  sx={{marginTop: '24px ', width: '220px'}}>
              <InputLabel id="demo-simple-select-label">status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={invoice.status}
                label="Filter By status"
                size="small"
                onChange={handleInvoiceStringChange} 
                name='status'
              >
                <MenuItem value={'Active'}>Active</MenuItem>
                <MenuItem value={'In Active'}>In Active</MenuItem>
              </Select>
            </FormControl><br />
            <TextField 
              style={{marginTop: '24px '}}
              value={invoice.amount}
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              size="small"
              name='amount'
              onChange={handleInvoiceNumaricChange}
            />
              <br />
              <div style={{marginTop: '24px '}}>
                created Date
              </div>
              <br />
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
              <DatePicker 
               value={dayjs(invoice.created_date)}
              onChange={handleInvoiceCreatedDate} 
              />
            </LocalizationProvider>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleOk}> {props.addFlag ? 'Add': 'Edit'}</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }