import React, { useRef, useState } from "react";

const QueryPage = () => {
  const QueryIn = useRef<HTMLTextAreaElement>(null);

  const [Data, setData] = useState([[]]);

  const executeQuery = async () => {
    let query = QueryIn.current?.value.toString().trim();

    let res = await fetch("http://127.0.0.1:3001/query", {
      method: "POST",
      body: query,
    });
    let data = await res.json();
    setData(data);
  };

  return (
    <div className='querypage page'>
      <textarea
        className='query-input'
        name='queryinput'
        ref={QueryIn}></textarea>
      <div className='query-output'>
        <table className='table'>
          <tbody>
            {Data.map(x => (
              <tr>
                {x.map(c => (
                  <td>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
