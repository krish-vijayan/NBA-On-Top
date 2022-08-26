import React, { useState } from "react";
import axios from "axios";

export default function PlayerItem(props) {
  const [team, setTeam] = useState("");
  axios
    .get(
      `https://www.balldontlie.io/api/v1/players?search=${props.lastOrFirstName}`
    )
    .then((res) => {
      console.log(res.data.data);
      res.data.data.map((val, key) => {
        if (
          val.first_name == props.lastOrFirstName ||
          val.last_name == props.lastOrFirstName
        ) {
          setTeam(val.team.full_name);
        }
        console.log(team);
      });
    })
    .catch((e) => console.log(e));

  return team;
}
