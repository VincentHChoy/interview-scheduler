import { useEffect, useState } from "react";
import "components/Application.scss";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
} from "helpers/selectors";

function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
  });

  const spotsRemaining = (appointments) => {
    console.log("checking appointments", appointments);
    let spots = 0;
    for (const appointment of appointments) {
      if (appointment.interview === null) spots++;
    }
    console.log("spots remaining:", spots);
    return spots;
  };

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      let newState = { ...state, appointments };
      let appointmentsForDay = getAppointmentsForDay(newState, state.day);

      const newDays = [...state.days];
      newDays[0].spots = spotsRemaining(appointmentsForDay);

      setState({
        ...state,
        appointments,
        days: newDays,
      });
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      let newState = { ...state, appointments };
      let appointmentsForDay = getAppointmentsForDay(newState, state.day);
      console.log("appointments for day", appointmentsForDay);

      const newDays = [...state.days];
      newDays[0].spots = spotsRemaining(appointmentsForDay);

      setState({
        ...state,
        appointments,
        days: newDays,
      });
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;
