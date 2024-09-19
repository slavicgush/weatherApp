import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from "url";
import { router as weatherRouter } from "./weather/index.js";

const app = express();

app.set('views', `${dirname(fileURLToPath(import.meta.url))}/weather/views`);
app.set('view engine','ejs');
app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));
app.use(express.urlencoded({ extended: false }));

app.use('/weather',weatherRouter);
app.get('/',(req,res) => res.redirect('/weather'));
app.get('*',(req,res) => res.redirect('/weather'));

app.listen(3000,() => {
  console.log("Weather App is listening...");
});