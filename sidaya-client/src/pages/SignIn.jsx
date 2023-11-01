import { Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import React from "react";

function SignIn() {
  return (
    <>
      <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", minHeight: "100vh" }}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ width: "80%" }}>
                <TextField
                  label="Username"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  sx={{ marginBottom: 3 }}
                />
                <Button variant="contained" fullWidth 
                  sx={{ marginBottom: 2 }}>
                  Login
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default SignIn;
