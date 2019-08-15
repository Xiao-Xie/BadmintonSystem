import React from 'react';

import Court from './court';
const CourtList = ({ courts }) => {
  return (
    <div className="courtList">
      {courts.map(court => {
        return <Court court={court} key={court.courtid} />;
      })}
    </div>
  );
};
export default CourtList;
