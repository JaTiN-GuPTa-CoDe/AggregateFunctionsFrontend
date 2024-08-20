import React from 'react';
import DataForm from './components/DataForm';
import DataDisplay from './components/DataDisplay';

const App = () => {
  return (
    <div className="App">
      <h1 style={{textAlign:'center'}}>Data Aggregation</h1>
      <DataForm />
      <DataDisplay />
    </div>
  );
};

export default App;
