import React, { Component } from "react";
const axios = require("axios");

class NbaApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
    };
  }

  async componentDidMount() {
    const url = "https://www.balldontlie.io/api/v1/players?";
    let result = null;
    try {
      result = await axios(url, {
        headers: {
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
    this.setState({ players: result.data.data });
  }

  render() {
    const { players } = this.state;
    console.log({ players });
    let mappedArray = players.map((player) => {
      return (
        <li>
          {player.first_name} {player.last_name}
        </li>
      );
    });
    return (
      <>
        <ul>{mappedArray}</ul>
      </>
    );
  }
}

export default NbaApi;
