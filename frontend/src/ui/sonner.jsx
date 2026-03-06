import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (  
    <Sonner
      theme={theme}
      icons={{
        success: <CircleCheckIcon />,
        info: <InfoIcon  />,
        warning: <TriangleAlertIcon  />,
        error: <OctagonXIcon  />,
        loading: <Loader2Icon  />,
      }}
      {...props}
    />
  );
};

export { Toaster };
