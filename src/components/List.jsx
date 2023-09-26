import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Add from "./Add";
import { useState } from "react";
import { cats } from "../data/cats";
import { v4 as uuidv4 } from "uuid";
import { TablePagination } from "@mui/material";

function showCat({ cat }) {
  console.log(cat);
  return (
    <TableRow key={uuidv4()}>
      <TableCell>{cat.name}</TableCell>
      <TableCell>{cat.address}</TableCell>
      <TableCell>{new Date(cat.birthdate).toLocaleString()}</TableCell>
    </TableRow>
  );
}

const List = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setCurrentPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };
  const catsRows = [];
  cats.forEach((cat) => {
    catsRows.push(showCat({ cat }));
  });
  return (
    <>
      <Container fixed>
        <h3>List</h3>
        <TableContainer>
          {" "}
          <Table>
            <TableHead>
              <TableRow>
                <th>Name</th>
                <th>Address</th>
                <th>Birthdate</th>
              </TableRow>
            </TableHead>
            <TableBody>
              {catsRows.slice(
                currentPage * rowsPerPage,
                currentPage * rowsPerPage + rowsPerPage
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={catsRows.length}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Container>
    </>
  );
};

export default List;
