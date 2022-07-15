export function getAppointmentsForDay(state, day) {
  const targetDay = day;
  const output = [];
  let dayAppointments = [];
  for (const day of state.days) {
    if (day.name === targetDay) {
      dayAppointments = day.appointments;
    }
  }
  for (const appointment of dayAppointments) {
    output.push(state.appointments[appointment]);
  }
  return output;
}

export function getInterviewersForDay(state, day) {
  const targetDay = day;
  const output = [];
  let dayInterviewers = [];
  for (const day of state.days) {
    if (day.name === targetDay) {
      dayInterviewers = day.interviewers;
    }
  }
  for (const interviewer of dayInterviewers) {
    output.push(state.interviewers[interviewer]);
  }
  return output;
}

export function getInterview(state, appointments) {
  //(state,state.appointments[id].interview)
  if (appointments === null) return null;
  let output = appointments;
  let id = appointments.interviewer;
  output.interviewer = state.interviewers[id];
  return output;
}
