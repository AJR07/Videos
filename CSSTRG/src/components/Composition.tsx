import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import "./Composition.css";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import Row from "./Row";
import { Submission } from "../types/submission";
import Score from "../types/score";
import { HouseDict } from "../types/house";

let position: { [name: string]: number } = {};

export function MyComposition(props: { submissions: Submission[] }) {
  let { submissions } = props;
  let frame = useCurrentFrame();

  let scoreboard: { [name: string]: Score } = {};
  for (let submission of submissions) {
    // if submission later than 7/29/2024 0:00:00 by frame count hours, skip
    if (
      submission.timestamp.getTime() - new Date("7/29/2024 0:00:00").getTime() >
      frame * 60 * 1000
    )
      break;

    if (scoreboard[submission.name] === undefined) {
      scoreboard[submission.name] = {
        name: submission.name,
        house: submission.house,
        score: submission.score,
      };
    }
    else scoreboard[submission.name].score += submission.score;
  }

  let maxScore = Object.values(scoreboard).reduce(
    (max, entry) => Math.max(max, entry.score),
    0
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        paddingLeft: "2%",
        paddingRight: "2%",
        paddingTop: "2%",
        paddingBottom: "2%",
      }}
    >
      <HStack width="100%">
        <Img src={staticFile("Logo.png")} style={{ width: "10vw" }}></Img>
        <h1 style={{ fontSize: "50px", fontWeight: "bolder", margin: 0 }}>
          CSS TRG - Day 4!
        </h1>
        <Spacer />
        <h2
          style={{
            justifySelf: "end",
            padding: "1vw",
            backgroundColor: "grey",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Day {Math.floor(frame / 60 / 24) + 1} Hour{" "}
          {Math.floor((frame / 60) % 24)}
        </h2>
      </HStack>

      <VStack>
        {Object.entries(scoreboard)
          .sort((a, b) => b[1].score - a[1].score)
          .map((entry, index) => {
            let [name, score] = entry;
            let prevPosition = position[name] ?? window.innerHeight;
            let targetPosition = index * 70;

            let currentTranslate = (prevPosition + targetPosition) / 2;
            position[name] = currentTranslate;

            let color = HouseDict[score.house];
            let hidden = currentTranslate >= window.innerHeight;

            return (
              <Row
                key={name}
                name={name}
                currentTranslate={currentTranslate}
                score={score.score}
                maxScore={maxScore}
                color={color}
                hidden={hidden}
              />
            );
          })}
      </VStack>
    </AbsoluteFill>
  );
}
