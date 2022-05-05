import axios, { AxiosRequestConfig } from "axios";
import followRedirect from "follow-redirects";
// import request from "request";
const { http, https } = require("follow-redirects");
const url = require("url");

const http_regEx = /\bhttps?:\/\/.*?\.[a-z]{2,4}\b\S*/g;

export const isSpam = async (
  content: string,
  spamLinkDomains: string[],
  redirectionDepth: number
) => {
  const urlCheck = content.match(http_regEx);
  const url = urlCheck![0];

  return await spamCheck(url, spamLinkDomains, redirectionDepth);
};

const spamCheck = async (
  url: string,
  spamLinkDomains: string[],
  redirectionDepth: number
) => {
  https
    .get(`${url}`, (response) => {
      console.log(response.responseUrl);
      response.on("data", (res) => {
        // console.log(res.headers.location);
      });
    })
    .on("error", (err) => {
      console.error(err);
    });
  //   const spamChecker =
  //     redirectCount === redirectionDepth && redirectUrl === spamLinkDomains[0];

  return true;
};

isSpam(
  "spam spam https://moimstg.page.link/dmCn",
  ["https://github.com"],
  2
).then((result) => {
  console.log(result);
});

const request = function (url) {
  https
    .get(url, (response) => {
      var body = [];
      if (response.statusCode == 302) {
        body = [];
        request(response.headers.location);
        console.log(request(response.headers.location));
      } else {
      }
    })
    .on("error" /*...*/);
};
request("https://moimstg.page.link/dmCn");
