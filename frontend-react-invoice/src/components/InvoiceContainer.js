import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from 'react-redux'
import { fetchInvoice, InvoiceAdd } from '../redux'
import { useEffect } from "react";
import {InvoiceChart} from './invoiceChart';
import DateRangeCount from './dateRangeCount';
import DeleteDialog from './deleteDialog';
import FilterByStatus from './filterByStatus';
import AddOrEditInvoice from './addOrEditInvoice';
import SearchByInvoiceNumber from './searchByInvoiceNumber';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(
  order,
  orderBy
){
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'No',
  },
  {
    id: 'invoice_no',
    numeric: true,
    disablePadding: false,
    label: 'Invoice no',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'created_date',
    numeric: true,
    disablePadding: false,
    label: 'Created date',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property) => (event) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
         <TableCell  align={'right' }>
            Action
         </TableCell>
      </TableRow>
    </TableHead>
  );
}

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

export const InvoicesContainer = () => {
  const [rows, setRows] = React.useState([]);
  const [updatedRows, setUpdatedRows] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const invoices = useSelector(state => state.invoice.invoices)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchInvoice())
  }, [])

  useEffect(() => {
    setRows(invoices)
    setUpdatedRows(invoices)
  }, [invoices])

  const handleRequestSort = (
    event,
    property,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows, updatedRows],
  );

  const reset =()=>{
    setRows(updatedRows)
  }

  const searchSubmit=(searchValue)=>()=>{
    const searchResult = rows.filter((item)=>{
      return item.invoice_no === searchValue
    })
    setUpdatedRows(rows)
    setRows(searchResult)
  }

  const submitFilterValue = (filterValue)=>{
    const filterResult = rows.filter((item)=>{
    return item.status === filterValue
  })
  setUpdatedRows(rows)
  setRows(filterResult)
}

const addInvoice = (addFlag, invoiceItem)=>{
    if(addFlag){
      invoiceItem.id = rows.length +1
      let updateRows = [... rows, invoiceItem ]
      setRows(updateRows)
      dispatch(InvoiceAdd(updateRows))
    }else if(!addFlag){
      const findItemIndex = rows.findIndex((item, i)=>{
        return item.id === invoiceItem.id
      })
      let updateRows = [... rows]
      updateRows.splice(findItemIndex, 1, invoiceItem)
      setRows(updateRows)
      dispatch(InvoiceAdd(updateRows))
    }
  }

 const handleDelete =(id)=>{
    const updateRows = rows.filter((item, i)=>{
      return item.id !== id
    })
    setRows(updateRows)
    setUpdatedRows(updateRows)
    dispatch(InvoiceAdd(updateRows))
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <div style={{ textAlign: 'center'}}>
          <AddOrEditInvoice addInvoice = {addInvoice} addFlag = {true} invoiceData = {null} />
          <SearchByInvoiceNumber 
          reset = {reset} 
          searchSubmit = {searchSubmit} />
          <FilterByStatus   reset = {reset}  submitFilterValue = {submitFilterValue} />
        </div>
        <div style={{margin: '24px'}}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {index+1}
                      </TableCell>
                      <TableCell align="right">{row.invoice_no}</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{getFormatedDate(row.created_date)}</TableCell>
                      <TableCell align="left">
                        <AddOrEditInvoice addInvoice = {addInvoice} addFlag = {false} invoiceData = {row} />
                        <DeleteDialog deleteId = {row.id} handleDelete={handleDelete} />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
      <div style={{margin: '24px'}}>
        <InvoiceChart data = {rows}/>
        <DateRangeCount />
      </div>
    </Box>
  );
}
