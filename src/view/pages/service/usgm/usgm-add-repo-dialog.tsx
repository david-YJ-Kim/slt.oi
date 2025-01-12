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
  Snackbar,
  Alert,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { usgmApiService } from "../../../../api/usgm/usgm-api";

interface GitInfoDialogProps {
  open: boolean;
  onClose: () => void; // 상위에서 종료 시 호출되는 메소드
  data: OiUsgmFetchRep | null;
  onSave: (data: OiUsgmFetchRep) => void; // TODO: void 에대한 문법 공부 필요
  mode: "edit" | "register"; // 모드 설정하여 수정과 등록을 구분
}

export default function GitInfoDialog({
  open,
  onClose,
  data,
  onSave,
  mode,
}: GitInfoDialogProps) {
  const [formData, setFormData] = useState<OiUsgmFetchRep>({
    objId: "",
    fileName: "",
    localPath: "",
    upstreamUrl: "",
    branch: "",
    gitEmail: "",
    gitToken: "",
  });
  const [loading, setLoading] = useState(false); // api 로딩 state
  const [error, setError] = useState<string | null>(null); // api 로딩 실패 시 보여주는 에러

  // 초기 화면 랜딩 시 호출되는 메소드
  useEffect(() => {
    // data 존재 여부 및 edit 모드 확인
    if (data && mode === "edit") {
      // 데이터가 null이 아니라면 ? 이라는 의미로 이해됨
      setFormData(data);
    } else {
      // 등록을 위해 빈값으로 설정
      setFormData({
        objId: "",
        fileName: "",
        localPath: "",
        upstreamUrl: "",
        branch: "",
        gitEmail: "",
        gitToken: "",
      });
    }
  }, [data, mode]); // mode의 변경도 추적함

  /* HTML 인풋 인자를 가져와서, key-value 구성됨. 
    이전 값은 동일하게 유지하고
    변경된 항목만 key로 조회해서 변경 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* 
    등록 버튼, mode에 따라서 구분됨
    등록 모드 시 (register): 외부 통신하여 신규 데이터를 B/E에 적재 요청
    수정 모드 시 (edit): mockData 기준, 인자로 받은 함수를 통해서 onSave 메소드 호출 
  */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      if (mode === "register") {
        // API 호출
        await usgmApiService.registerNewRecord(formData);
      }
      if (mode === "edit") {
        await usgmApiService.editRecord(formData);
      }
      onSave(formData);

      // timeout 설정하여, 일정 시간 후 자동으로 안보이게 처리
      // setTimeout(() => {
      //   onClose();
      // }, 1500);

      setFormData({
        objId: "",
        fileName: "",
        localPath: "",
        upstreamUrl: "",
        branch: "",
        gitEmail: "",
        gitToken: "",
      });
    } catch (error) {
      console.error("Error saving data:", error);
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            minHeight: "30vh", // Dialog의 최소 높이를 화면 높이의 80%로 설정
            maxHeight: "90vh", // Dialog의 최대 높이를 화면 높이의 90%로 설정
          },
        }}
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {mode === "edit" ? "정보 수정" : "새 파일 등록"}
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            overflowY: "visible", // 스크롤바 제거
            "& .MuiDialogContent-root": {
              overflowY: "visible", // 내부 컨텐츠의 스크롤바도 제거
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: 2,
              my: 2,
              minHeight: "fit-content", // 내용물 크기에 맞게 높이 조절
            }}
          >
            <TextField
              name="fileName"
              label="파일명"
              fullWidth
              value={formData.fileName}
              onChange={handleChange}
              disabled={mode === "edit"}
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
            <TextField
              name="gitEmail"
              label="GitHub 아이디디"
              fullWidth
              value={formData.gitEmail}
              onChange={handleChange}
              disabled={mode === "edit"}
            />
            <TextField
              type="password"
              name="gitToken"
              label="GitHub 토큰큰"
              fullWidth
              value={formData.gitToken}
              onChange={handleChange}
              disabled={mode === "edit"}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {loading ? "처리 중..." : mode === "edit" ? "저장" : "등록"}
          </Button>
        </DialogActions>
      </Dialog>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
