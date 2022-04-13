module.exports = {
    moduleFileExtensions: [
        "js"
    ],
    moduleDirectories: [ "node_modules" ],
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
    setupFilesAfterEnv: [ require.resolve('regenerator-runtime/runtime') ]
}