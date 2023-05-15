import React from "react";
import { PieChart, Pie, Legend, Tooltip,  BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid } from "recharts";
import { useEffect } from "react";
import Typography from '@mui/material/Typography';


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
const getPieChartData=(data)=>{
    const dataWithDateFormat = data.map((item)=>{
        item.created_date = getFormatedDate(item.created_date)
        return item
    })
    const groupedByDate = dataWithDateFormat.reduce((obj, item)=>{
        if( obj[item.created_date]){
            obj[item.created_date] = obj[item.created_date]
        }else{
            obj[item.created_date] = 0
        }
        obj[item.created_date] +=parseInt(item.amount)
        return obj
    },{})

    const pieChartDataFormat = Object.keys(groupedByDate).map((k)=>{
        return {name: k, amount: groupedByDate[k]}
    })
    return pieChartDataFormat;
}

const getBarchartData =(data)=>{
   const formatedValue =  data.reduce((obj,item)=>{
  
        const arr_ = item.name.split('-')
        if( obj[arr_[0]]){
            obj[arr_[0]] = obj[arr_[0]]
        }else{
            obj[arr_[0]] = 0
        }
        obj[arr_[0]] += parseInt(item.amount)
        return obj
    },{})

    const barChartDataFormat = Object.keys(formatedValue).map((k)=>{
        return {name: k, amount: formatedValue[k]}
    })
    return barChartDataFormat
}


export function InvoiceChart(props) {
    const [data, setData] =  React.useState(getPieChartData(props.data));
    const [barData, setBarData] =  React.useState([]);
   console.log('ssssssssssss', barData)
    useEffect(() => {
        setData( getPieChartData(props.data))
    },[props.data]);

    useEffect(() => {
        setBarData( getBarchartData(data))
    },[data]);
  return (
    <div>
        <Typography variant="h4" gutterBottom>
             Day wise invoice data
        </Typography>
       
        <PieChart width={1000} height={400}>
            <Pie
                dataKey="amount"
                isAnimationActive={false}
                data={data}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
            />
            <Tooltip />
        </PieChart>
        <Typography variant="h4" gutterBottom>
            Year wise invoice data
        </Typography>
        <BarChart
            width={500}
            height={300}
            data={barData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
    </div>
  );
}
