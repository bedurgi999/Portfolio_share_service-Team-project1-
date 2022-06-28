import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { upload, deleteImg } from "../middlewares/imageUploadMiddleware";

const uploadRouter = Router();

// POST /upload : (프로필) 이미지 업로드
uploadRouter.post("/upload", login_required, upload.single('filename'), deleteImg, async (req, res) => {
    const profile = req.file.location;
    res.status(201).send(profile);
});

// DELETE /deleteimg/:id : (프로필) 이미지 삭제 (id => 이미지 파일명)
uploadRouter.delete("/deleteimg/:id", deleteImg, async (req, res) => {
    res.status(204).send("delete_success");
})

export { uploadRouter };