export function getAppointmentsForDay(state, day) {
  const targetDay = day;
  const output = [];
  let dayAppointments =[]
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

  export function getInterview (state,appointments) { //(state,state.appointments[id].interview)
    if (appointments === null) return null;
    let output = appointments
    let id = appointments.interviewer
    output.interviewer = state.interviewers[id]
    // console.log(output.interviewer = state.interviwers[id])
    // output[appointments] = output.interviewers[id];
    // console.log(output)
    return output
  };