import { httpClient } from "./Config/Config"

export const sendMail = async (to, subject, content) => {
  const response = await httpClient.get(
    `http://localhost:8080/mail/send`,
    {
      params: { to, subject, message: content }
    }
  );
  return response.data;
};