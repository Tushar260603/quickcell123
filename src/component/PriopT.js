import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import TaskCard from "./Card";

import img4 from "../images/4.svg";
import img3 from "../images/3.svg";
import img2 from "../images/2.svg";
import img1 from "../images/1.svg";
import img0 from "../images/No-priority.svg";

import menu from "../images/menu.svg";
import Add from "../images/add.svg";

const API_URL =
  "https://api.quicksell.co/v1/internal/frontend-assignment";

const PRIORITY_CONFIG = {
  0: {
    label: "No Priority",
    image: img0,
  },
  1: {
    label: "Low",
    image: img1,
  },
  2: {
    label: "Medium",
    image: img2,
  },
  3: {
    label: "High",
    image: img3,
  },
  4: {
    label: "Urgent",
    image: img4,
  },
};

const PRIORITIES = [0, 1, 2, 3, 4];

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f5f9;
  padding: 20px;
`;

const Board = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  flex-wrap: wrap;
`;

const Column = styled.div`
  border-radius: 8px;
  padding: 10px;
  width: 250px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  h2 {
    font-size: 16px;
    margin: 0 0 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .count {
    background-color: #e0e0e0;
    border-radius: 50%;
    padding: 5px 10px;
    font-size: 12px;
  }
`;

const PriorityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 6px;
  margin-right: 5px;
`;

const PriorT = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `API request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        console.log("AI Review - Fetched Data:", data);

        if (!Array.isArray(data.tickets)) {
          throw new Error(
            "Invalid API response: tickets must be an array"
          );
        }

        setTasks(data.tickets);

        console.log(
          "AI Review - Total Tasks:",
          data.tickets.length
        );
      } catch (err) {
        console.error("AI Review - Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const groupedTasksByPriority = useMemo(() => {
    const priorityGroups = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
    };

    tasks.forEach((task) => {
      const priority = task.priority;

      if (priorityGroups[priority]) {
        priorityGroups[priority].push(task);
      }
    });

    Object.keys(priorityGroups).forEach((priority) => {
      priorityGroups[priority].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    });

    console.log(
      "AI Review - Grouped Tasks:",
      priorityGroups
    );

    return priorityGroups;
  }, [tasks]);

  const renderPriorityHeader = (priority) => {
    const config = PRIORITY_CONFIG[priority];

    return (
      <PriorityHeader>
        <img
          src={config.image}
          alt={config.label}
          width="16"
          height="16"
        />
        <span>{config.label}</span>
      </PriorityHeader>
    );
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error loading tasks: {error}</div>;
  }

  return (
    <Wrapper>
      <Board>
        {PRIORITIES.map((priority) => {
          const priorityTasks =
            groupedTasksByPriority[priority];

          return (
            <Column key={priority}>
              <h2>
                {renderPriorityHeader(priority)}

                <span className="count">
                  {priorityTasks.length}
                </span>

                <HeaderActions>
                  <img src={Add} alt="Add task" />
                  <img src={menu} alt="More options" />
                </HeaderActions>
              </h2>

              {priorityTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                />
              ))}
            </Column>
          );
        })}
      </Board>
    </Wrapper>
  );
};

export default PriorT;
