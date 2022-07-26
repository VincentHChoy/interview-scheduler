import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";

function DayList(props) {
  const list = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });
  return <ul data-testid="day">{list}</ul>;
}

export default DayList;
