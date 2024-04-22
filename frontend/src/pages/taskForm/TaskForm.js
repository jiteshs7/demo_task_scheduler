import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PRIORITY, STATUS } from "../../shared/Constants";
import { AuthContext } from "../../context/AuthContext";

import apiClient from "../../api/Api";

import "../../App.css";
import styles from "./TaskForm.module.css";
import { convertToReqDate } from "../../utility/convertDate";

const TaskForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState(PRIORITY.LOW.val);
  const [status, setStatus] = useState(STATUS.NOT_STARTED.val);
  const [dueDate, setDueDate] = useState(convertToReqDate());
  const [reminder, setReminder] = useState(false);

  const { user, tasks, setTasks } = useContext(AuthContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    checkUser();
  }, [user]);

  const checkUser = () => {
    if (!user) {
      navigate("/login");
    } else {
      fetchTask();
    }
  };

  const fetchTask = () => {
    if (!id) return;
    apiClient
      .get(`/task/${id}`)
      .then((resp) => {
        const task = resp.data.data;
        setTitle(task.title);
        setDesc(task.description);
        setDueDate(convertToReqDate(task.date));
        setPriority(task.priority);
        setStatus(task.status);
        setReminder(task.reminder);
        setIsEdit(true);
      })
      .catch((err) => console.log("ERROR", err));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleReminderChange = () => {
    setReminder((prev) => !prev);
  };

  const editTask = () => {
    apiClient
      .put(`/task/updateTask/${id}`, {
        title,
        description: desc,
        dueDate,
        priority,
        status,
        reminder,
      })
      .then((resp) => {
        const task = resp.data.data;
        const newTask = [...tasks];
        const idx = newTask.findIndex((tsk) => tsk._id === task._id);

        if (idx > -1) {
          newTask[idx] = task;
          setTasks(newTask);
        }
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("EDIT ERROR", err);
      });
  };

  const createTask = () => {
    apiClient
      .post(`/task/createTask`, {
        title,
        description: desc,
        dueDate,
        status: STATUS.NOT_STARTED.val,
        priority,
        reminder,
      })
      .then((resp) => {
        const task = resp.data.data;
        const newTasks = [task, ...tasks];
        setTasks(newTasks);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("ERROR ADD", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) editTask();
    else createTask();
  };
  return (
    <div className={styles.container}>
      <div
        style={{ marginLeft: "-0.5rem", marginBottom: "1rem" }}
        className={styles.row}
      >
        <p
          style={{ fontSize: 30, margin: "0 1rem 0 0" }}
          onClick={handleGoBack}
        >
          &#8592;
        </p>
        <h1 className={styles.header}>{`${
          isEdit ? "Update" : "Create"
        } Task`}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="title">Title</label>
          <input
            required
            aria-required
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="desc">Description</label>
          <input
            required
            aria-required
            type="text"
            id="desc"
            value={desc}
            onChange={handleDescChange}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="dueDate">Last Date</label>
          <input
            required
            aria-required
            type="date"
            id="dueDate"
            min={convertToReqDate()}
            value={dueDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="inputContainer">
          <label>Priority</label>
          <select value={priority} onChange={handlePriorityChange}>
            <option value={PRIORITY.HIGH.val}>{PRIORITY.HIGH.label}</option>
            <option value={PRIORITY.MEDIUM.val}>{PRIORITY.MEDIUM.label}</option>
            <option value={PRIORITY.LOW.val}>{PRIORITY.LOW.label}</option>
          </select>
        </div>
        {isEdit && (
          <div className="inputContainer">
            <label>Status</label>
            <select value={status} onChange={handleStatusChange}>
              <option value={STATUS.NOT_STARTED.val}>
                {STATUS.NOT_STARTED.label}
              </option>
              <option value={STATUS.IN_PROGRESS.val}>
                {STATUS.IN_PROGRESS.label}
              </option>
              <option value={STATUS.COMPLETED.val}>
                {STATUS.COMPLETED.label}
              </option>
            </select>
          </div>
        )}

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="reminder"
            value={reminder}
            onChange={handleReminderChange}
          />
          <label htmlFor="reminder">Reminder</label>
        </div>

        <button className="formButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
