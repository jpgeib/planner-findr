import React, { useState } from "react";
import { Button, Header, Modal, Icon } from "semantic-ui-react";

import "./style.css";

const DeleteReservationModal = (props) => {

    const { handleDelete, screenWidth } = props;
    const [open, setOpen] = useState(false);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Button id="reservation-delete-btn" icon>
                    {screenWidth <= 516 ? "Delete " : null}
                    <Icon name="x" />
                </Button>
            }
        >
            <Modal.Header>Delete Reservation</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header>Are you sure you want to delete this reservation?</Header>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Delete"
                    labelPosition='right'
                    icon='x'
                    onClick={handleDelete}
                    negative
                />
            </Modal.Actions>
        </Modal>
    );
};

export default DeleteReservationModal;