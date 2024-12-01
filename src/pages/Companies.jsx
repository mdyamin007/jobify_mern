import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import {
  fetchCompanies,
  createCompany,
  deleteCompany,
} from "../store/slices/companiesSlice";

const Companies = () => {
  const dispatch = useDispatch();
  const { companies, loading } = useSelector((state) => state.companies);

  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCompany(id));
  };

  const handleAddCompany = () => {
    const formData = new FormData();
    formData.append("name", companyName);
    formData.append("logo", logo);
    formData.append("location", location);
    formData.append("description", description);

    dispatch(createCompany(formData));
    setOpen(false);
    setCompanyName("");
    setLogo(null);
    setLocation("");
    setDescription("");
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Companies
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "16px" }}
        onClick={() => setOpen(true)}
      >
        Add Company
      </Button>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt="logo"
                      style={{ width: 50, height: 50 }}
                    />
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>{company.description || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(company.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Add Company Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          p={4}
          bgcolor="background.paper"
          borderRadius={2}
          boxShadow={3}
          maxWidth={400}
          mx="auto"
          mt={10}
        >
          <Typography variant="h6" gutterBottom>
            Add Company
          </Typography>
          <TextField
            fullWidth
            label="Company Name"
            variant="outlined"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          <Button
            variant="contained"
            component="label"
            style={{ marginBottom: "16px" }}
          >
            Upload Logo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setLogo(e.target.files[0])}
            />
          </Button>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCompany}
              disabled={!companyName || !logo || !location}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Companies;
