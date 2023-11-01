import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import ModalComponent from "../components/Modal";
import { deleteData, getAllData, getDataById } from "../components/Api";
import { deleted } from "../components/Sweetalert";

function ActivityTemplate() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [editData, setEditData] = useState([]);

  const table = "activity-template";

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

  const handleCreate = () => {
    setModalOpen(true);
  };

  const handleExport = () => {
    console.log("export");
  };

  const handleEdit = async (id) => {
    const data = await getDataById(table, id);
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
    }, 100);
  };

  const column = [{ id: "name", title: "Name", width: "80%" }];

  const component = [
    { title: "Nama", type: "text", name: "name", value: editData.name },
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
