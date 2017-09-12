import path from "path"
import fs from "fs"
import glob from "glob"
import mkdirp from "mkdirp"
import jscodeshift from "jscodeshift"

import tx from "./MapChild"

const files = glob.sync("**/*.jsx", {
  cwd: path.resolve(__dirname, "../macros/"),
  ignore: "*.spec.jsx",
})
// const files = ["Marker.jsx", "GoogleMap.jsx"]
files.map(filename => {
  const source = fs.readFileSync(
    path.resolve(__dirname, "../macros/", filename),
    "utf8"
  )
  const output = tx({ source }, { jscodeshift })
  const nextFilename = path.resolve(__dirname, "../components/", filename)
  mkdirp.sync(path.dirname(nextFilename))
  fs.writeFileSync(nextFilename, output)
})
