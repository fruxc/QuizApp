import config from "../environments/main";
import fetchError from "../helper/customException";

const addQuiz = async (data) => {
  try {
    const response = await fetch(
      config.baseUrl + "api/v1/quizzes",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
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

const updateQuiz = async (data, quizId) => {
  try {
    const response = await fetch(
      `${config.baseUrl}api/v1/quizzes/${quizId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
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

const addQuestion = async (data) => {
  const quizId = localStorage.getItem("quiz_id");
  try {
    const response = await fetch(
      `${config.baseUrl}api/v1/quizzes/${quizId}/questions`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
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

const updateQuestion = async (data, quizId, questionId) => {
  try {
    const response = await fetch(
      `${config.baseUrl}api/v1/quizzes/${quizId}/questions/${questionId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
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

const getQuizzes = async () => {
  try {
    const response = await fetch(
      config.baseUrl + "api/v1/quizzes",
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

const getLeaderboardByQuiz = async (quizId) => {
  try {
    const response = await fetch(
      `${config.baseUrl}api/v1/quizResponse/leaderboard/${quizId}`,
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

const getLeaderboardByUser = async (userId) => {
  try {
    const response = await fetch(
      `${config.baseUrl}api/v1/quizResponse/attemptedQuiz/${userId}`,
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

const getLeaderboard = async () => {
  try {
    const response = await fetch(
      `${config.baseUrl}api/v1/quizResponse/leaderboard`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

const submitAttempt = async (data) => {
  try {
    const response = await fetch(
      config.baseUrl + "api/v1/quizResponse/submitResponse",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
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

const deleteQuiz = async (quizId) => {
  try {
    const response = await fetch(
      `${config.baseUrl}api/v1/quizzes/${quizId}`,
      {
        method: "delete",
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

const deleteQuestion = async (quizId, questionId) => {
  try {
    const response = await fetch(
      `${config.baseUrl}api/v1/quizzes/${quizId}/questions/${questionId}`,
      {
        method: "delete",
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

export {
  getQuizzes,
  addQuiz,
  addQuestion,
  submitAttempt,
  getLeaderboardByQuiz,
  deleteQuiz,
  updateQuiz,
  deleteQuestion,
  updateQuestion,
  getLeaderboard,
  getLeaderboardByUser,
};
