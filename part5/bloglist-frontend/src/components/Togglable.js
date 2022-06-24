import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef(({ label, children }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return isVisible ? (
    <div>
      {children} <button onClick={toggleVisibility}>Cancel</button>
    </div>
  ) : (
    <button onClick={toggleVisibility}>{label}</button>
  );
});

export default Togglable;
