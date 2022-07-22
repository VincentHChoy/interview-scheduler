import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

function InterviewerListItem(props) {
  const interviewerListItemClassNames = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={interviewerListItemClassNames}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={[props.avatar]}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

export default InterviewerListItem;
