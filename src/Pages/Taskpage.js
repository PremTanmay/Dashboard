import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GoPlus } from "react-icons/go";
import { IoFilterSharp } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import { tasksByStatus as initialTasksByStatus } from "../Data/Taskdata";
import { style } from "framer-motion/client";

const TaskCard = ({ task, status, moveTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { id: task.id, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (draggedItem) => {
      if (draggedItem.id !== task.id) {
        moveTask(draggedItem.id, draggedItem.status, task.id, status);
      }
    },
  }));

  return (
    <Card
      ref={(node) => drag(drop(node))}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        borderRadius: "5px",
        background: `${task.color}`,
        marginBottom: "8px",
      }}
    >
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary" }}>
          <Box
            sx={{
              gap: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "#EAF0FD",
                fontSize: "9px",
                borderRadius: 1,
              }}
            >
              #Website
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "#EAF0FD",
                fontSize: "9px",
                borderRadius: 1,
              }}
            >
              #Client
            </Button>
            <HiOutlineDotsVertical />
          </Box>
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontSize: "15px",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            color: "#4370C3",
          }}
        >
          {task.desc}
        </Typography>

        <Typography variant="body2" sx={{ color: "#4370C3" }}>
          <div className="flex gap-20 text-xs">
            <h1>progress</h1> <h1>{task.percentage}</h1>
          </div>
          <div className="flex">
            {[...Array(12)].map((_, index) =>
              index < task.percentage / 10 ? (
                <RiCheckboxBlankCircleFill key={index} color="#4370C3" />
              ) : (
                <RiCheckboxBlankCircleLine key={index} />
              )
            )}
          </div>
          <br />
          {task.note}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

const DropArea = ({ status, tasks, moveTask }) => {
  const [, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (draggedItem) => {
      if (tasks.length === 0 || draggedItem.status !== status) {
        moveTask(draggedItem.id, draggedItem.status, null, status);
      }
    },
  }));

  return (
    <div
      ref={drop}
      className="border border-gray-200 rounded-md p-2 flex flex-col gap-2 min-h-[100px]"
    >
      {tasks.length === 0 && (
        <div className="flex justify-center items-center h-full text-gray-500 text-center py-2">
          Drop a task here
        </div>
      )}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          status={status}
          moveTask={moveTask}
        />
      ))}
    </div>
  );
};

export const Taskpage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tasksByStatus, setTasksByStatus] = useState(() => {
    const savedTasks = localStorage.getItem("tasksByStatus");
    return savedTasks ? JSON.parse(savedTasks) : initialTasksByStatus;
  });

  useEffect(() => {
    localStorage.setItem("tasksByStatus", JSON.stringify(tasksByStatus));
  }, [tasksByStatus]);

  const moveTask = (draggedId, sourceStatus, targetId, targetStatus) => {
    setTasksByStatus((prevTasks) => {
      const sourceTasks = [...prevTasks[sourceStatus]];
      const targetTasks = [...prevTasks[targetStatus]];

      const draggedTaskIndex = sourceTasks.findIndex(
        (task) => task.id === draggedId
      );

      if (draggedTaskIndex !== -1) {
        const [draggedTask] = sourceTasks.splice(draggedTaskIndex, 1);

        if (targetId === null) {
          targetTasks.unshift(draggedTask); // Add to the start of the list if the target is null (empty column)
        } else {
          const targetTaskIndex = targetTasks.findIndex(
            (task) => task.id === targetId
          );
          targetTasks.splice(targetTaskIndex, 0, draggedTask);
        }

        return {
          ...prevTasks,
          [sourceStatus]: sourceTasks,
          [targetStatus]: targetTasks,
        };
      }

      return prevTasks;
    });
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {/* Create Task Section */}
        <div className="flex justify-between p-2 border-2 rounded-lg bg-gradient-to-r from-white to-pink-50">
          {/* Left Side */}
          <div className="flex justify-between gap-6">
            <div className="border-r-2 pr-8">
              <div className="text-base font-bold">May</div>
              <div>Today is Saturday, Jul 9th, 2023</div>
            </div>
            <div className="flex justify-center items-center space-x-1">
              <div className="font-bold">Board</div>
              <div className="flex">
                <h1 className="font-medium">-</h1>Daily Tasks
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex justify-between gap-4">
            <div className="items-center">
              {/* <div><img src="images.jfif" /></div> */}
            </div>
            <div className="flex gap-2 items-center">
              <button className="flex items-center gap-1 px-2">
                <IoFilterSharp />
                <div>Filters</div>
              </button>
              {/* <button className="flex items-center gap-1 rounded-md px-2 py-0 bg-black h-[30px]">
              {/* <FiPlus color="white" /> */}
              {/* <div className="text-white">Create Task</div> */}
              {/* </button> */}

              <Button onClick={handleOpen}>
                {" "}
                <FiPlus color="white" /> create task
              </Button>
            </div>
          </div>
        </div>

        {/* Task Columns */}
        <div className="grid md:grid-cols-4 gap-4 my-4">
          {Object.keys(tasksByStatus).map((status) => (
            <div key={status}>
              <div className="flex items-center justify-between border-b border-gray-300 rounded-lg mb-2">
                <h1 className="font-bold px-4 my-3">{status}</h1>
                <div className="flex">
                  <GoPlus />
                  <HiOutlineDotsVertical />
                </div>
              </div>
              <DropArea
                status={status}
                tasks={tasksByStatus[status]}
                moveTask={moveTask}
              />
            </div>
          ))}
        </div>
      </DndProvider>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }}
>
<form action="/submit-form" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required />
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required />
  
  <label for="message">Message:</label>
  <textarea id="message" name="message" required></textarea>
  
  <button type="submit">Submit</button>
</form>


        </Box>
      </Modal>
    </>
  );
};

export default Taskpage;
