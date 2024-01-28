import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';

// Instantiate express
const app: Express = express();

// Instantiate dotenv
dotenv.config();

// Use bodyParser to parse the JSON request.body
app.use(bodyParser.json());

// Use CORS install types
app.use(cors());

// Create Database Connection
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    entities: [Task],
    synchronize: true, // Warning automatically creates tables/schemas
});

// Define server port
const port = process.env.PORT;

AppDataSource.initialize()
    .then(() => {
        // Start listening to the requests on the defined port
        app.listen(port);
        console.log('Data Source initialized');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });

// Create a default route
app.use('/', tasksRouter);

// Run "node index.js" or "node ./dist/index.js" to start server
