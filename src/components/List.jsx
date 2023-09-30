import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Add from "./Add";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCat, updateCat, deleteCat } from "../catSlice";

function showCat({ cat, onEdit, onDelete }) {
  return (
    <TableRow key={cat.id}>
      <TableCell>{cat.id}</TableCell>
      <TableCell>{cat.name}</TableCell>
      <TableCell>{cat.address}</TableCell>
      <TableCell>{new Date(cat.birthdate).toLocaleString()}</TableCell>
      <TableCell>
        <IconButton title="editButton" onClick={() => onEdit(cat)} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton title="deleteButton" onClick={() => onDelete(cat.id)} color="secondary">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

function initCats() {
  const cats = useSelector((state) => state.cats.cats);
  return cats;
}
const List = () => {
  const cats = initCats();
  const dispatch = useDispatch();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editCat, setEditCat] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const onEdit = (catToEdit) => {
    setEditCat(catToEdit);
    setOpenEditDialog(true);
    console.log("Edit cat with ID:", catToEdit.id);
  };

  const handleCloseEditDialog = () => {
    // Close the edit dialog
    setOpenEditDialog(false);
  };

  const handleSaveEdit = () => {
    // Implement your logic to save the edited cat here
    // You can dispatch the updateCat action to update the cat in the Redux store
    if (editCat) {
      dispatch(updateCat({ id: editCat.id, updateCat: editCat }));
    }
    // Close the edit dialog
    setOpenEditDialog(false);
  };
  const onDelete = (catId) => {
    // Implement delete logic here, e.g., show a confirmation dialog
    console.log("Delete cat with ID:", catId);
    dispatch(deleteCat({ id: catId }));
  };
  const catsRows = [];
  if (Array.isArray(cats)) {
    cats.forEach((cat) => {
      catsRows.push(showCat({ cat, onEdit, onDelete }));
    });
  }
  const tableHeaderCellStyle = {
    fontWeight: "bold",
  };
  return (
    <>
      <Container fixed>
        <h3>Records List</h3>
        <TableContainer>
          {" "}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={tableHeaderCellStyle}>ID</TableCell>
                <TableCell style={tableHeaderCellStyle}>Name</TableCell>
                <TableCell style={tableHeaderCellStyle}>Address</TableCell>
                <TableCell style={tableHeaderCellStyle}>Birthdate</TableCell>
                <TableCell style={tableHeaderCellStyle}>Actions</TableCell>
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
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={catsRows.length}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />

        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={editCat ? editCat.name : ""}
              onChange={(e) => setEditCat({ ...editCat, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              value={editCat ? editCat.address : ""}
              onChange={(e) =>
                setEditCat({ ...editCat, address: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Birthdate"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={editCat ? editCat.birthdate : ""}
              onChange={(e) =>
                setEditCat({ ...editCat, birthdate: e.target.value })
              }
              fullWidth
              margin="normal"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default List;
