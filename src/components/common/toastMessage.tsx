import toast from "react-hot-toast";

/**
 * Global Toast Utility for Web
 * @param type 'success' | 'error' | 'info'
 * @param text1 Primary message
 * @param text2 Optional sub-message (displayed in small text)
 */
export const showToast = (
  type: "success" | "error" | "info",
  text1: string,
  text2?: string,
) => {
  const options = {
    duration: 4000,
  };

  const message = (
    <div className="flex flex-col gap-1">
      <p className="font-bold text-sm">{text1}</p>
      {text2 && <p className="text-xs opacity-80">{text2}</p>}
    </div>
  );

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
    default:
      toast(message, options);
      break;
  }
};
