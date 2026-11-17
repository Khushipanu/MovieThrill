import { useCallback, useEffect, useRef, useState } from "react";
import axios from "../utils/axios";

/**
 * Loads a paginated TMDB list for infinite scroll.
 * Whenever `endpoint` changes (category / duration filter), the list resets
 * and page 1 of the new endpoint is fetched, so results never mix.
 */
const usePagedList = (endpoint) => {
  // `key` remembers which endpoint the data belongs to; data for an old
  // endpoint is ignored, so switching filters shows a fresh list immediately.
  const [state, setState] = useState({ key: null, items: [], hasMore: true, error: false });
  const page = useRef(1);
  const current = useRef(endpoint);

  const fetchPage = useCallback(async (url, pageNo) => {
    const sep = url.includes("?") ? "&" : "?";
    const { data } = await axios.get(`${url}${sep}page=${pageNo}`);
    return data;
  }, []);

  useEffect(() => {
    let ignore = false;
    current.current = endpoint;
    page.current = 1;

    fetchPage(endpoint, 1)
      .then((data) => {
        if (ignore) return;
        page.current = 2;
        setState({ key: endpoint, items: data.results || [], hasMore: data.page < data.total_pages, error: false });
      })
      .catch((err) => {
        if (ignore) return;
        console.error("Failed to load", endpoint, err);
        setState({ key: endpoint, items: [], hasMore: false, error: true });
      });

    return () => {
      ignore = true;
    };
  }, [endpoint, fetchPage]);

  const loadMore = useCallback(async () => {
    const url = current.current;
    try {
      const data = await fetchPage(url, page.current);
      if (url !== current.current) return; // filter changed meanwhile
      page.current += 1;
      setState((prev) => ({
        ...prev,
        items: [...prev.items, ...(data.results || [])],
        hasMore: data.page < data.total_pages && data.results?.length > 0,
      }));
    } catch (err) {
      console.error("Failed to load more", url, err);
      setState((prev) => ({ ...prev, hasMore: false }));
    }
  }, [fetchPage]);

  const fresh = state.key === endpoint;
  return {
    items: fresh ? state.items : [],
    hasMore: fresh ? state.hasMore : true,
    error: fresh && state.error,
    loadMore,
  };
};

export default usePagedList;
