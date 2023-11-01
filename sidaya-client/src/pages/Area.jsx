import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import ModalComponent from "../components/Modal";
import { deleteData, getDataById, getOptionData, getAllData } from "../components/Api";
import { deleted } from "../components/Sweetalert";

function Area() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [editData, setEditData] = useState([]);
  const [option, setOption] = useState([]);

  const table = "area";

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
    { id: "capacity", title: "Capacity", width: "20%" },
    { id: "activityTemplate", title: "Jenis Budidaya", width: "20%" },
    { id: "waterLevel", title: "Ketinggian Air", width: "10%" },
    { id: "volume", title: "Volume Kolam", width: "10%" },
    { id: "weight", title: "Berat Ikan", width: "10%" },
    { id: "feed", title: "Berat Pakan Ikan", width: "10%" },
    { id: "isActive", title: "Aktif", align: "center", width: "10%" },
  ];

  const component = [
    { title: "Nama", type: "text", name: "name", value: editData.name },
    { title: "Capacity (ekor)", type: "number", name: "capacity", value: editData.capacity },
    { title: "Diameter Kolam (m)", type: "text", name: "volume", value: editData.volume },
    { title: "Berat Ikan (gr)", type: "number", name: "weight", value: editData.weight },
    { title: "Jenis Budidaya", type: "select", name: "activityTemplateId", value: editData.activityTemplateId, options: option },
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

export default Area;
