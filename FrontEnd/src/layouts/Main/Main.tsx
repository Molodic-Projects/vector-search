import React from "react";
import { Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { UploadFiles } from "../../Components/UploadFiles/UploadFiles";
import { Search } from "../../Components/Search/Search";

export const Main: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Routes>
        <Route path="/upload-files" element={<UploadFiles />} />
        <Route path="/search" element={<Search />} />

        <Route path="/" element={<Navigate to="/upload-files" replace />} />
        <Route path="*" element={<Navigate to="/upload-files" replace />} />
      </Routes>
    </Box>
  );
};
