import CreateRoomButton from "./CreateRoomButton";
import JoinRoom from "./JoinRoom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";

export default function MainPage() {
  // const socket = null;
  //const roomNum = null;
  //const setRoomNum = () => null;
  const socket = useSocket();
  const navigate = useNavigate();
  const [roomNum, setRoomNum] = useState(0);

  // Setup room listener when Main Page is mounted
  useEffect(() => {
    socket.addRoomListener(setRoomNum, navigate);
  }, [socket, navigate]);

  return (
    <div className="page mainPage">
      <h3>Welcome to Reedies' Mahjong!</h3>
      <hr></hr>
      <CreateRoomButton socket={socket} />
      <br />
      <JoinRoom socket={socket} roomNum={roomNum} setRoomNum={setRoomNum} />
      <p>
        <b>The Essential Rules of Mahjong</b>
      </p>
      <p>
        Mahjong is a 4-player game. Each player is given 13 tiles at the
        beginning of the game. Each of these tiles is either a member of a suit,
        of which there are 3 ("bamboo", "circle", "character"), and has a number
        from 1-9. During a Mahjong game, there are 4 sets of each suit. In this
        simplified version of MahJong, there are no "dragon" or "wind" tiles.
      </p>
      <p>
        On a player's turn, that player draws a tile, checks to see if they win,
        and discards a tile. A winning hand consists of four sets of three and a
        pair of matching tiles. The sets of three can be identical or adjacent
        tiles in the same suit (for example the 3, 4, 5 tiles in the bamboo
        suit).
      </p>
      <p>
        A player may also complete sets by taking the third tile they need from
        another player's discard pile right after they discard it. These sets
        that have been completed using other players' discarded tiles are "open"
        and can be seen by the other players, unlike the other tiles in each
        player's hand.
      </p>
      <p>
        There are two ways to take another player's discarded tiles. The first
        is "Peng". A player may pong if ANY player discarded a tile that would
        complete a matching set of three. The other is "Chi". A player may chow
        if the PREVIOUS player discarded a tile that would complete a run of
        three adjacent tiles in one of the suits. If the player decideds to
        perform either action and take the discarded tile, then the usual turn
        order is disrupted and it becomes the turn of the player who took the
        tile. They must discard back down to 13 tiles and play continues from
        them.
      </p>
    </div>
  );
}
