import config from "../environments/main";
import fetchError from "../helper/customException";

const getQuizzes = async () => {
  try {
    const response = await fetch(
      config.baseUrl + "api/v1/quizes",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      },
      2 * 10 * 60 * 1000
    );
    if (!response.ok) {
      throw response;
    }
    const json_response = await response.json();
    return json_response;
  } catch (err) {
    if (typeof err.text === "function") {
      let errorMessage = await err.text();
      throw new fetchError(err.status, errorMessage);
    } else {
      throw new Error(err);
    }
  }
};
const getQuestions = async () => {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json",
          // authorization: `bearer ${localStorage.getItem("token")}`,
        },
      },
      2 * 10 * 60 * 1000
    );
    if (!response.ok) {
      throw response;
    }
    const json_response = await response.json();
    return json_response;
  } catch (err) {
    if (typeof err.text === "function") {
      let errorMessage = await err.text();
      throw new fetchError(err.status, errorMessage);
    } else {
      throw new Error(err);
    }
  }
};
export { getQuizzes, getQuestions };
