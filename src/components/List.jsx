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
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Add from "./Add";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCat, updateCat, deleteCat } from "../catSlice";

function showCat({ cat, onEdit, handleOpenDeleteDialog }) {
  return (
    <TableRow key={cat.id}>
      <TableCell style={{ width: "100px" }}>{cat.id}</TableCell>
      <TableCell style={{ width: "150px" }}>{cat.name}</TableCell>
      <TableCell style={{ width: "200px" }}>{cat.address}</TableCell>
      <TableCell style={{ width: "150px" }}>
        {new Date(cat.birthdate).toLocaleString()}
      </TableCell>

      <TableCell>
        <IconButton
          title="Edit"
          onClick={() => onEdit(cat)}
          color="primary"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          title="Delete"
          onClick={() => handleOpenDeleteDialog(cat.id)}
          color="secondary"
        >
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
  const [newCat, setNewCat] = useState({
    name: "",
    address: "",
    birthdate: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteCatId, setDeleteCatId] = useState(null);

  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editCat, setEditCat] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleOpenDeleteDialog = (catId) => {
    setDeleteCatId(catId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteCatId(null);
    setDeleteDialogOpen(false);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
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
  const handleSaveNewEntry = () => {
    // Perform any validation or data manipulation if needed
    if (newCat.name && newCat.address && newCat.birthdate) {
      // Dispatch an action to add the new entry to your Redux store
      dispatch(addCat(newCat));
      openSnackbar("New entry created successfully."); // Show success message

      // Clear the input fields and close the "Add" dialog
      setNewCat({
        name: "",
        address: "",
        birthdate: "",
      });
      handleCloseAddDialog();
    } else {
      // Handle validation or display an error message
      openSnackbar("Please fill in all fields."); // Show error message
    }
  };
  const handleConfirmDelete = () => {
    // Implement your logic to delete the cat here
    if (deleteCatId) {
      dispatch(deleteCat({ id: deleteCatId }));
      openSnackbar("Record deleted successfully."); // Show success message
    }

    // Close the delete confirmation dialog
    handleCloseDeleteDialog();
  };

  const handleSaveEdit = () => {
    // Implement your logic to save the edited cat here
    // You can dispatch the updateCat action to update the cat in the Redux store
    if (editCat) {
      dispatch(updateCat({ id: editCat.id, updateCat: editCat }));
      openSnackbar("Record updated successfully."); // Show success message
    }
    // Close the edit dialog
    setOpenEditDialog(false);
  };

  const catsRows = [];
  if (Array.isArray(cats)) {
    cats.forEach((cat) => {
      catsRows.push(showCat({ cat, onEdit, handleOpenDeleteDialog }));
    });
  }
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const isTableEmpty = catsRows.length === 0;

  const tableHeaderCellStyle = {
    fontWeight: "bold",
  };
  return (
    <>
      <Container fixed>
        <h3>Records List</h3>
        <div style={{ position: "relative", padding: "50px" }}>
          <div>
            {isTableEmpty ? (
              <p>No records to display.</p>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={tableHeaderCellStyle}>ID</TableCell>
                      <TableCell style={tableHeaderCellStyle}>Name</TableCell>
                      <TableCell style={tableHeaderCellStyle}>
                        Address
                      </TableCell>
                      <TableCell style={tableHeaderCellStyle}>
                        Birthdate
                      </TableCell>
                      <TableCell style={tableHeaderCellStyle}>
                        Actions
                      </TableCell>
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
            )}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={catsRows.length}
              page={currentPage}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </div>

          <div style={{ position: "absolute", top: "10px", right: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenAddDialog}
            >
              Add New Entry
            </Button>
          </div>
        </div>
        <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
          <DialogTitle>Add New Record</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={newCat.name}
              onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Address"
              value={newCat.address}
              onChange={(e) =>
                setNewCat({ ...newCat, address: e.target.value })
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
              value={newCat.birthdate}
              onChange={(e) =>
                setNewCat({ ...newCat, birthdate: e.target.value })
              }
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveNewEntry} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

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
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this record?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000} // Adjust the duration as needed
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Container>
      <AppBar position="static" style={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Container maxWidth="sm">
            <Typography variant="body1" color="inherit">
              Copyright © 2023 S M Samnoon Abrar
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default List;
