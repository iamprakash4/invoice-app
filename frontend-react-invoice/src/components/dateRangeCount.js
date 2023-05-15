
import React from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useEffect } from "react";
import Typography from '@mui/material/Typography';


function getFormatedDate (newValue){
    const today = new Date(newValue);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
  
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
  
    const formattedToday = mm + '/' + dd + '/' + yyyy;
    return formattedToday;
}

export default function DateRangeCount() {
    const [day, setDay] = React.useState([]);
    const [dayCount, setDayCount] = React.useState(0)
 
    function daysdifference(firstDate, secondDate){  
        var startDay = new Date(firstDate);  
        var endDay = new Date(secondDate);  
    // Determine the time difference between two dates     
        var millisBetween = startDay.getTime() - endDay.getTime();  
    // Determine the number of days between two dates  
        var days = millisBetween / (1000 * 3600 * 24);  
    // Show the final number of days between dates     
        return Math.round(Math.abs(days));  
    }  

    useEffect(() => {
        const count = daysdifference(getFormatedDate(day[0]), getFormatedDate(day[1]))
        setDayCount(count)
    },[day]);

  return (
    <div>
        <Typography variant="h4" gutterBottom>
            Date Range
        </Typography>
       
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
                <DateRangePicker 
                    localeText={{ start: 'Start Date', end: 'End Date' }} 
                    onChange = {(value)=>{
                        if(value.length > 1 && value[0] && value[1] ){
                            setDay([value[0]['$d'], value[1]['$d']])
                        }

                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
        Days Count : {dayCount}
    </div>
  );
}
