// import { Button } from "@mui/material";
// import axios from "axios";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const BadRequest = () => {
//   const navigate = useNavigate();

//   const handleGoBack = () => {
//     axios.get('/api/endpoint')
//     .then(response => {
//       navigate("/");
//     })
//     .catch(error => {
//       if (error.response && error.response.status === 400) {
//         navigate('/bad-request')
//       } else {
//         console.error('Error:', error);
//       }
//     });
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         textAlign: "center",
//       }}
//     >
//       <h1>400 - Bad Request</h1>
//       <p>Oops, something went wrong.</p>
//       <br/>
//       <p>This page isn't working at the moment.</p>
//       <Button variant="contained" onClick={handleGoBack}>Go Back</Button>
//     </div>
//   );
// };

// export default BadRequest;
