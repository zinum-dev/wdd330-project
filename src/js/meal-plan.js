import { commomHeaderFooter, getParam } from "./utils.mjs";


commomHeaderFooter();

const lat = getParam("lat")
const lon = getParam("lon")

console.log(lat, lon)