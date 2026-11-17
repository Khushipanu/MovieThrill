export { removeMovie } from "../reducers/movieSlice";
import axios from "../../utils/axios";
import { loadMovie } from "../reducers/movieSlice";

// Returns true when the movie loaded, false otherwise (so the page can show "not found").
export const asyncloadmovie = (id) => async (dispatch) => {
  try {
    const [detail, externalid, recommendations, similar, translations, videos, watchproviders] =
      await Promise.all([
        axios.get(`/movie/${id}`),
        axios.get(`/movie/${id}/external_ids`).catch(() => ({ data: {} })),
        axios.get(`/movie/${id}/recommendations`).catch(() => ({ data: { results: [] } })),
        axios.get(`/movie/${id}/similar`).catch(() => ({ data: { results: [] } })),
        axios.get(`/movie/${id}/translations`).catch(() => ({ data: { translations: [] } })),
        axios.get(`/movie/${id}/videos`).catch(() => ({ data: { results: [] } })),
        axios.get(`/movie/${id}/watch/providers`).catch(() => ({ data: { results: {} } })),
      ]);

    dispatch(
      loadMovie({
        detail: detail.data,
        externalid: externalid.data,
        recommendations: recommendations.data.results,
        similar: similar.data.results,
        translations: translations.data.translations.map((t) => t.english_name),
        videos: videos.data.results.find((video) => video.type === "Trailer" && video.site === "YouTube"),
        watchproviders: watchproviders.data.results?.IN || null,
      })
    );
    return true;
  } catch (err) {
    console.error("Failed to load movie", id, err);
    return false;
  }
};
