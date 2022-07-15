import React from "react";
import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import { useVisualMode } from "hooks/__tests__/useVisualMode";
import Form from "./Form";

function Appointment(props) {
  console.log("appointment", props);
  console.log(props.interview);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const findInterviewerById = (interviewers,id) =>{
    for (const interviewer of interviewers) {
      if(interviewer.id === id) {
        console.log(interviewer.name)
        return interviewer.name
      }
    }
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={findInterviewerById(props.interviewers,props.interview.interviewer)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          // onSave={[]}
          onCancel={() => {
            back();
          }}
        />
      )}

      {/* {props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {!props.interview && <Empty />} */}
    </article>
  );
}

export default Appointment;
