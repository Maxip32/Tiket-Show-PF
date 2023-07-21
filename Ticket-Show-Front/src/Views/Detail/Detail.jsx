import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventId } from "../../redux/actions";

const Detail = () => {
  const { id } = useParams();

  const {event} = useSelector((state) => state.detail);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventId(id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
        <h1>{event.name}</h1>
    </div>
  );
};

export default Detail;
