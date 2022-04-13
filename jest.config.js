module.exports = {
    "verbose": true,
    "moduleFileExtensions": [
        "js"
    ],
    "moduleDirectories": [
        "node_modules",
        "__tests__"
    ],
    "transform": {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    setupFilesAfterEnv: [ require.resolve('regenerator-runtime/runtime') ]
}