import {
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Info } from "@mui/icons-material";
import {
  activeArea,
  getActivity,
  getAllData,
  getOptionData,
} from "../components/Api";
import ModalComponent from "../components/Modal";
import ActivityDescription from "../components/ActivityDescription";
import Alarm from "../components/Alarm";
import { checkActivityTime } from "../components/Sweetalert";

const paperStyle = {
  padding: 15,
  marginBottom: 15,
};

const cardStyle = {
  backgroundColor: "#1E1E1E",
  padding: 1,
  marginBottom: 2,
};

function Dashboard() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activityModal, setActivityModal] = useState(false);
  const [activityId, setActivityId] = useState(null);
  const [option, setOption] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getAllData("area");

      for (let i = 0; i < data.length; i++) {
        let activity = await getActivity(data[i].id);

        data[i].activity = activity;
      }

      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleActiveClick = async (id) => {
    await activeArea(id);
    fetchData();
  };

  const handleOpen = async () => {
    const option = await getOptionData("activity-template", "name");
    setOption(option);
    setModalOpen(true);
  };

  const trimTime = (timeString) => {
    const trimmedString = timeString.substring(0, 16).replace(/[-:T]/g, "");
    return parseInt(trimmedString, 10);
  };

  const handleDetail = (id, time) => {
    const timezoneOffset = new Date().getTimezoneOffset();
    const currentTime = new Date(
      Date.now() - timezoneOffset * 60000
    ).toISOString();

    console.log(trimTime(time))
    console.log(trimTime(currentTime))

    if (trimTime(time) > trimTime(currentTime)) return checkActivityTime();

    setActivityModal(true);
    setActivityId(id);
  };

  const handleClose = () => {
    setModalOpen(false);
    setActivityModal(false);
    setActivityId(null);
    setTimeout(() => {
      fetchData();
    }, 100);
  };

  const component = [
    { title: "Nama", type: "text", name: "name" },
    { title: "Capacity (ekor)", type: "number", name: "capacity" },
    { title: "Diameter Kolam (m)", type: "text", name: "volume" },
    {
      title: "Jenis Budidaya",
      type: "select",
      name: "activityTemplateId",
      options: option,
    },
  ];

  return (
    <>
      <Button variant="contained" fullWidth sx={{ mb: 2 }} onClick={handleOpen}>
        Create Area
      </Button>
      <Alarm time="2023-08-02T14:30:00.000Z" />
      {data &&
        data.map((item, index) =>
          item.isActive === 1 ? (
            <Paper style={paperStyle} key={index}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card sx={cardStyle}>Nama : {item.name}</Card>
                  <Card sx={cardStyle}>Kapasitas : {item.capacity}</Card>
                  <Card sx={cardStyle}>
                    Jenis Budidaya : {item.activityTemplate.name}
                  </Card>
                  <Card sx={cardStyle}>Berat Ikan : {item.weight} </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={cardStyle}>
                    <Typography variant="h6">Task List :</Typography>
                    <Divider />
                    <List>
                      {item.activity.map((activity, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <>
                              {activity.date}
                              <IconButton
                                edge="end"
                                onClick={() =>
                                  handleDetail(activity.id, activity.dueDate)
                                }
                              >
                                <Info />
                              </IconButton>
                            </>
                          }
                        >
                          <ListItemText primary={activity.name} />
                          <Alarm time={activity.dueDate} />
                        </ListItem>
                      ))}
                    </List>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <Paper style={paperStyle} key={index}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card sx={cardStyle}>Nama : {item.name}</Card>
                  <Card sx={cardStyle}>Kapasitas : {item.capacity}</Card>
                  <Card sx={cardStyle}>
                    Jenis Budidaya : {item.activityTemplate.name}
                  </Card>
                  <Card sx={cardStyle}>Ketinggian Air : {item.waterLevel}</Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={cardStyle}>
                    <Typography variant="h5" align="center" my={1}>
                      Aktivasi Area
                    </Typography>
                    <Button
                      my={2}
                      variant="contained"
                      onClick={() => handleActiveClick(item.id)}
                      sx={{ width: "100%", height: "100%" }}
                    >
                      Active
                    </Button>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          )
        )}

      <ModalComponent
        open={modalOpen}
        close={handleClose}
        form="create"
        component={component}
        table="area"
      />

      <ActivityDescription
        open={activityModal}
        close={handleClose}
        id={activityId}
      />
    </>
  );
}

export default Dashboard;
