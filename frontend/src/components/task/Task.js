import React from "react";
import styles from "./Task.module.css";
import { convertToReqDate } from "../../utility/convertDate";
import { handleBGClr, handleStatus } from "../../utility/UtilityFuncs";

const Task = ({ task, onEdit, onDelete }) => {
  if (!task) return;

  return (
    <div
      style={{ backgroundColor: handleBGClr(task.priority) }}
      className={styles.container}
    >
      <div className={styles.row}>
        <h4>#{handleStatus(task.status)}</h4>
        {task.reminder && (
          <h4 style={{ color: "cyan", marginRight: "1rem" }}>R</h4>
        )}
      </div>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <div className={styles.row}>
        <p>{convertToReqDate(new Date(task?.dueDate))}</p>
        <div className={styles.row}>
          <div className={styles.icon} onClick={() => onEdit(task._id)}>
            &#9998;
          </div>
          <div className={styles.icon} onClick={() => onDelete(task._id)}>
            &#128465;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
