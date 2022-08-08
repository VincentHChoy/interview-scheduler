import { useEffect, useState } from "react";
import "components/Application.scss";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
  });

  const spotsRemaining = (appointments) => {
    let spots = 0;
    for (const appointment of appointments) {
      if (appointment.interview === null) spots++;
    }
    return spots;
  };

  const getDayIndex = (stateDay) => {
    let dayIndex;
    switch (stateDay) {
      case "Monday":
        dayIndex = 0;
        break;

      case "Tuesday":
        dayIndex = 1;
        break;

      case "Wednesday":
        dayIndex = 2;
        break;

      case "Thursday":
        dayIndex = 3;
        break;

      case "Friday":
        dayIndex = 5;
        break;

      default:
        break;
    }
    return dayIndex;
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
      const dayIndex = getDayIndex(state.day);
      newDays[dayIndex].spots = spotsRemaining(appointmentsForDay);

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

      const newDays = [...state.days];
      const dayIndex = getDayIndex(state.day);
      newDays[dayIndex].spots = spotsRemaining(appointmentsForDay);

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
