import React, { useState, useEffect } from "react";

interface Location {
  city: string;
  branch_count: number;
}

const LocationsPage = () => {
  const [Locations, setLocations] = useState<Location[]>([]);

  const getLocations = async () => {
    let res = await fetch("http://127.0.0.1:3001/all/stores");
    let data = await res.json();
    setLocations(data);
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div className='locationpage page'>
      <table className='loc-table'>
        <thead>
          <td>City</td>
          <td>No. of Branches</td>
        </thead>
        {Locations.map(x => (
          <tr>
            <td>{x.city}</td> <td>{x.branch_count}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default LocationsPage;
