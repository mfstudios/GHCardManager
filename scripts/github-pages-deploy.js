const execa = require("execa");
  const fs = require("fs");

  (async () => {
    try {
      console.log("Building...");
      await execa("npm", ["run", "build"]);
      // Understand if it's dist or build folder
      const folderName = fs.existsSync("dist") ? "dist" : "build";
      await execa("git", ["--work-tree", folderName, "add", "--all"]);
      await execa("git", ["--work-tree", folderName, "commit", "-m", "build for gh-pages"]);
      console.log("Successfully committed build");
    } catch (e) {
      console.log(e.message);
      process.exit(1);
    }
  })();