import axios from "axios"
const instance=axios.create({
     baseURL : 'https://api.themoviedb.org/3/',
     headers: {
        accept: 'application/json', 
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTk0NmFjOGM3NGY5MTY1M2I3ODlkMjk0NmFiMTFjMyIsIm5iZiI6MTc5MTc3MzU1MC45MTEsInN1YiI6IjZhY2M0YjZlNDZiNmYyMTY3MWI3YmE1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CHbmpSbYv2Kkr2jm1dx_oPl4CtCkQwIewJW1A3CjRDs '}

})
export default instance;