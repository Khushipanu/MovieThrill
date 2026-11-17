import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/**
 * Loads a details page through a redux thunk and clears it on leave.
 * Returns `failed` = true when the item could not be loaded (bad id, network error).
 */
const useDetails = (id, loadAction, removeAction) => {
  const dispatch = useDispatch();
  const [failedId, setFailedId] = useState(null);

  useEffect(() => {
    let active = true;
    dispatch(loadAction(id)).then((ok) => {
      if (active && !ok) setFailedId(id);
    });
    return () => {
      active = false;
      dispatch(removeAction());
    };
  }, [dispatch, id, loadAction, removeAction]);

  return failedId === id;
};

export default useDetails;
