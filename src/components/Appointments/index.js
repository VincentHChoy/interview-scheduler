import React from "react";
import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
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
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition("SAVING",true);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition("SHOW");
      })
      .catch(() => {
        console.log("hello")
        transition("ERROR_SAVE",true)});
  };
  const onDelete = () => {
    console.log("on delete");
    transition("DELETING",true);
    props.cancelInterview(props.id).then(() => {
      transition("EMPTY");
    })
    .catch(() => transition("ERROR_DELETE",true));;
  };
  const confirm = () => {
    transition("CONFIRM");
  };

  const edit = (student, interviewer) => {
    transition("EDIT");
  };

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
          onEdit={edit}
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
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => {
            back();
          }}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"are you sure you want to delete this?"}
          onConfirm={onDelete}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"ERROR WHEN SAVING"}
          onConfirm={onDelete}
          onCancel={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"ERROR WHEN DELETING"}
          onConfirm={onDelete}
          onCancel={back}
        />
      )}
    </article>
  );
}

export default Appointment;
