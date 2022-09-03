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

const textclip = keyframes`
 to {
  background-position: 200% center;
}
 `;
//  border-image: linear-gradient(
//   ${(props) => props.colors1},
//   ${(props) => props.colors2},
//   ${(props) => props.colors3}
// )
// 1;
// background: linear-gradient(
//   -90deg,
//   ${(props) => props.colors1},
//   ${(props) => props.colors2},
//   ${(props) => props.colors3}
// );
const CardStyle = styled.div`
  border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cstyle%3Epath%7Banimation:stroke 5s infinite linear%3B%7D%40keyframes stroke%7Bto%7Bstroke-dashoffset:776%3B%7D%7D%3C/style%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' 
  stop-color=' ${(props) => props.colors1}' /%3E%3Cstop offset='25%25' 
  stop-color='${(props) => props.colors2}' /%3E%3Cstop offset='50%25' 
  stop-color='${(props) => props.colors3}' /%3E%3Cstop offset='100%25' 
  stop-color='${(props) =>
      props.colors1}' /%3E%3C/linearGradient%3E %3Cpath d='M1.5 1.5 l97 0l0 97l-97 0 l0 -97' stroke-linecap='square' stroke='url(%23g)' stroke-width='3' stroke-dasharray='388'/%3E %3C/svg%3E")
    1;
  background-size: 400% 400%;
  animation: ${gradient} 3s linear infinite;
`;

const FontStyle = styled.span`
  text-transform: uppercase;
  background-image: linear-gradient(
    -225deg,
    ${(props) => props.colors1} 0%,
    ${(props) => props.colors2} 29%,
    ${(props) => props.colors3} 67%,
    ${(props) => props.colors1} 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;

  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${textclip} 2s linear infinite;
  display: inline-block;
  text-shadow: 0px 0px 7px ${(props) => props.colors1};
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
  const [hide, setHide] = useState("");

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
              if (getColorsList(val.team.abbreviation)[1] == "cream") {
                setC1(getColorsList(val.team.abbreviation)[0]);
                setC2("white");
                setC3(
                  getColorsList(val.team.abbreviation)[
                    getColorsList(val.team.abbreviation).length - 1
                  ]
                );
              } else if (
                getColorsList(val.team.abbreviation)[0] == "red" &&
                getColorsList(val.team.abbreviation)[1] == "green" &&
                getColorsList(val.team.abbreviation)[2] == "white" &&
                getColorsList(val.team.abbreviation)[3] == "gray"
              ) {
                setC1(getColorsList(val.team.abbreviation)[0]);
                setC2("yellow");
                setC3("white");
              } else if (getColorsList(val.team.abbreviation)[0] == "wine") {
                setC1("maroon");
                setC2(getColorsList(val.team.abbreviation)[1]);
                setC3(
                  getColorsList(val.team.abbreviation)[
                    getColorsList(val.team.abbreviation).length - 1
                  ]
                );
              } else if (
                getColorsList(val.team.abbreviation)[1] == "bealeStreetBlue"
              ) {
                setC1(getColorsList(val.team.abbreviation)[0]);
                setC2("darkBlue");
                setC3(
                  getColorsList(val.team.abbreviation)[
                    getColorsList(val.team.abbreviation).length - 1
                  ]
                );
              } else {
                setC1(getColorsList(val.team.abbreviation)[0]);
                setC2(getColorsList(val.team.abbreviation)[1]);
                setC3(
                  getColorsList(val.team.abbreviation)[
                    getColorsList(val.team.abbreviation).length - 1
                  ]
                );
              }
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

        if (res.data.data.length == 0) {
          setInvalid(null);
          setHide("hide");
          setSeason(`RETIRED!`);
          setGames(`Number of Games Played:  / 82  `);
          setPts(`Points Per Game (PPG): `);
          setAsts(`Assists Per Game (APG): `);
          setRebs(`Rebounds Per Game (RPG): `);
        } else {
          setHide(null);
          res.data.data.map((val, key) => {
            setInvalid(null);
            setSeason(`Season: ${val.season}-${val.season + 1}`);
            setGames(`Number of Games Played: ${val.games_played} / 82  `);
            setPts(`Points Per Game (PPG): ${val.pts}`);
            setAsts(`Assists Per Game (APG): ${val.ast}`);
            setRebs(`Rebounds Per Game (RPG): ${val.reb}`);

            //console.log(id);
          });
        }
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
    // console.log(c1, c2, c3);
    getHeadshot();
  }, [newId]);

  //When enter is pressed, getPlayerHandler function is called
  useOnKeyPress(getPlayerHandler, "Enter");

  return (
    <div>
      <div className="card-container">
        <div className="search">
          <input
            className="textbox"
            onChange={handleSearch}
            placeholder="Enter player name"
          ></input>
          {/* <button
            className="button"
            onClick={() => {
              getPlayerHandler();
            }}
          >
            Search{" "}
          </button> */}
        </div>

        <h1>{invalid}</h1>

        <div className="stat-container">
          <CardStyle
            colors1={c1}
            colors2={c2}
            colors3={c3}
            className={border}
          ></CardStyle>
          <img className="headshot" src={headshot}></img>
          <img className="logo" src={logo}></img>

          {/* <h1>{team}</h1> */}

          <div>
            <FontStyle colors1={c1} colors2={c2} colors3={c3} className="name">
              {firstName} {lastName}
            </FontStyle>
            <div className={hide}>
              <h2 className="stats">{season}</h2>
              <h3 className="stats">{games}</h3>
              <h3 className="stats">{pts}</h3>
              <h3 className="stats">{asts}</h3>
              <h3 className="stats">{rebs}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputValues;
