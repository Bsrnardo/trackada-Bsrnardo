import { readFileSync, existsSync } from "fs"
import { join } from "path"
import { homedir } from "os"


// Parse le fichier JSON

const track = JSON.parse (readFileSync("track.json", "utf-8"))

console.log(track);
