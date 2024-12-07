import { Calendar } from "antd";
import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import ViewExamSchedule from "~/components/Teacher/AssignExam/ViewExamSchedule";
import PageLayout from "~/layouts/Teacher/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./AssignExamSchedule.module.scss";

const cx = classNames.bind(styles);

function AssignExamSchedule() {
  const [currentMonth, setCurrentMonth] = useState(moment().month());
  const [currentYear, setCurrentYear] = useState(moment().year());
  const [events, setEvents] = useState([]);
  const [showViewExamSchedule, setShowViewExamSchedule] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  // Fetch events for the current month and year
  const fetchExamAttempts = async (month, year) => {
    try {
      const response = await apiClient.get("/exam-attempts/getExamAttemptWithStudyProfileByTeacher");
      const allEvents = response.data.data;

      // Filter events for the given month and year
      const filteredEvents = allEvents.filter((event) => {
        const attemptDate = moment(event.attemptdatetime);
        return attemptDate.month() === month && attemptDate.year() === year;
      });
      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching exam attempts:", error);
    }
  };

  useEffect(() => {
    fetchExamAttempts(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  // Handle changes to the calendar's panel (month/year)
  const handlePanelChange = (date) => {
    setCurrentMonth(date.month());
    setCurrentYear(date.year());
  };

  // Handle selecting a specific date
  const handleDateSelect = (date) => {
    const formattedDate = date.format("DD-MM-YYYY");
    setSelectedDate(formattedDate);
    setShowViewExamSchedule(true);

    // Filter events for the selected date
    const filteredEvents = events.filter((event) => {
      const attemptDate = moment(event.attemptdatetime).format("DD-MM-YYYY");
      return attemptDate === formattedDate;
    });
    setSelectedDateEvents(filteredEvents[0]);
  };

  // Custom cell rendering for calendar dates
  const cellRender = (currentDate, info) => {
    if (info.type === "date") {
      const formattedDate = currentDate.format("DD-MM-YYYY");

      // Filter events for the current date
      const dayEvents = events.filter((event) => {
        const attemptDate = moment(event.attemptdatetime).format("DD-MM-YYYY");
        return attemptDate === formattedDate;
      });

      // Render events as a list for the current date
      return (
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {dayEvents.map((event) => (
            <li key={event.id} style={{ color: "blue" }}>
              {event.exam.title}
            </li>
          ))}
        </ul>
      );
    }

    return info.originNode;
  };

  return (
    <>
      {showViewExamSchedule && (
        <ViewExamSchedule
          date={selectedDate}
          event={selectedDateEvents}
          setShowViewExamSchedule={setShowViewExamSchedule}
          fetchExamAttempts={fetchExamAttempts}
        />
      )}
      <PageLayout>
        <div className={cx("teacher-schedule-wrapper")}>
          <div className={cx("teacher-schedule-container")}>
            <div className={cx("teacher-schedule-header")}>
              <div className={cx("teacher-schedule-text")}>Exam Schedule</div>
            </div>
            <div className={cx("teacher-schedule-content")}>
              <Calendar
                cellRender={cellRender}
                onPanelChange={handlePanelChange}
                onSelect={handleDateSelect}
              />
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default AssignExamSchedule;
