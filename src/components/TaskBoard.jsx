import React, { useState, useMemo, useCallback } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button, Col, Container, Row, Modal, Form, Dropdown, Image, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import SingleCard from "./SingleCard";
import CardDetailModal from "./CardDetailModal";
import { addTask, editTask, moveTask } from "../store/slices/tasksSlice";
import { AddIcon } from '../helpers/AddIcon';

import redCircle from "../assets/icons/centre-icons/red_circle_new_task_icon.svg";
import greenCircle from "../assets/icons/centre-icons/green_circle_in_progres_icon.svg";
import blueCircle from "../assets/icons/centre-icons/blue_done_icon.svg";
import searchIcon from "../assets/icons/centre-icons/top_search_icon.svg";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const EmptyColumn = React.memo(({ id }) => {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef} id={id}></div>;
});

const TaskBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskData, setNewTaskData] = useState({});
  const [viewingTask, setViewingTask] = useState(null);

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.columns);

  const columns = useMemo(() => [
    { key: "newTask", title: "New Task", color: redCircle },
    { key: "inProgress", title: "In Progress", color: greenCircle },
    { key: "doneTask", title: "Done Task", color: blueCircle },
  ], []);

  const LABELS = useMemo(() => [
    { value: "Stock", color: "success" },
    { value: "UI", color: "info" },
    { value: "business", color: "warning" },
    { value: "Illustraion", color: "dark" },
    { value: "Ads", color: "danger" },
  ], []);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = useCallback((event) => {
    try {
      const { active, over } = event;
      if (!over) return;

      const activeId = String(active.id);
      const overId = String(over.id);

      const fromColumn = Object.keys(tasks).find((col) =>
        tasks[col].some((task) => String(task.id) === activeId)
      );
      if (!fromColumn) return;

      let toColumn = null;
      if (overId.startsWith("empty-")) toColumn = overId.replace("empty-", "");
      else toColumn = Object.keys(tasks).find((col) =>
        tasks[col].some((task) => String(task.id) === overId)
      );
      if (!toColumn) return;

      dispatch(moveTask({
        fromColumn,
        toColumn,
        activeId: Number(activeId),
        overId: overId.startsWith("empty-") ? null : Number(overId),
      }));
    } catch (error) {
      console.log(error);
    }
  }, [tasks, dispatch]);

  const handleOpenModal = useCallback((column, task = null) => {
    try {
      if (task) {
        setNewTaskData({ ...task, column });
        setEditingTask(task);
      } else {
        setNewTaskData({ column });
        setEditingTask(null);
      }
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    try {
      setShowModal(false);
      setEditingTask(null);
      setNewTaskData({});
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = useCallback((e) => {
    try {
      const { name, value, files } = e.target;
      if (name === "image") {
        const file = files[0];
        if (!file) return;
        toBase64(file)
          .then((base64) => setNewTaskData((prev) => ({ ...prev, image: base64 })))
          .catch(console.log);
      } else {
        setNewTaskData((prev) => ({ ...prev, [name]: value }));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = useCallback((e) => {
    try {
      e.preventDefault();
      const taskPayload = { ...newTaskData, id: Date.now(), progress: 0, image: newTaskData.image || null };
      if (editingTask) {
        dispatch(editTask({ column: newTaskData.column, taskId: editingTask.id, updates: taskPayload }));
      } else {
        dispatch(addTask({ column: newTaskData.column, task: taskPayload }));
      }
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  }, [newTaskData, editingTask, dispatch, handleCloseModal]);

  const handleViewTask = useCallback((task) => {
    try {
      setViewingTask(task);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Container className="d-flex align-items-center justify-content-between gap-2 mt-5">
        <InputGroup className="task-search">
          <Form.Control type="text" placeholder="Search..." />
          <InputGroup.Text>
            <Image src={searchIcon} width={16} />
          </InputGroup.Text>
        </InputGroup>

        <Dropdown>
          <Dropdown.Toggle variant="link" className="fw-semibold board-toggle p-1">
            Jump to : <span>Choose Board</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>News Task</Dropdown.Item>
            <Dropdown.Item>In Progress</Dropdown.Item>
            <Dropdown.Item>Done Task</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="primary" bsPrefix=" ">
            Create <AddIcon color="#fafcfc" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {columns.map((col) => (
              <Dropdown.Item key={col.key} onClick={() => handleOpenModal(col.key)}>
                {col.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Container>

      <h3 className="m-3 p-2">Task Manager</h3>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <Container className="task-board">
          <Row>
            {columns.map((col) => (
              <Col key={col.key}>
                <Container className="task-column-header" fluid>
                  <h6 className="d-flex align-items-center gap-2 ">
                    <Image src={col.color} /> {col.title}
                  </h6>
                  <h6 className="add-new-title" onClick={() => handleOpenModal(col.key)}>
                    <span>Add New</span> <AddIcon color="#1DA3AF" />
                  </h6>
                </Container>

                <SortableContext items={tasks[col.key].map((t) => t.id)} strategy={verticalListSortingStrategy}>
                  {tasks[col.key].length === 0 ? (
                    <EmptyColumn id={`empty-${col.key}`} />
                  ) : (
                    tasks[col.key].map((task) => (
                      <SingleCard
                        key={task.id}
                        task={task}
                        column={col.key}
                        onEdit={() => handleOpenModal(col.key, task)}
                        onView={() => handleViewTask(task)}
                      />
                    ))
                  )}
                </SortableContext>
              </Col>
            ))}
          </Row>
        </Container>
      </DndContext>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTask ? "Edit Task" : "Add New Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
           
          </Form>
        </Modal.Body>
      </Modal>

      <CardDetailModal show={!!viewingTask} onHide={() => setViewingTask(null)} task={viewingTask} />
    </>
  );
};

export default TaskBoard;
