import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { usgmApiService } from "../../../../api/usgm/usgm-api";

interface ActionConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  data: OiUsgmFetchRep | null;
  onSave: (data: OiUsgmFetchRep) => void; // TODO: void 에대한 문법 공부 필요
  mode: "delete" | "push" | "pull";
  message: string;
}

export default function ActionConfirmDialog({
  open,
  onClose,
  data,
  onSave,
  mode,
  message,
}: ActionConfirmDialogProps) {
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
    if (data) {
      setFormData(data);
    }
  }, [data, mode]); // mode의 변경도 추적함

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (mode === "delete") {
        await usgmApiService.deleteRecord(formData);
      }

      if (mode === "push") {
        await usgmApiService.gitPush(formData);
      }

      if (mode === "pull") {
        await usgmApiService.gitPull(formData);
      }

      onSave(formData);
    } catch (error) {
      console.log("Error execute action:", error);
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
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        {/* TITLE */}
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {message}
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        {/* CONTENT */}
        <DialogContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr", // 2개의 동일한 너비의 컬럼
              gap: 2,
              my: 2,
              "& .MuiTextField-root": {
                backgroundColor: "#f5f5f5", // 비활성화된 입력 필드의 배경색
              },
              alignItems: "start", // 각 컬럼의 내용을 위쪽에 정렬
            }}
          >
            {/* 왼쪽 섹션 */}
            <Box
              sx={{
                display: "grid",
                gap: 2,
                alignSelf: "start", // 왼쪽 박스를 위쪽에 정렬
                height: "fit-content", // 내용물 높이에 맞춤
              }}
            >
              <TextField
                name="fileName"
                label="리포지토리"
                fullWidth
                value={formData.fileName}
                disabled={true}
              />
              <TextField
                name="localPath"
                label="로컬 파일 경로"
                fullWidth
                value={formData.localPath}
                disabled={true}
              />
            </Box>

            {/* 오른쪽 섹션 */}
            <Box sx={{ display: "grid", gap: 2 }}>
              <TextField
                name="upstreamUrl"
                label="Upstream 주소"
                fullWidth
                value={formData.upstreamUrl}
                disabled={true}
              />
              <TextField
                name="branch"
                label="Branch"
                fullWidth
                value={formData.branch}
                disabled={true}
              />
            </Box>
          </Box>
        </DialogContent>

        {/* ACTION */}
        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {loading
              ? "처리 중..."
              : mode === "pull"
              ? "Pull"
              : mode === "delete"
              ? "삭제"
              : "Push"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
