/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_GITHUB_TOKEN: string;
  }
}

interface Process {
  env: ProcessEnv;
}

declare const process: Process;
