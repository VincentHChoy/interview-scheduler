import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  let listItemClassNames = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={listItemClassNames}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">
        {props.spots > 1 && props.spots + " spots remaining"}
        {props.spots === 1 && props.spots + " spot remaining"}
        {props.spots === 0 && "no spots remaining"}
      </h3>
    </li>
  );
}
