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