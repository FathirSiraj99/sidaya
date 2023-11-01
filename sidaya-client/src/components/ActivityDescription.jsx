import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
  capitalize,
} from "@mui/material";
import { editData, getDetailActivity, setIsCompleted } from "./Api";

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

const ActivityDescription = ({ open, close, id }) => {
  const [data, setData] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [formValue, setFormValue] = useState("");

  const fetchData = async () => {
    const activity = await getDetailActivity(id);

    activity.area = activity.area.name;
    console.log(activity);
    setAreaId(activity.areaId);
    setData(activity);
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const handleClose = () => {
    setData([]);
    close();
  };

  const handleComplete = () => {
    setIsCompleted(data.id)
    handleClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editData("area", areaId, { weight: parseFloat(formValue) });
    editData("activity", data.id, { "isCompleted": 2 })
    handleClose();
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setFormValue(value);
  };

  const renderFormula = (data) => {
    if (data) {
      return <div dangerouslySetInnerHTML={{ __html: data }} />;
    }
    return null;
  };

  return (
    <>
      {!data.formula || data.formula === null ? (
        <Modal open={open}>
          <Box sx={modal}>
            <Typography variant="h4" component="h2" mb={2}>
              {data.area} : {data.name}
            </Typography>
            <Divider />
            <Typography variant="h6" mt={2}>
              {data.description}
            </Typography>
            <Box sx={button}>
              <Button color="error" variant="text" onClick={handleClose}>
                Close
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={handleComplete}
              >
                Complete
              </Button>
            </Box>
          </Box>
        </Modal>
      ) : data.isCompleted === 0 || 2 ? (
        <Modal open={open}>
          <Box sx={modal}>
            <Typography variant="h4" component="h2" mb={2}>
              {data.area} : {data.name}
            </Typography>
            <Divider />
            <Box my={2}>{renderFormula(data.formula)}</Box>
            <Divider />
            <Typography variant="h6" mt={2}>
              {data.description}
            </Typography>
            <Box sx={button}>
              <Button color="error" variant="text" onClick={handleClose}>
                Close
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={handleComplete}
              >
                Complete
              </Button>
            </Box>
          </Box>
        </Modal>
      ) :  data.formulaJson.some(
          (item) => item.name === "berat_ikan" || item.name === "pakan"
        ) ? (
        <Modal open={open}>
          <Box sx={modal}>
            <Typography variant="h4" component="h2" mb={2}>
              Data Configuration
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit}>
              <Box mt={2}>
                <Typography sx={{ mb: 1 }}>
                  Berat rata-rata Ikan saat ini
                </Typography>
                <TextField
                  variant="outlined"
                  type="number"
                  required
                  fullWidth
                  size="small"
                  name="weight"
                  value={formValue}
                  onChange={handleChange}
                />
              </Box>
              <Box sx={button}>
                <Button color="error" variant="text" onClick={handleClose}>
                  Close
                </Button>
                <Button color="success" variant="contained" type="submit">
                  Set
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
        ) : null}
    </>
  );
};

export default ActivityDescription;
