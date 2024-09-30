const cors = require('cors');
   const express = require('express');
   const path = require('path');
   const cookieParser = require('cookie-parser');
   const logger = require('morgan');
   require('dotenv').config();

   const indexRouter = require('./routes/index');
   const usersRouter = require('./routes/users');
   const projectsRouter = require("./routes/projects");

   const app = express();

   app.use(cors());
   app.use(logger('dev'));
   app.use(express.json());
   app.use(express.urlencoded({ extended: false }));
   app.use(cookieParser());

   app.use('/api/index', indexRouter);
   app.use('/api/users', usersRouter);
   app.use("/api/projects", projectsRouter);

   // 添加错误处理中间件
   app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).json({ error: 'Something went wrong!', details: err.message });
   });

   module.exports = app;
   