import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { getAllData } from "../components/Api";

function Activity() {
  const [data, setData] = useState([]);

  const table = "activity";

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

  const column = [
    { id: "name", title: "Name", width: "20%" },
    { id: "description", title: "Description", width: "25%" },
    { id: "dueDate", title: "Date Time", align: "center", width: "10%" },
    { id: "area", title: "Area", width: "15%" },
    { id: "isCompleted", title: "Completed", align: "center", width: "10%" },
  ];


  return (
    <>
      <DataTable
        datas={data}
        column={column}
        button="0"
      />
    </>
  );
}

export default Activity;
