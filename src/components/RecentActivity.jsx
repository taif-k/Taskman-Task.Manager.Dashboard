import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "react-bootstrap/Image";
import clockIcon from "../assets/icons/centre-icons/card_clock_icon.svg";
import avatarImg from "../assets/images/avatar_img.webp";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ActivityRow = React.memo(({ act, COLUMN_LABELS }) => {
  const getActionText = useCallback(
    (act) => {
      try {
        switch (act.type) {
          case "add":
            return (
              <>
                added card{" "}
                <span style={{ textDecoration: "underline" }}>{act.taskName}</span> to board{" "}
                <span className="fw-semibold text-dark">{COLUMN_LABELS[act.column]}</span>
              </>
            );
          case "edit":
            return (
              <>
                edited card{" "}
                <span style={{ textDecoration: "underline" }}>{act.taskName}</span> in{" "}
                <span className="fw-semibold text-dark">{COLUMN_LABELS[act.column]}</span>
              </>
            );
          case "delete":
            return (
              <>
                deleted card{" "}
                <span style={{ textDecoration: "underline" }}>{act.taskName}</span> from{" "}
                <span className="fw-semibold text-dark">{COLUMN_LABELS[act.column]}</span>
              </>
            );
          case "move":
            return (
              <>
                moved card{" "}
                <span style={{ textDecoration: "underline" }}>{act.taskName}</span> from{" "}
                <span className="fw-semibold text-dark">{COLUMN_LABELS[act.fromColumn]}</span> to{" "}
                <span className="fw-semibold text-dark">{COLUMN_LABELS[act.toColumn]}</span>
              </>
            );
          default:
            return null;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    [COLUMN_LABELS]
  );

  let content;
  try {
    content = (
      <Row className="align-items-start mt-3">
        <Col xs="auto">
          <Image src={avatarImg} roundedCircle width={30} height={30} />
        </Col>
        <Col>
          <div>
            <strong>{act.user?.name}</strong> {getActionText(act)}
          </div>

          {act.image && <Image src={act.image} width={150} height={100} className="img-card" />}

          <div className="d-flex align-items-center gap-2 mt-1">
            <Image src={clockIcon} width={14} height={14} />
            <span className="small text-muted">
              {new Date(act.timestamp).toLocaleString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </Col>
      </Row>
    );
  } catch (error) {
    console.log(error);
    content = null;
  }

  return content;
});

const RecentActivity = () => {
  const recentActivity = useSelector((state) => state.tasks.recentActivity);
  const [currentUser, setCurrentUser] = useState(null);

  const COLUMN_LABELS = useMemo(
    () => ({
      newTask: "New Task",
      inProgress: "In Progress",
      doneTask: "Done Task",
    }),
    []
  );

  useEffect(() => {
    try {
      const user =
        JSON.parse(localStorage.getItem("currentUser")) ||
        JSON.parse(sessionStorage.getItem("currentUser"));
      setCurrentUser(user);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {recentActivity.map((act, index) => {
        try {
          return <ActivityRow key={index} act={act} COLUMN_LABELS={COLUMN_LABELS} />;
        } catch (error) {
          console.log(error);
          return null;
        }
      })}
    </>
  );
};

export default React.memo(RecentActivity);
