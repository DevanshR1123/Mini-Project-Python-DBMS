import React, { useRef } from "react";

const QueryPage = () => {
  const QueryIn = useRef<HTMLTextAreaElement>(null);
  const QueryOut = useRef<HTMLDivElement>(null);

  const executeQuery = () => {};

  return (
    <div className='querypage page'>
      <textarea
        className='query-input'
        name='queryinput'
        ref={QueryIn}></textarea>
      <div className='query-output'></div>
      <input
        type='submit'
        value='Execute'
        className='execute-btn'
        onClick={executeQuery}
      />
    </div>
  );
};

export default QueryPage;
