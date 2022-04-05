import { Button as MuiButton } from "@mui/material";

interface ButtonProps {
  label: string;
  onClick(e:React.MouseEvent<HTMLButtonElement>):void;
}

export const Button = ({label, onClick}: ButtonProps) => {
  return (
    <MuiButton
      sx={{ m: 4, py: 1, px: 4 }}
      size="large"
      onClick={(e) => onClick(e)}
    >
      {label}
    </MuiButton>
  );
};
