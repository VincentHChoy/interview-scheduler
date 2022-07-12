import React from "react";
import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

function Appointment(props) {
  props.interview &&
    console.log("this is the student name", props.interview.student);

  return (
    <article className="appointment">
      <Header time={props.time} />

      {props.interview && (
        <Show student={props.interview.student} interviewer={props.interview.interviewer.name} />
      )}
      {!props.interview && <Empty />}
    </article>
  );
}

export default Appointment;
