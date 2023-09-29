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
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCat, updateCat, deleteCat } from "../catSlice";
import { TablePagination } from "@mui/material";

function showCat({ cat }) {
  return (
    <TableRow key={cat.id}>
      <TableCell>{cat.id}</TableCell>
      <TableCell>{cat.name}</TableCell>
      <TableCell>{cat.address}</TableCell>
      <TableCell>{new Date(cat.birthdate).toLocaleString()}</TableCell>
    </TableRow>
  );
}

function initCats() {
  const cats = useSelector((state) => state.cats.cats);
  return cats;
}
const List = () => {
  const dispatch = useDispatch();
  const cats = initCats();

  const status = useSelector((state) => state.cats.status);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
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
                <th>ID</th>
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
