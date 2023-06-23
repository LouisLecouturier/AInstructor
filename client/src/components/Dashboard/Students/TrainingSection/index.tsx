import React, { FC, useState } from "react";
import { Button } from "@components/Layout/Interactions/Button";
import Stars from "@icons/Stars.svg";
import Container from "@components/Layout/Container";
import QuestionForm from "./QuestionForm";

type TrainingSectionProps = {
  quizzUuid: string;
  accessToken: string;
};

const TrainingSection: FC<TrainingSectionProps> = (props) => {
  const [isTraining, setIsTraining] = useState(false);

  return (
    <Container
      title={"Let's train together !"}
      description={"Learn your course using the AI coach"}
    >
      {isTraining ? (
        <QuestionForm {...props} />
      ) : (
        <Button
          isMagic
          rounded={"full"}
          size={"sm"}
          onClick={() => setIsTraining(true)}
        >
          <Stars className={"w-5 h-5"} />
          <span>Start training</span>
        </Button>
      )}
    </Container>
  );
};

export default TrainingSection;
