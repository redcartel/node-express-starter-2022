const config = {
    verbose: true,
    moduleFileExtensions: ["js"],
    moduleDirectories: ["node_modules", "__tests__"],
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    }
  };

  export default config;