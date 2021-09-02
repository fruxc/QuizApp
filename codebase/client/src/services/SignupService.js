import config from "../environments/main";
import fetchError from "../helper/customException";

export default async function SignupService(data) {
  try {
    const response = await fetch(
      config.baseUrl + "api/v1/user",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
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
}
