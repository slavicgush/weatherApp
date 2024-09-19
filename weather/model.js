import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'codee037',
  database: 'weather'
});
 try { 
  await db.connect();
  console.log('Connected to MYSQL Weather database');
 } catch(err){
  console.error('Database connection error:',err); 
}

export async function getCondition(){
  const query = `SELECT TO_BASE64(image) AS weatherImg FROM weathercondition WHERE id = 1 `;
  const [result] = await db.query(query);
  const weatherImg = result[0].weatherImg;
  return weatherImg;
}

