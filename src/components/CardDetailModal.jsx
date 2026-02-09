import React from 'react';
import { Modal, Image } from 'react-bootstrap';

const CardDetailModal = ({ show, onHide, task }) => {
  let content;
  try {
    content = task && (
      <>
        <h5>{task.name}</h5>
        <p><strong>Start:</strong> {task.startDate}</p>
        <p><strong>End:</strong> {task.endDate}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Comments:</strong> {task.comments}</p>
        {task.image && <Image src={task.image} className='cover-image' />}
      </>
    );
  } catch (error) {
    console.error("Error rendering task details:", error);
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(CardDetailModal);
