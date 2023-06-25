export const fetchQuestionsTrainingBatch = async (
  quizzUuid: string,
  accessToken: string
) => {
  const response = await fetch(
    `http://localhost:8000/api/question/training/${quizzUuid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return await response.json();
};
