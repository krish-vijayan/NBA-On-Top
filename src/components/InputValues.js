import React, { useState } from "react";
import PlayerItem from "./PlayerItem";
import axios from "axios";

function FindPlayer(props) {
  return <h1></h1>;
}

function InputValues() {
  const [player, setPlayer] = useState();
  const [team, setTeam] = useState();

  const handleSearch = (val) => {
    setPlayer(val.target.value);
  };

  const apiHandler = () => {
    if (!player) {
      setTeam("Please enter a valid name");
    } else {
      axios
        .get(`https://www.balldontlie.io/api/v1/players?search=${player}`)
        .then((res) => {
          console.log(res.data.data);
          res.data.data.map((val, key) => {
            if (
              `${val.first_name.toLocaleLowerCase()} ${val.last_name.toLocaleLowerCase()}` ==
              player.toLocaleLowerCase()
            ) {
              setTeam(val.team.full_name);
            }
            console.log(team);
          });
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <div>
      <input onChange={handleSearch} placeholder="Enter player name"></input>
      <button onClick={apiHandler}>Search</button>
      <h1>{team}</h1>
    </div>
  );
}

export default InputValues;
