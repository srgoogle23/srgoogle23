const core = require("@actions/core");
const github = require("@actions/github");
import { validatePR } from "./ccc";

try {
  if (typeof github.context.payload.pull_request == 'undefined') {
    var commits = github.context.payload.commits;
    var last_commit = commits[commits.length - 1];
    console.log(commits.length );
    const title = last_commit["message"];
    const body = '';
    const type = 'push';
  } else {
    console.log('É um pull request!');
    const title = github.context.payload.pull_request.title;
    const body = github.context.payload.pull_request.body;
    const type = 'pull';
  }

  
  const prTitleRegexPattern = core.getInput("pr-title-regex");
  const prBodyRegexPattern = core.getInput("pr-body-regex");

  const result = validatePR({
    title,
    body,
    prTitleRegexPattern,
    prBodyRegexPattern,
    type,
  });
  if (result.status !== "success") {
    throw result;
  }
  console.log(result.message);
} catch (error) {
  core.setFailed(error.message);
}
