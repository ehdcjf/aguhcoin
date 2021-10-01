import { useState } from "react";

const useComplete = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const onComplete = (data) => {
    setValue(data);
  };

  return {
    value,
    onComplete,
  };
};

export default useComplete;
