import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";
import {
  Search,
  Add,
  Delete,
  Edit,
  SaveAlt,
  Close,
  Check,
} from "@mui/icons-material";

const paper = {
  padding: 2,
};

const box = {
  marginBottom: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const table = {
  backgroundColor: "#2D2D30",
};

const DataTable = ({
  onCreate,
  onExport,
  onEdit,
  onDelete,
  datas,
  column,
  button,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = datas.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const columns = [
    { id: "id", hidden: true },
    { id: "no", title: "No", width: "1%" },
    ...column,
    {
      id: "action",
      title: "Action",
      width: "19%",
      align: "center",
      format: (row) => (
        <>
          <IconButton size="small" onClick={() => onDelete(row.id)}>
            <Delete />
          </IconButton>
          <IconButton size="small" onClick={() => onEdit(row.id)}>
            <Edit />
          </IconButton>
        </>
      ),
      hidden: button ? "hidden" : "",
    },
  ];

  return (
    <>
      <Paper sx={paper}>
        <Box sx={box}>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={handleSearch}
            variant="standard"
            InputProps={{ startAdornment: <Search fontSize="small" /> }}
          />
          <Box>
            {!button && (
              <>
                <Button
                  variant="contained"
                  startIcon={<SaveAlt />}
                  onClick={onExport}
                  sx={{ marginRight: 2 }}
                >
                  Export
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={onCreate}
                >
                  Create
                </Button>
              </>
            )}
          </Box>
        </Box>
        <TableContainer sx={table}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(
                  (column) =>
                    !column.hidden && (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{}}
                      >
                        <Typography variant="h6" style={{ padding: "6px" }}>
                          {column.title}
                        </Typography>
                      </TableCell>
                    )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10000} align="center">
                    <Typography variant="body1">Data not found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={row.id}>
                      {columns.map((column) => {
                        if (column.id === "no") {
                          return (
                            <TableCell
                              align={column.align}
                              key={column.id}
                              sx={{ width: column.width }}
                            >
                              <div style={{ textAlign: "center" }}>
                                {page * rowsPerPage + index + 1}
                              </div>
                            </TableCell>
                          );
                        } else if (column.id === "action" && button == null) {
                          return (
                            <TableCell
                              align={column.align}
                              key={column.id}
                              sx={{ width: column.width }}
                            >
                              <div style={{ textAlign: "center" }}>
                                {column.format(row)}
                              </div>
                            </TableCell>
                          );
                        } else if (
                          column.id === "isActive" ||
                          column.id === "isCompleted"
                        ) {
                          return (
                            <TableCell
                              align={column.align}
                              key={column.id}
                              sx={{ width: column.width }}
                            >
                              <div style={{ textAlign: "center" }}>
                                {row[column.id]
                                 ? <Check /> : <Close />}
                              </div>
                            </TableCell>
                          );
                        } else if (!column.hidden) {
                          const cellValue = row[column.id];

                          // Check if the cellValue is an array
                          if (Array.isArray(cellValue)) {
                            // Convert the array of objects to a string representation
                            const arrayString = cellValue
                              .map((obj) => JSON.stringify(obj))
                              .join(", ");
                            return (
                              <TableCell
                                align={column.align}
                                key={column.id}
                                sx={{ width: column.width }}
                              >
                                {arrayString}
                              </TableCell>
                            );
                          }

                          return (
                            <TableCell
                              align={column.align}
                              key={column.id}
                              sx={{ width: column.width }}
                            >
                              {
                                typeof cellValue === "object" &&
                                cellValue !== null
                                  ? cellValue.name 
                                  : cellValue 
                              }
                            </TableCell>
                          );
                        }
                        return null;
                      })}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          sx={table}
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default DataTable;
