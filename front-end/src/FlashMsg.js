import React from "react";
import { Alert } from "reactstrap";

const FlashMsg = ({ msgType, msgText }) => {
    return (
        <Alert className={`alert alert-${msgType} col-10 mx-auto`}>
            {msgText}
        </Alert>
    )
}

export default FlashMsg