import React from "react";
import SubNavbar from "../SubNavbar";

const ScoresNavbar = () => {
    const types = ["T Score", "Z Score"];

    return (
        <div>
            <SubNavbar section={"scores"} types={types} />
        </div>
    )
}

export default ScoresNavbar;