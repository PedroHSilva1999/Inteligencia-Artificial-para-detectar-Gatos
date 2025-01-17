import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
const routes = Router();

routes.post("/detect-cat", upload.single("image"), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Nenhuma imagem foi enviada" });
      return;
    }

    const imagePath = req.file.path;
    
    const { stdout } = await execPromise(`python detect.py --source "${imagePath}" --weights yolov8n.pt`);
    
    const jsonStr = stdout.trim();
    const results = JSON.parse(jsonStr);
    
    fs.unlinkSync(imagePath);

    res.json({
      detectados: results.detections.length,
      detalhes: results.detections,
      image: results.image
    });

  } catch (parseError) {
    console.error(parseError);
    res.status(500).json({ error: "Erro ao processar a imagem" });
  }
});

export default routes;