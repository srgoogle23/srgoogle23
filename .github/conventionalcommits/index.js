const core = require("@actions/core");
const github = require("@actions/github");
import { validatePR } from "./ccc";

try {
  if (typeof github.context.payload.pull_request == 'undefined') {
    var commits = github.context.payload.commits;
    if (commits.length == 1) {
      const title = commits[0]["message"];
      console.log(title);
    } else {
      const title = last_commit["message"];
      console.log(title);
    }

    
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
