import React from "react";
import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import { useVisualMode } from "hooks/__tests__/useVisualMode";
import Form from "./Form";

function Appointment(props) {
  // console.log("appointment", props);
  // console.log(props.interview);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition("SAVING");
    props.bookInterview(props.id, interview)
    .then(() => {
      transition("SHOW");
    });
  }

  function onDelete() {
    console.log('on delete')
    transition("DELETING");
    props.cancelInterview(props.id)
    .then(() => {
      transition("EMPTY");
    });
  }
  function confirm(){
    transition("CONFIRM");
  }

  const findInterviewerById = (interviewers, id) => {
    for (const interviewer of interviewers) {
      if (interviewer.id === id) {
        return interviewer.name;
      }
    }
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
        <Show
          appointmentId={props.id}
          student={props.interview.student}
          interviewer={findInterviewerById(
            props.interviewers,
            props.interview.interviewer
          )}
          onDelete={confirm}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => {
            back();
          }}
        />
      )}

      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message ={"are you sure you want to delete this?"}
          onConfirm = {onDelete}
          onCancel = {back}
        />
      )}
    </article>
  );
}

export default Appointment;
