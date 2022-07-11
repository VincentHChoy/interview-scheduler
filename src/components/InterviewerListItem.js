import React, { useState } from 'react'
import "components/InterviewerListItem.scss";
import classNames from 'classnames';

function InterviewerListItem(props) {
  const [interviewer, setInterviewer] = useState("");
  const interviewerListItemClassNames = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li
      className={interviewerListItemClassNames}
      onClick={() => props.setInterviewer(props.id)}
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

export default InterviewerListItem