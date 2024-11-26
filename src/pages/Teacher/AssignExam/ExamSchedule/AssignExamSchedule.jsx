import { Calendar } from "antd";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import ViewExamSchedule from "~/components/Teacher/AssignExam/ViewExamSchedule";
import PageLayout from "~/layouts/Teacher/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./AssignExamSchedule.module.scss";
const cx = classNames.bind(styles);

function AssignExamSchedule() {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [events, setEvents] = useState([]);
  const [showViewExamSchedule, setShowViewExamSchedule] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState(null);

  const fetchExamAttempts = async (month, year) => {
    try {
      const response = await apiClient.get("/exam-attempts/getExamAttemptWithStudyProfileByTeacher");
      const allEvents = response.data.data;
      const filteredEvents = allEvents.filter((event) => {
        const attemptDate = dayjs(event.attemptdatetime);
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

  const handlePanelChange = (date) => {
    setCurrentMonth(date.month());
    setCurrentYear(date.year());
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date.format("DD-MM-YYYY"));
    setShowViewExamSchedule(true)
    const filteredEvents = events.filter((event) => {
      const attemptDate = dayjs(event.attemptdatetime).format("DD-MM-YYYY");
      return attemptDate === date.format("DD-MM-YYYY");
    });
    setSelectedDateEvents(filteredEvents[0]);
  };

  const cellRender = (currentDate, info) => {
    if (info.type === "date") {
      const formattedDate = currentDate.format("DD-MM-YYYY");
      const dayEvents = events.filter((event) => {
        const attemptDate = dayjs(event.attemptdatetime).format("DD-MM-YYYY");
        return attemptDate === formattedDate;
      });

      return (
        <ul style={{ listStyleType: "none", padding: 0 }}>
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
      {showViewExamSchedule && <ViewExamSchedule date={selectedDate} event={selectedDateEvents} setShowViewExamSchedule={setShowViewExamSchedule} />}
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
  )
}

export default AssignExamSchedule
