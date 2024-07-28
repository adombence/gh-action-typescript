import * as core from '@actions/core';
import * as github from '@actions/github';

interface Input {
  token: string;
  owner: string;
  repo: string;
  codeql: boolean;
}

export function getInputs(): Input {
  const result = {} as Input;
  result.token = core.getInput('github-token');

  return result;
}

export const run = async (): Promise<void> => {
  const input = getInputs();
  const octokit = github.getOctokit(input.token);

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  core.info(`Hello, ${login}!`);
};

export default run;