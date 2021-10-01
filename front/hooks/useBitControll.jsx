import { useState } from "react";

const useBitControll = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const onBitChange = (data) => {
    if(value&(1<<data)){
      setValue(value ^(1<<data));
    }else{
      setValue(value | (1 << data));
    }
  };

  const onInit=(data)=>{
    setValue(data);
  }

  return {
    value,
    onBitChange,
    onInit,
  };
};

export default useBitControll;
