import React, { useRef } from "react";

const QueryPage = () => {
  const QueryIn = useRef<HTMLTextAreaElement>(null);
  const QueryOut = useRef<HTMLDivElement>(null);

  const executeQuery = async () => {
    let query = QueryIn.current?.value.toString().trim();

    let res = await fetch("http://127.0.0.1:3001/query", {
      method: "POST",
      body: query,
    });
    let data = await res.json();
    //@ts-ignore
    QueryOut.current.innerHTML = data;
  };

  return (
    <div className='querypage page'>
      <textarea
        className='query-input'
        name='queryinput'
        ref={QueryIn}></textarea>
      <div className='query-output' ref={QueryOut}></div>
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
