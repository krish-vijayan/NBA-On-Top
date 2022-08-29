import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOnKeyPress } from "./onKeyPress";
import "../App.css";

function InputValues() {
  const [player, setPlayer] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pic, setPic] = useState("");
  const [id, setId] = useState("");
  const [season, setSeason] = useState("");
  const [team, setTeam] = useState("");
  const [games, setGames] = useState("");
  const [pts, setPts] = useState("");
  const [asts, setAsts] = useState("");
  const [rebs, setRebs] = useState("");
  const [invalid, setInvalid] = useState("");
  const [newId, setNewId] = useState("");

  var currentTime = new Date();
  var year = currentTime.getFullYear();

  const handleSearch = (val) => {
    setPlayer(val.target.value);
  };

  const getPlayerHandler = () => {
    if (!player) {
      setTeam("Please enter a valid name");
      setPic(null);
      setFirstName(null);
      setLastName(null);
      setSeason(null);
      setGames(null);
      setPts(null);
      setAsts(null);
      setRebs(null);
    } else {
      //API call for player description
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
              setId(val.id);
              setNewId(7);
              setFirstName(val.first_name);
              setLastName(val.last_name);
            }
          });
        })
        .catch((e) => console.log(e));
    }
  };

  //API call for player headshot (is only called when player newId updates!)
  useEffect(() => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
      )
      .then((res) => {
        console.log(res.data.data);

        res.data.data.map((val, key) => {
          setInvalid(null);
          setSeason(`Season: ${val.season}-${val.season + 1}`);
          setGames(`Number of Games Played: ${val.games_played} / 82  `);
          setPts(`Points Per Game: ${val.pts}`);
          setAsts(`Assists Per Game: ${val.ast}`);
          setRebs(`Rebounds Per Game: ${val.reb}`);
        });
      })
      .catch((e) => console.log(e));
  }, [id]);

  const getHeadshot = () => {
    axios
      .get(`https://data.nba.net/data/10s/prod/v1/${year}/players.json`)
      .then((res) => {
        console.log(res.data.league.standard);
        res.data.league.standard.map((val, key) => {
          if (firstName === val.firstName && lastName === val.lastName) {
            setNewId(val.personId);
          }
        });
      })
      .catch((e) => console.log(e));

    setPic(`https://cdn.nba.com/headshots/nba/latest/1040x760/${newId}.png`);
  };
  useEffect(() => {
    getHeadshot();
  }, [newId]);
  useOnKeyPress(getPlayerHandler, "Enter");

  return (
    <div>
      <input onChange={handleSearch} placeholder="Enter player name"></input>
      <button onClick={getPlayerHandler}>Search</button>
      <h1>{invalid}</h1>
      <h1>
        {firstName} {lastName}
      </h1>
      <div></div>
      <img className="headshot" src={pic}></img>
      <h1>{team}</h1>
      <h2>{season}</h2>
      <h3>{games}</h3>
      <h3>{pts}</h3>
      <h3>{asts}</h3>
      <h3>{rebs}</h3>
    </div>
  );
}

export default InputValues;
