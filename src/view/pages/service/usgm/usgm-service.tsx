import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  AppBar,
  Toolbar,
  styled,
  Alert,
  Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GitInfoDialog from './usgm-add-repo-dialog';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#3f51b5',
  color: theme.palette.common.white,
  fontSize: 14,
  '&.header': {
    fontWeight: 'bold',
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: '#e0e0e0',
  color: 'black',
  '&:hover': {
    backgroundColor: '#bdbdbd',
  }
}));

interface USGMData {
  fileName: string;
  localPath: string;
  upstreamUrl: string;
  branch: string;
}

const mockData: USGMData[] = [
  {
    fileName: 'fileName',
    localPath: 'c:\\tspsc\\workspace',
    upstreamUrl: 'https://github.com/david-YJ-Kim/wm.git',
    branch: 'Main'
  },
  {
    fileName: 'fileName',
    localPath: '',
    upstreamUrl: 'https://github.com/david-YJ-Kim/wm.git',
    branch: 'Main'
  },
  {
    fileName: 'fileName',
    localPath: '',
    upstreamUrl: 'https://github.com/david-YJ-Kim/wm.git',
    branch: 'Main'
  },
  {
    fileName: 'fileName',
    localPath: '',
    upstreamUrl: 'https://github.com/david-YJ-Kim/wm.git',
    branch: 'Main'
  }
];

export default function USGMPage() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRowButtonClick = (action: 'edit' | 'push', rowData: USGMData) => {
    const message = `${action} 버튼이 클릭되었습니다
    
    파일명: ${rowData.fileName}
    경로: ${rowData.localPath}
    URL: ${rowData.upstreamUrl}
    브랜치: ${rowData.branch}`;
        setMessage(message);
        setOpen(true);
  };

  const handlePanelButtonClick = (action: "register") => {
    const message = `${action} 버튼이 클릭되었습니다.` 
    setMessage(message);
    setDialogOpen(true);

  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5', marginBottom: 3 }}>
        <Toolbar>
          <Typography variant="h6">USGM</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell className="header">이름</StyledTableCell>
                <StyledTableCell className="header">로컬 파일 경로</StyledTableCell>
                <StyledTableCell className="header">Upstream 주소</StyledTableCell>
                <StyledTableCell className="header">Branch</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                    sx={{ 
                      backgroundColor: '#e0e0e0',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: '#bdbdbd'
                      }
                    }}
                    onClick={() => handlePanelButtonClick('register')}
                  >
                    등록
                  </Button>

                  <GitInfoDialog 
                      open={dialogOpen} 
                      onClose={handleDialogClose}
                    />


                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white' }}>
                    {row.fileName}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white' }}>
                    {row.localPath}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: '#e0e0e0' }}>
                    {row.upstreamUrl}
                  </TableCell>
                  <TableCell>{row.branch}</TableCell>
                  <TableCell align="right">
                    <StyledButton 
                      variant="contained" 
                      size="small"
                      onClick={() => handleRowButtonClick('push', row)}
                    >
                      Push
                    </StyledButton>
                    <StyledButton 
                      variant="contained" 
                      size="small"
                      onClick={() => handleRowButtonClick('edit', row)}
                    >
                      edit
                    </StyledButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ whiteSpace: 'pre-line' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}