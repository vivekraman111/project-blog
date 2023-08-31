var fs = require("fs/promises");

(async () => {
  const fileNames = await fs.readDirectory(path.join(process.cwd(), "content"));
  console.log(fileNames);
})();
