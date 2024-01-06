import React from "react";
import { Alert } from "reactstrap";

const FlashMsg = ({ flashMsg }) => {
    return (
        <Alert isOpen={flashMsg.open} className={`alert alert-${flashMsg.type}`}>
            {flashMsg.text}
        </Alert>
    )
}

export default FlashMsg