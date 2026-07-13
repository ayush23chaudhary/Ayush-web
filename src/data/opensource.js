export const openSourceContributions = [
  {
    id: 1,
    repo: "nodejs/node",
    title: "Replaced experimental 'using' syntax with try-finally blocks inside diagnostics_channel to support standard environments.",
    prUrl: "https://github.com/nodejs/node/pull/64251",
    status: "Open",
    description: "Replaces experimental 'using' syntax with try...finally blocks inside lib/diagnostics_channel.js to avoid dependency on Explicit Resource Management flags.",
    technologies: ["JavaScript", "Node.js Core", "V8 Engine"]
  },
  {
    id: 2,
    repo: "remix-run/react-router",
    title: "Enhanced JSDoc documentation and usage examples for the useMatches hook.",
    prUrl: "https://github.com/remix-run/react-router/pull/15267",
    status: "Merged",
    description: "Improves the useMatches JSDoc explanation and real-world examples, focusing on its pairing with the route handle property.",
    technologies: ["React Router", "TypeScript", "Documentation"]
  },
  {
    id: 3,
    repo: "vercel/next.js",
    title: "Fixed infinite middleware routing loops and internal request header leaks during route rewrites.",
    prUrl: "https://github.com/vercel/next.js/pull/95598",
    status: "Open",
    description: "Prevents infinite middleware routing loops and internal request header leaks during route rewrites in output: standalone mode.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js"]
  },
  {
    id: 4,
    repo: "react/react",
    title: "Resolved ESLint 9 Flat Config compilation errors for TypeScript environments in eslint-plugin-react-hooks.",
    prUrl: "https://github.com/react/react/pull/36920",
    status: "Closed",
    description: "Hoists flat config configurations in eslint-plugin-react-hooks to resolve TS2322 compile errors for developers using ESLint 9 Flat Config in TypeScript environments.",
    technologies: ["React Core", "ESLint", "TypeScript"]
  }
];
