//mjs: module Javascript => import && export
//cjs: commonJS => require && module.exports
//js는 보통 cjs
//파일을 읽어오는 load 차이
//다른 언어와의 호환성 문제 떄문에 es6 문법
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3080);
