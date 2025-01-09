import { useEffect, useState } from "react";
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
  onClose: () => void; // 상위에서 종료 시 호출되는 메소드
  data:USGMData | null;
  onSave: (data: USGMData) => void; // TODO: void 에대한 문법 공부 필요
  mode: 'edit' | 'register'; // 모드 설정하여 수정과 등록을 구분
}

export default function GitInfoDialog({ open, onClose, data, onSave, mode }: GitInfoDialogProps) {
  const [formData, setFormData] = useState<USGMData>({
    fileName: '',
    localPath: '',
    upstreamUrl: '',
    branch: ''
  });

  // 초기 화면 랜딩 시 호출되는 메소드
  useEffect(() => {

    // data 존재 여부 및 edit 모드 확인
    if(data && mode === 'edit') { // 데이터가 null이 아니라면 ? 이라는 의미로 이해됨
      setFormData(data);
    } else {
      // 등록을 위해 빈값으로 설정
      setFormData({
        fileName: '',
        localPath: '',
        upstreamUrl: '',
        branch: ''
      });
    }
  }, [data, mode]) // mode의 변경도 추적함


  /* HTML 인풋 인자를 가져와서, key-value 구성됨. 
    이전 값은 동일하게 유지하고
    변경된 항목만 key로 조회해서 변경 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /* 
    등록 버튼, mode에 따라서 구분됨
    등록 모드 시 (register): 외부 통신하여 신규 데이터를 B/E에 적재 요청
    수정 모드 시 (edit): mockData 기준, 인자로 받은 함수를 통해서 onSave 메소드 호출 
  */
  const handleSubmit = async () => {
    try {
      if (mode === 'register') {
        // API Call
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // 아닐 시, 
      onSave(formData);
      // setShowMessage(true);

      // timeout 설정하여, 일정 시간 후 자동으로 안보이게 처리
      setTimeout(() => {
        onClose();
        // setShowMessage(false);
        onClose();
      })
    } catch (error) {
      console.log (`Error saveing data:`, error);
    }
  };


  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {mode === 'edit' ? '정보 수정' : '새 파일 등록'}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 2, my: 2 }}>
        <TextField
            name="fileName"
            label="파일명"
            fullWidth
            value={formData.fileName}
            onChange={handleChange}
            disabled={mode === 'edit'}
          />
          <TextField
            name="localPath"
            label="로컬 파일 경로"
            fullWidth
            value={formData.localPath}
            onChange={handleChange}
          />
          <TextField
            name="upstreamUrl"
            label="Upstream 주소"
            fullWidth
            value={formData.upstreamUrl}
            onChange={handleChange}
          />
          <TextField
            name="branch"
            label="Branch"
            fullWidth
            value={formData.branch}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {mode === 'edit' ? '저장' : '등록'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}