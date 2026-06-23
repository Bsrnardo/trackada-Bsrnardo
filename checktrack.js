import { readFileSync, existsSync } from "fs"
import { join } from "path"
import { homedir } from "os"


// Parse le fichier JSON

const track = JSON.parse (readFileSync("track.json", "utf-8"))

console.log(track);

// Verifier la presence du dossier ada

const cheminAda = join(homedir(), "ada-tech")
console.log(cheminAda);

const adaVerif = existsSync(cheminAda) // Retourne true ou false

if (adaVerif) {
    console.log("Il existe");
} else {
    console.log("Il n'existe pas");
};

// Recuperer tout les projets du fichier JSON
// Iterer sur les projets
// Verifier si chacun des projets exist ou non

track.projects.forEach((project) => {
    console.log(project.name);
    const cheminProject = join(homedir(), "ada-tech", "bloc-1", "projets", "trackada", project.name )
    
});