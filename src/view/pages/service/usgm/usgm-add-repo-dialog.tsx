import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface GitInfoDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function GitInfoDialog({ open, onClose }: GitInfoDialogProps) {
  const [formData, setFormData] = useState({
    path: "",
    repository: "",
    branch: "",
    gitId: "",
    pwd: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // TODO: 폼 데이터 처리
    console.log(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          파일 경로
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 2, my: 2 }}>
          <TextField
            name="path"
            label="파일 경로"
            fullWidth
            value={formData.path}
            onChange={handleChange}
          />
          <TextField
            name="repository"
            label="git Repository"
            fullWidth
            value={formData.repository}
            onChange={handleChange}
          />
          <TextField
            name="branch"
            label="branch"
            fullWidth
            value={formData.branch}
            onChange={handleChange}
          />
          <TextField
            name="gitId"
            label="git ID"
            fullWidth
            value={formData.gitId}
            onChange={handleChange}
          />
          <TextField
            name="pwd"
            label="pwd"
            type="password"
            fullWidth
            value={formData.pwd}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button variant="contained" onClick={handleSubmit}>등록</Button>
      </DialogActions>
    </Dialog>
  );
}