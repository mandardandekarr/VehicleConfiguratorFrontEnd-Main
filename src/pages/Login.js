import React from "react";
import Box from "@mui/material/Box";
import Navbar from "../component/Navbar";
import Topbar from "../component/Topbar";
import Footer from "../component/Footer";
import { FormControl } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

const Login = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let demo = JSON.stringify(formData);

    fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: demo,
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data) { 
          alert("Successfully logged in");
          navigate("/welcome");
        } else {
          alert("Invalid user");
        }
      }).catch((error) => {
        console.error("An error occurred:", error);
      });

  };
  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Navbar />

        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Topbar />

          <Container maxWidth="false">
            <Box sx={{ flex: 1, overflowY: "auto", padding: "20px" }}></Box>
            <Paper
              elevation={3}
              sx={{ padding: 3, marginTop: 4, marginBottom: 4 }}
            >
              <Typography variant="h4" gutterBottom>
                Login
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="username"
                  type="text"
                  name="username"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                  onChange={handleChange}
                />
                <TextField
                  label="password"
                  type="text"
                  name="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={{ marginTop: 2, minWidth: 150 }}
                >
                  Submit
                </Button>
              </form>
            </Paper>
          </Container>

          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Login;
