import React from 'react';
import { now } from 'moment';

const Court = ({ court }) => {
  return (
    <div className="courtContainer">
      <div className="playingCourt">
        {court.playing.map((player, i) => {
          return (
            <div className="player" key={i}>
              {player}
            </div>
          );
        })}
      </div>
      <div className="getReady">
        <div className="nextGame">Next game starts in {court.game_start}</div>
        <div className="getReadyTitle">Get Ready</div>
        {court.getReady.map((player, i) => {
          return <div key={i}>{player}</div>;
        })}
      </div>
    </div>
  );
};
export default Court;
