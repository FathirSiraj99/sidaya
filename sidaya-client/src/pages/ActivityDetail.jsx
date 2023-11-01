import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import ModalComponent from "../components/Modal";
import { deleteData, getDataById, getOptionData, getAllData } from "../components/Api";
import { deleted } from "../components/Sweetalert";

function ActivityTemplate() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [editData, setEditData] = useState([]);
  const [option, setOption] = useState([]);

  const table = "activity-detail";

  const fetchData = async () => {
    try {
      const data = await getAllData(table);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    const option = await getOptionData("activity-template", "name")
    setOption(option)
    setModalOpen(true);
  };

  const handleExport = () => {
    console.log("export");
  };

  const handleEdit = async (id) => {
    const data = await getDataById(table, id);
    const option = await getOptionData("activity-template", "name")
    setOption(option)
    setModalOpen(true);
    setActionId(id);
    setEditData(data);
  };

  const handleDelete = (id) => {
    deleteData(table, id).then(() => {
      fetchData();
      deleted()
    });
  };

  const handleClose = () => {
    setModalOpen(false);
    setTimeout(() => {
      fetchData();
      setEditData([])
      setActionId(null)
      setOption([])
    }, 100);
  };

  const column = [
    { id: "name", title: "Name", width: "20%" },
    { id: "description", title: "Description", width: "25%" },
    { id: "nthDay", title: "Day", align: "center", width: "5%" },
    { id: "time", title: "Time", align: "center", width: "5%" },
    { id: "activityTemplate", title: "ActivityTemplate", width: "15%" },
    { id: "formula", title: "Formula JSON", width: "10%" },
  ];

  const component = [
    { title: "Nama", type: "text", name: "name", value: editData.name },
    { title: "Description", type: "text", name: "description", value: editData.description },
    { title: "day", type: "number", name: "nthDay", value: editData.nthDay },
    { title: "Time", type: "time", name: "time", value: editData.time },
    { title: "Acticity Template", type: "select", name: "activityTemplateId", value: editData.activityTemplateId, options: option },
    { title: "Formula", type: "formula", name: "formula", value: editData.formula },
  ];

  return (
    <>
      <DataTable
        onCreate={handleCreate}
        onExport={handleExport}
        onEdit={handleEdit}
        onDelete={handleDelete}
        datas={data}
        column={column}
      />

      <ModalComponent
        open={modalOpen}
        close={handleClose}
        form={actionId ? "edit" : "create"}
        component={component}
        table={table}
        id={actionId}
      />
    </>
  );
}

export default ActivityTemplate;
