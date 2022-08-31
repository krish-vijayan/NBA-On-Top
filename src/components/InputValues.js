import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOnKeyPress } from "./onKeyPress";
import "../App.css";
import { getColorsList } from "nba-color";
import styled, { keyframes } from "styled-components";

// //Styling for Card Background and Border
const gradient = keyframes`
 0% {
   background-position: 0% 50%;
 }
 50% {
   background-position: 100% 50%;
 }
 100% {
   background-position: 0% 50%;
 }
 `;

const CardStyle = styled.div`
  background: linear-gradient(
    -90deg,
    ${(props) => props.colors1},
    ${(props) => props.colors2},
    ${(props) => props.colors3}
  );

  border-image: linear-gradient(
      ${(props) => props.colors1},
      ${(props) => props.colors2},
      ${(props) => props.colors3}
    )
    1;

  background-size: 400% 400%;
  animation: ${gradient} 3s linear infinite;
`;

//Main function
function InputValues() {
  const [player, setPlayer] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [headshot, setHeadshot] = useState("");
  const [teamAbr, setTeamAbr] = useState("");
  const [logo, setLogo] = useState("");
  const [id, setId] = useState("");
  const [season, setSeason] = useState("");
  const [games, setGames] = useState("");
  const [pts, setPts] = useState("");
  const [asts, setAsts] = useState("");
  const [rebs, setRebs] = useState("");
  const [invalid, setInvalid] = useState("");
  const [newId, setNewId] = useState("");
  const [border, setBorder] = useState("");
  const [c1, setC1] = useState("");
  const [c2, setC2] = useState("");
  const [c3, setC3] = useState("");

  var currentTime = new Date();
  var year = currentTime.getFullYear();

  const handleSearch = (val) => {
    setPlayer(val.target.value);
  };

  const getPlayerHandler = () => {
    if (!player) {
      setInvalid("Please Enter a Valid Name");
      setBorder(null);
      setC1(null);
      setC2(null);
      setC3(null);
      setHeadshot(null);
      setLogo(null);
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
              setTeamAbr(val.team.abbreviation.toLocaleLowerCase());
              setId(val.id);
              setNewId(7);
              setFirstName(val.first_name);
              setLastName(val.last_name);
              setBorder("border");
              setC1(getColorsList(val.team.abbreviation)[0]);
              setC2(getColorsList(val.team.abbreviation)[1]);
              setC3(
                getColorsList(val.team.abbreviation)[
                  getColorsList(val.team.abbreviation).length - 1
                ]
              );
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
          setPts(`Points Per Game (PPG): ${val.pts}`);
          setAsts(`Assists Per Game (APG): ${val.ast}`);
          setRebs(`Rebounds Per Game (RPG): ${val.reb}`);

          //console.log(id);
        });
      })
      .catch((e) => console.log(e));
  }, [id]);

  const getHeadshot = () => {
    axios
      .get(`https://data.nba.net/data/10s/prod/v1/${year}/players.json`)
      .then((res) => {
        //console.log(res.data.league.standard);
        res.data.league.standard.map((val, key) => {
          if (firstName === val.firstName && lastName === val.lastName) {
            //console.log(firstName + lastName);
            setNewId(val.personId);
          }
        });
      })
      .catch((e) => console.log(e));

    //Bug that for some reason sets some player's newId to 7....
    if (newId === 7) {
      setNewId("logoman");
    }
    setHeadshot(
      `https://cdn.nba.com/headshots/nba/latest/1040x760/${newId}.png`
    );

    setLogo(
      `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${teamAbr}.png`
    );
  };
  useEffect(() => {
    getHeadshot();
  }, [newId]);

  //When enter is pressed, getPlayerHandler function is called
  useOnKeyPress(getPlayerHandler, "Enter");

  return (
    <div>
      <div className="card-container">
        <div className="search">
          <input
            onChange={handleSearch}
            placeholder="Enter player name"
          ></input>
          <button
            onClick={() => {
              getPlayerHandler();
            }}
          >
            Search
          </button>
        </div>

        <h1>{invalid}</h1>
        <CardStyle
          colors1={c1}
          colors2={c2}
          colors3={c3}
          className={border}
        ></CardStyle>
        <img className="headshot" src={headshot}></img>
        <img className="logo" src={logo}></img>
        <div className="stat-container">
          {/* <h1>{team}</h1> */}
          <h1>
            {firstName} {lastName}
          </h1>
          <h2>{season}</h2>
          <h3>{games}</h3>
          <h3>{pts}</h3>
          <h3>{asts}</h3>
          <h3>{rebs}</h3>
        </div>
      </div>
    </div>
  );
}

export default InputValues;
