import React, { useCallback } from "react";
import { Card, Badge, ProgressBar, Dropdown, Image } from "react-bootstrap";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/slices/tasksSlice";

import clockIcon from "../assets/icons/centre-icons/card_clock_icon.svg";
import lableIcon from "../assets/icons/centre-icons/card_label_icon.svg";
import msgIcon from "../assets/icons/centre-icons/card_msg_icon.svg";
import clipIcon from "../assets/icons/centre-icons/card_paper_clip_icon.svg";
import ThreeDots from "../assets/icons/centre-icons/card_three_dots.svg";
import sampleImg from "../assets/images/sample_img.webp";

const LABEL_COLORS = {
    Stock: "success",
    UI: "info",
    business: "warning",
    Illustraion: "dark",
    Ads: "danger",
};

const SingleCard = ({ task, column, onEdit, onView }) => {
    const dispatch = useDispatch();

    const { attributes, listeners, setNodeRef, transform } = useSortable({
        id: task.id,
        disabled: task.isDemo,
    });

   
    const handleDelete = useCallback(() => {
        dispatch(deleteTask({ column, taskId: task.id }));
    }, [dispatch, column, task.id]);

    return (
        <Card
            ref={setNodeRef}
            className="task-card-style mb-3"
            style={{ transform: CSS.Transform.toString(transform) }}
        >
            <Card.Body onClick={() => onView(task)} style={{ cursor: "pointer" }}>
                <Card.Title className="d-flex justify-content-between">
                    <span
                        className={`task-title ${task.isDemo ? "disabled" : ""}`}
                        {...(!task.isDemo ? listeners : {})}
                        {...(!task.isDemo ? attributes : {})}
                    >
                        {task.name}
                    </span>

                    <Dropdown align="end" onClick={(e) => e.stopPropagation()}>
                        <Dropdown.Toggle variant="link" bsPrefix=" ">
                            <Image src={ThreeDots} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>

                            {!task.isDemo && (
                                <Dropdown.Item onClick={handleDelete}>
                                    Delete
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Title>

                <div className="task-meta mt-2">
                    <div className="d-flex align-items-center gap-1">
                        <Image src={clockIcon} width={14} />
                        <span className="small text-muted">
                            {task.startDate} - {task.endDate}
                        </span>
                    </div>

                    {task.label && (
                        <div className="d-flex align-items-center gap-1 mt-1">
                            <Image src={lableIcon} width={14} />
                            <Badge bg={LABEL_COLORS[task.label]}>
                                {task.label}
                            </Badge>
                        </div>
                    )}
                </div>

                <Card.Text className="mt-2">{task.description}</Card.Text>

                {task.image && (
                    <Image
                        src={task.image}
                        width={150}
                        height={100}
                        className="mt-2"
                        style={{ objectFit: "cover", borderRadius: "4px" }}
                    />
                )}

                <h6 className="d-flex justify-content-between mt-3">
                    <span>Task Progress</span>
                    <span>{task.progress || 0}%</span>
                </h6>

                <ProgressBar now={task.progress || 0} />

                <div className="mt-2 d-flex align-items-center">
                    {[...Array(2)].map((_, index) => (
                        <Image
                            key={index}
                            src={sampleImg}
                            roundedCircle
                            width={25}
                            height={25}
                        />
                    ))}

                    <div className="d-flex align-items-center gap-2 ms-auto">
                        <span className="d-flex align-items-center gap-1">
                            <Image src={msgIcon} width={16} />
                            {task.comments?.length || 0}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                            <Image src={clipIcon} width={16} />
                            {task.attachments?.length || 0}
                        </span>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};


export default React.memo(SingleCard);
