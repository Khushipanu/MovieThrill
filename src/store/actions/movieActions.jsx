export {removeMovie} from "../reducers/movieSlice"
import axios from "../../utils/axios"
import { loadMovie } from '../reducers/movieSlice'

export const asyncloadmovie=(id)=>async(dispatch)=>{
  try{
    const [detail, externalid, recommendations, similar, translations, videos, watchproviders] =
      await Promise.all([
        axios.get(`/movie/${id}`),
        axios.get(`/movie/${id}/external_ids`),
        axios.get(`/movie/${id}/recommendations`),
        axios.get(`/movie/${id}/similar`),
        axios.get(`/movie/${id}/translations`),
        axios.get(`/movie/${id}/videos`),
        axios.get(`/movie/${id}/watch/providers`),
      ]);

    const theultimatedetails={
      detail:detail.data,
      externalid:externalid.data,
      recommendations:recommendations.data.results,
      similar:similar.data.results,
      translations:translations.data.translations.map((t)=>t.english_name),
      videos:videos.data.results.find((video)=>video.type==="Trailer" && video.site==="YouTube"),
      watchproviders:watchproviders.data.results.IN || null,

    };
    dispatch(loadMovie(theultimatedetails))

  }catch(err){
    console.log("Error",err);

  }
}
