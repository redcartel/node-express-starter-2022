module.exports = {
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
    moduleFileExtensions: [
        "js"
    ],
    moduleDirectories: [ "node_modules" ],
    transform: {
        "^.+\\.js$": "babel-jest"
    },
    setupFilesAfterEnv: [ require.resolve('regenerator-runtime/runtime') ]
}