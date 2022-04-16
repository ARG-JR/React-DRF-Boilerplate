import React from "react";

interface IFullscreenCenteredLayout {
  children?: React.ReactElement;
}

const FullscreenCenteredLayout: React.FC<IFullscreenCenteredLayout> = ({ children }) => {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      {children}
    </div>
  );
};

export default FullscreenCenteredLayout;
