import axios, { AxiosRequestConfig } from "axios";
import express from "express";

const app = express();
function isSpam(
  content: string,
  spamLinkDomains: string[],
  redirectionDepth: number
): boolean {
  let spamCheck!: boolean;
  let regEx = /\bhttps?:\/\/.*?\.[a-z]{2,4}\b\S*/g;
  const urlCheck: RegExpMatchArray | null = content.match(regEx);
  let url!: string;
  if (urlCheck) {
    url = urlCheck![0];
  }

  const response = axios
    .get(`${url}`)
    .then(function (response) {
      const redirectUrl = response.request.res.responseUrl;
      const redirectCount = response.request._redirectable._redirectCount;

      spamCheck =
        redirectCount === redirectionDepth && redirectUrl === spamLinkDomains[0]
          ? true
          : false;
      return spamCheck;
    })
    .catch(function (err) {
      console.error("err");
    });
  return spamCheck;
}

console.log(
  isSpam("spam spam https://moimstg.page.link/dmCn", ["https://github.com"], 2)
);

export { isSpam };
