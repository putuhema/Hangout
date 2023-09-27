import multer from "multer";
import path from "path";
import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { promisify } from "util";

const prisma = new PrismaClient();

const unlinkAsync = promisify(fs.unlink);
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = "uploads/";
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    let ext: string | number = file.originalname.lastIndexOf(".");
    ext = file.originalname.substring(ext + 1);
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

export const upload = multer({ storage });
