import React, { useRef } from "react";

const QueryPage = () => {
  const QueryIn = useRef(0);
  const QueryOut = useRef(0);

  return (
    <div className='querypage page'>
      <textarea
        className='query-input'
        name='queryinput'
        ref={QueryIn}></textarea>
      <div className='query-output'></div>
    </div>
  );
};

export default QueryPage;
