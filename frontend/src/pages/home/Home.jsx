import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/Api";
import styles from "./Home.module.css";
import Task from "../../components/task/Task";
import { AuthContext } from "../../context/AuthContext";
import { removeUserData } from "../../utility/storage";
const Home = () => {
  const { user, tasks, setTasks } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, [user]);

  useEffect(() => {
    if (!tasks.length) return;
    alertUser(tasks);
  }, [tasks.length]);

  const alertUser = () => {
    let count = 0;

    tasks.forEach((task) => {
      if (task.reminder) count++;
    });

    if (count > 0) {
      alert(`Reminder for ${count} tasks, please check the list.`);
    }
  };

  const checkUser = () => {
    if (!user) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  };
  const fetchTasks = () => {
    apiClient
      .get(`/task/getAllTasks`)
      .then((resp) => {
        setTasks(resp.data.data);
      })
      .catch((err) => console.log("ERRROR", err));
  };

  const handleLogout = () => {
    removeUserData();
    navigate("/login");
  };

  const handleTaskAdd = () => {
    navigate(`/task`);
  };

  const handleTaskEdit = (id) => {
    navigate(`/task/${id}`);
  };

  const handleTaskDelete = (id) => {
    apiClient
      .delete(`/task/deleteTask/${id}`)
      .then((resp) => {
        let newTasks = [...tasks];
        newTasks = newTasks.filter((task) => task._id !== id);
        setTasks(newTasks);
      })
      .catch((err) => console.log("DELETION", err));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Task Scheduler</h1>
      <div className={styles.subHeader}>
        <h3>
          Welcome,
          <span style={{ color: "rgb(201, 148, 49)" }}> {user?.name}</span>
        </h3>
        <h3
          className={styles.button}
          style={{ backgroundColor: "rgb(201, 148, 49)" }}
          onClick={handleLogout}
        >
          Logout
        </h3>
      </div>
      <div className={styles.subHeader}>
        <h3>Task List</h3>

        <h3 className={styles.button} onClick={handleTaskAdd}>
          + Add Task
        </h3>
      </div>

      <div style={{ width: "100%", padding: "0 5rem" }}>
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onEdit={handleTaskEdit}
            onDelete={handleTaskDelete}
          />
        ))}
        {tasks.length === 0 && <h2>No Tasks Found</h2>}
      </div>
    </div>
  );
};

export default Home;
