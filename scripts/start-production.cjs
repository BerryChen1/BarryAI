const path = require("node:path");

// Keep production startup identical on Windows, macOS and Linux, including when
// this script is invoked from a directory other than the project root.
process.env.NODE_ENV = "production";
process.chdir(path.resolve(__dirname, ".."));
require("../build/server.cjs");
