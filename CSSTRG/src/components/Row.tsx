import { HStack, Progress, VStack } from "@chakra-ui/react";

export default function Row(props: {
  name: string;
  currentTranslate: number;
  score: number;
  maxScore: number;
  color: string;
  hidden: boolean;
}) {
  let { name, currentTranslate, score, maxScore, color, hidden } = props;

  return (
    <HStack width="90%" hidden={hidden} position="absolute" marginBottom="20px" marginTop="20px" marginY={currentTranslate}>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color,
          color: "black",
          width: "45px",
          height: "45px",
          marginRight: '5px',
          borderRadius: "50%",
          fontWeight: "bold",
          fontSize: '25px'
        }}
		
      >
        {name.slice(0, 1)}
      </p>
      <VStack width="100%" gap={0}>
        <HStack width="100%">
          <Progress width="100%" value={score / maxScore * 100} />
          <p style={{ width: "50px"}}>{score}</p>
        </HStack>
        <h1 style={{alignSelf: "start", margin: 0}}>{name}</h1>
      </VStack>
    </HStack>
  );
}
