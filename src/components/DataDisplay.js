import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DataDisplay.css';

const DataDisplay = () => {
  const [aggregatedData, setAggregatedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://aggregate-functions.vercel.app/aggregate');
        setAggregatedData(response.data);
      } catch (error) {
        alert('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Aggregated Data</h2>
      {aggregatedData ? (
        <>
          <div className="mb-4">
            <h3>Grouped Data</h3>
            <div className="row">
              {aggregatedData.groupedData.map((group) => (
                <div className="col-md-4" key={group._id}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Group Name: {group._id}</h5>
                      <h6 className="card-text">Count: {group.count}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3>Average Age</h3>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Average Age</h5>
                    <p className="card-text">{aggregatedData.averageAge}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h3>Sorted Data</h3>
            <div className="row">
              {aggregatedData.sortedData.map((data) => (
                <div className="col-md-4" key={data._id}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Name: {data.name}</h5>
                      <h6 className="card-text">Age: {data.age}</h6>
                      <h6 className="group-id">Group Name: {data.group}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DataDisplay;
