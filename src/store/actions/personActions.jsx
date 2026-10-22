export {removePerson} from "../reducers/personSlice"
import axios from "../../utils/axios"
import { loadPerson } from '../reducers/personSlice'

export const asyncloadperson=(id)=>async(dispatch)=>{
  try{
    const [detail, externalid, combinedcredits] = await Promise.all([
      axios.get(`/person/${id}`),
      axios.get(`/person/${id}/external_ids`),
      axios.get(`/person/${id}/combined_credits`),
    ]);

    const theultimatedetails={
      detail:detail.data,
      externalid:externalid.data,
      combinedcredits:combinedcredits.data.cast,
    };
    dispatch(loadPerson(theultimatedetails))

  }catch(err){
    console.log("Error",err);
  }
}
