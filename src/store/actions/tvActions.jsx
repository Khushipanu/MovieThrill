export {removeTv} from "../reducers/tvSlice"
import axios from "../../utils/axios"
import { loadTv } from '../reducers/tvSlice'

export const asyncloadtv=(id)=>async(dispatch)=>{
  try{
    const [detail, externalid, recommendations, similar, translations, videos, watchproviders] =
      await Promise.all([
        axios.get(`/tv/${id}`),
        axios.get(`/tv/${id}/external_ids`).catch(()=>({data:{}})),
        axios.get(`/tv/${id}/recommendations`).catch(()=>({data:{results:[]}})),
        axios.get(`/tv/${id}/similar`).catch(()=>({data:{results:[]}})),
        axios.get(`/tv/${id}/translations`).catch(()=>({data:{translations:[]}})),
        axios.get(`/tv/${id}/videos`).catch(()=>({data:{results:[]}})),
        axios.get(`/tv/${id}/watch/providers`).catch(()=>({data:{results:{}}})),
      ]);

    const theultimatedetails={
      detail:detail.data,
      externalid:externalid.data,
      recommendations:recommendations.data.results,
      similar:similar.data.results,
      translations:translations.data.translations.map((t)=>t.english_name),
      videos:videos.data.results.find((video)=>video.type==="Trailer" && video.site==="YouTube"),
      watchproviders:watchproviders.data.results?.IN || null,
    };
    dispatch(loadTv(theultimatedetails))

  }catch(err){
    console.log("Error",err);
  }
}
