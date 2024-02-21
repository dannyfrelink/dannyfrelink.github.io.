import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export interface CloseButtonProps {
  className: string;
  closeMenu: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ className, closeMenu }) => {
  return (
    <button onClick={closeMenu} className={className}>
      <CloseRoundedIcon fontSize="large" />
    </button>
  );
};

export default CloseButton;
