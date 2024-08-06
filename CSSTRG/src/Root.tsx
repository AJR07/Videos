import { Composition } from "remotion";
import { MyComposition } from "./components/Composition";
import { ChakraProvider } from "@chakra-ui/react";
import Submissions from "./Submissions.json";
import { Submission } from "./types/submission";

export const RemotionRoot: React.FC = () => {
  let parsedSubmissions: Submission[] = [];

  for (let scoreID in Object.keys(Submissions)) {
    let score = (Object.entries(Submissions)[scoreID] as any)[1];

    let parsedScore: Submission = {
      timestamp: new Date(score.timestamp),
      name: score.name,
      question: score.question,
      score: parseInt(score.score),
      house: score.house
    };
    parsedSubmissions.push(parsedScore);
  }

  let frameCount = Math.floor(
    (parsedSubmissions.slice(-1)[0].timestamp.getTime() -
      new Date("7/29/2024 0:06:54").getTime()) /
      (1000 * 60 * 60) * 60
  );

  return (
    <ChakraProvider>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={frameCount}
        fps={120}
        width={1280}
        height={720}
        defaultProps={{ submissions: parsedSubmissions }}
      />
    </ChakraProvider>
  );
};
