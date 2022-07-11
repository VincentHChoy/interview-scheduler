import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {

  const list = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key ={interviewer.id}
        avatar={interviewer.avatar}
        name={interviewer.name}
        setInterviewer ={()=> props.setInterviewer(interviewer.id)}
        selected ={interviewer.id === props.interviewer}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{list}</ul>
    </section>
  );
}

export default InterviewerList;
