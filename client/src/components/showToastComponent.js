import { toast } from 'react-toastify';

export const showToast = (type = "success", msg, autoClose = 2000, className = "primaryColor", position = defaultPosition) => {

 
  if (type === "success") {
    
    return ( toast.success(msg, {
      autoClose: autoClose === null ? 2000 : autoClose,
      className: className === null ? "primaryColor" : className,
      position: position,
    }) );
  } else if (type === "error") {
   
    return (toast.error(msg, {
      autoClose: autoClose === null ? 2000 : autoClose,
      className: className === null ? "dangerColor" : className,
      position: position,
    }) );
  }
};



const defaultPosition = toast.POSITION.BOTTOM_CENTER;