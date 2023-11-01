import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  capitalize,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { createData, editData } from "./Api";
import TimePicker from "./TimePicker";

const modal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "50%",
  maxHeight: "100%", // Set a maximum height for the form
  overflowY: "auto", // Allow vertical scrolling when content exceeds maxHeight
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const button = {
  display: "flex",
  justifyContent: "space-between",
  mt: 2,
};

const ModalComponent = ({ open, close, form, component, table, id }) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    // Konversi nilai menjadi integer jika tipe data adalah "number"
    const parsedValue = type === "number" ? parseInt(value) : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: parsedValue,
    }));
  };

  const handleClose = () => {
    setFormValues({}); // Clear the form values
    close();
  };

  // Function to add a new empty formula to the form values
  const handleAddFormulaForm = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      formula: [
        ...(prevValues.formula || []),
        { name: "", value: 0, message: "" },
      ],
    }));
  };

  // Function to handle changes in formula fields
  const handleFormulaChange = (event, index) => {
    const { name, value } = event.target;
    const parsedValue = name === "value" ? parseInt(value) : value;

    setFormValues((prevValues) => {
      const updatedFormula = prevValues.formula.map((item, i) =>
        i === index ? { ...item, [name]: parsedValue } : item
      );
      return { ...prevValues, formula: updatedFormula };
    });
  };

  // Function to remove a formula from the form values
  const handleRemoveFormula = (index) => {
    setFormValues((prevValues) => {
      const updatedFormula = prevValues.formula.filter(
        (item, i) => i !== index
      );
      return { ...prevValues, formula: updatedFormula };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form === "create") {
      createData(table, formValues);
      // console.log(formValues);
    } else if (form === "edit") {
      editData(table, id, formValues);
    }
    close();
  };

  return (
    <>
      <Modal open={open}>
        <Box sx={modal}>
          <Typography variant="h5" component="h2">
            {capitalize(form)} Data
          </Typography>
          <form onSubmit={handleSubmit}>
            {component.map((item, index) => (
              <Box key={index} sx={{ my: 2 }}>
                {item.type === "text" ? (
                  <Box>
                    <Typography sx={{ mb: 1 }}>{item.title}</Typography>
                    <TextField
                      variant="outlined"
                      type="text"
                      required
                      fullWidth
                      size="small"
                      name={item.name}
                      defaultValue={form === "edit" ? item.value : ""}
                      onChange={handleChange}
                    />
                  </Box>
                ) : item.type === "number" ? (
                  <Box>
                    <Typography sx={{ mb: 1 }}>{item.title}</Typography>
                    <TextField
                      variant="outlined"
                      type="number"
                      required
                      fullWidth
                      size="small"
                      name={item.name}
                      defaultValue={form === "edit" ? item.value : 0}
                      onChange={handleChange}
                      inputProps={{ step: "any" }}
                    />
                  </Box>
                ) : item.type === "time" ? (
                  <Box>
                    <Typography sx={{ mb: 1, alignItems: "center" }}>
                      {item.title}
                    </Typography>
                    <Box display="flex">
                      <TimePicker
                        name={item.name}
                        value={form === "edit" ? item.value : ""}
                        handleChange={handleChange}
                      />
                    </Box>
                  </Box>
                ) : item.type === "select" ? (
                  <Box>
                    <Typography sx={{ mb: 1 }}>{item.title}</Typography>
                    <FormControl
                      variant="outlined"
                      required
                      fullWidth
                      size="small"
                    >
                      <Select
                        onChange={handleChange}
                        name={item.name}
                        defaultValue={item.value || ""}
                      >
                        <MenuItem value="">--Pilih--</MenuItem>
                        {item.options.map((option, index) => (
                          <MenuItem key={index} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                ) : item.type === "formula" ? (
                  <Box>
                    <Typography sx={{ mb: 1 }}>{item.title}</Typography>
                    {formValues.formula &&
                      formValues.formula.map((formulaItem, index) => (
                        <Grid container spacing={2} key={index}>
                          <Grid item xs={3}>
                            <FormControl
                              variant="outlined"
                              required
                              fullWidth
                              size="small"
                            >
                              <Select
                                onChange={(e) => handleFormulaChange(e, index)}
                                name="name"
                                defaultValue=""
                              >
                                <MenuItem value="">--Pilih--</MenuItem>
                                <MenuItem value="berat_ikan">
                                  Berat Ikan
                                </MenuItem>
                                <MenuItem value="volume">Volume</MenuItem>
                                <MenuItem value="pakan">Pakan</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={5}>
                            <TextField
                              variant="outlined"
                              type="text"
                              fullWidth
                              required
                              size="small"
                              label="Message"
                              name="message"
                              onChange={(e) => handleFormulaChange(e, index)}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              variant="outlined"
                              type="text"
                              fullWidth
                              required
                              size="small"
                              label="Value"
                              name="value"
                              onChange={(e) => handleFormulaChange(e, index)}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              required
                              onClick={() => handleRemoveFormula(index)}
                              sx={{ mb: 2 }}
                            >
                              <Delete />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                    {/* Tombol "Add" di luar dari formValues.formula.map() */}
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleAddFormulaForm}
                      >
                        <Add />
                      </Button>
                    </Grid>
                  </Box>
                ) : null}
              </Box>
            ))}
            <Box sx={button}>
              <Button color="error" variant="text" onClick={handleClose}>
                Close
              </Button>
              <Button color="success" variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ModalComponent;
