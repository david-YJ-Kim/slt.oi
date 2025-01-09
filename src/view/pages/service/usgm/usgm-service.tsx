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


const mockData: USGMData[] = [
  {
    fileName: 'abs.oi',
    localPath: 'C:\Workspace\abs\abs.oi',
    upstreamUrl: 'https://repo.com/david-YJ-Kim/wm.git',
    branch: 'Main'
  },
  {
    fileName: 'lvs.ui',
    localPath: 'C:\Workspace\abs\svm\wfs\lvs.ui',
    upstreamUrl: 'https://repo.com/david-YJ-Kim/wm.git',
    branch: 'Main'
  }
];

export default function USGMPage() {
  const [open, setOpen] = useState(false); // 하단 메시지에 대한 열림 여부
  const [message, setMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<USGMData | null>(null);
  const [tableData, setTableData] = useState<USGMData[]>(mockData);

  const handleRowButtonClick = (action: 'edit' | 'push', rowData: USGMData) => {
    
    if(action == 'edit'){
      setSelectedData(rowData);
      setDialogOpen(true)
    }else {
      const message = `${action} 버튼이 클릭되었습니다
    파일명: ${rowData.fileName}
    경로: ${rowData.localPath}
    URL: ${rowData.upstreamUrl}
    브랜치: ${rowData.branch}`;
    setMessage(message);
    setOpen(true);
    }
      
  };

  const handlePanelButtonClick = (action: "register") => {
    const message = `${action} 버튼이 클릭되었습니다.` 
    setMessage(message);
    setDialogOpen(true);

  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedData(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* 
    팝업 (add-repo-dialog) 인자로 넘길 저장 메소드
    하위 페이지에서 저장 버튼 클릭 시, 호출됨
  */
  const handleSave = (updatedData: USGMData) => {
    setTableData(prev => 
      prev.map(item => 
        item.fileName === selectedData?.fileName ? updatedData : item
      )
    );
    setMessage(`정보가 성공적으로 수정되었습니다.`);
    setOpen(true);
    setSelectedData(null);
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


                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
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

      {/* 등록 버튼 클릭 시, 팝업 발생 */}
      <GitInfoDialog 
                      open={dialogOpen} 
                      onClose={handleDialogClose}
                      data={selectedData}
                      onSave={handleSave}
                      mode={selectedData ? 'edit' : 'register'}  // selectedData 유무로 모드 결정
                    />

    </Box>
  );
}