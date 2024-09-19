
import{ getCondition } from './model.js';

export async function homePage(request,response){
  const weatherImg = await getCondition();
  response.render(`index`,{ weatherImg:weatherImg });
}
