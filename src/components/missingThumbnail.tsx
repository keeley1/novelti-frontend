import React from "react";

function MissingThumbnail() {
    return (
        <>
        <div className="bg-primary flex items-center justify-center" style={{ width: "130px", height: "200px" }} >
            <p className="text-center">Thumbnail not available</p>
        </div>
        </>
    );
};

export default MissingThumbnail;