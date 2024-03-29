import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setInterviewer(null);
    setStudent("");
    props.onCancel();
  };

  const validate = () => {
    if (!student) {
      return setError("Student name cannot be blank");
    }

    if (!interviewer) {
      return setError("Please select an interviewer");
    }
    setError("");
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => {
              setStudent(event.target.value);
            }}
            data-testid="student-name-input"
            /*
          This must be a controlled component
          your code goes here
        */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button
            danger
            onClick={() => {
              reset();
            }}
          >
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
