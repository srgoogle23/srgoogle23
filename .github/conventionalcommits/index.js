const core = require("@actions/core");
const github = require("@actions/github");
import { validatePR } from "./ccc";

try {
  if (typeof github.context.payload.pull_request == 'undefined') {
    var commits = github.context.payload.commits;
    if (commits.length == 1) {
      var title = commits[0]["message"];
      console.log(title);
    } else {
      var last_commit = commits[commits.length - 1];
      var title = last_commit["message"];
      console.log(title);
    }

    
    var body = '';
    var type = 'push';
  } else {
    console.log('É um pull request!');
    var title = github.context.payload.pull_request.title;
    var body = github.context.payload.pull_request.body;
    var type = 'pull';
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
