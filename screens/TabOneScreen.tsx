import React, { useState, useEffect, useMemo, useRef } from "react";
import { Button, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

import { styles } from "../styles/tabs";

const BASE_URI = "http://192.168.86.229";

const fetchOptions: any = {
  mode: "no-cors",
};

export default function TabOneScreen() {
  const [pressed, setPressed] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState("bedroom");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [roomVolumes, setRoomVolumes] = useState(null);
  const [roomsMuted, setRoomsMuted] = useState(null);
  const [volume, setVolume] = useState(0);

  const volRef = useRef();

  const handleButtonPress = () => {
    setCount((c) => c + 1);
  };

  const toggleRoom = async () => {
    await toggleMusic();
  };

  useEffect(() => {
    const getAllStatuses = async () => {
      await fetch(`${BASE_URI}/api/sonos/status-all`, fetchOptions)
        .then((res) => res.json())
        .then((json) => {
          const roomsObj: any = {};
          const soundObj: any = {};
          const mutedObj: any = {};

          json.statuses.forEach(({ room, state, volume, muted }) => {
            roomsObj[room] = state !== "paused" && state !== "stopped";
            soundObj[room] = volume;
            mutedObj[room] = muted;
          });

          setRoomsMuted(mutedObj);
          setRoomVolumes(soundObj);
          setMusicPlaying(roomsObj);
        })
        .catch((e) => console.error(e));
    };
    getAllStatuses();
  }, []);

  const toggleMusic = async () => {
    await fetch(
      `${BASE_URI}/api/sonos/toggle-room/?room=${selectedRoom}`,
      fetchOptions
    )
      .then((res) => res.json())
      .then(({ state }) => {
        setMusicPlaying((prevState) => {
          return {
            ...(prevState as any),
            [selectedRoom]: state === "transitioning",
          };
        });
      })
      .catch((e) => console.error(e));
  };

  const icon = useMemo(() => {
    const playIcon = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26";
    const pauseIcon =
      "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28";

    if (musicPlaying[selectedRoom]) {
      return playIcon;
    }
    return pauseIcon;
  }, [musicPlaying, selectedRoom]);

  console.log({ icon });

  const getCurrentTrack = async () => {
    try {
      await fetch(
        `${BASE_URI}/api/sonos/play-room?room=${selectedRoom}`,
        fetchOptions
      )
        .then((res) => res.json())
        // .then(({ currentTrack }) => {
        // setCurrentTrackPlaying(currentTrack);
        // })
        .catch((e) => console.error(e));
    } catch (e) {
      console.error("error in useEffect", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>First Tab</Text>
      <View
        style={styles.separator}
        lightColor="#f0f00f"
        darkColor="rgba(255,0,0,0.7)"
      />
      <Text style={styles.text}>So this is the first tab</Text>

      <Button
        onPress={toggleRoom}
        // className={classnames({
        // active: musicPlaying[selectedRoom],
        // })}
        title={musicPlaying[selectedRoom] ? "Pause" : "Play"}
      ></Button>

      <Text style={styles.text}>{volume}</Text>
    </View>
  );
}
