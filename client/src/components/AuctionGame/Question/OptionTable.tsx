import { OptionEntry } from '@/types/auction';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { blueGrey, grey } from '@mui/material/colors';

const optionsTableStyle = {
  minWidth: 270,
  my: 1,
  '& *': {
    textAlign: 'center !important'
  }
};

interface OptionTableProps {
  rows: OptionEntry[];
}

export default function OptionTable({ rows }: OptionTableProps) {
  return (
    <TableContainer sx={optionsTableStyle} component={Paper}>
      <Table aria-label='simple table'>
        <TableHead sx={{ bgcolor: blueGrey[600], '& *': { color: 'white !important' } }}>
          <TableRow>
            <TableCell>Probability</TableCell>
            <TableCell>Second Highest Bid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ bgcolor: grey[100], '& *': { fontSize: '0.97rem !important' } }}>
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row[0]}</TableCell>
              <TableCell>${row[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
