import { readFileSync, existsSync } from "node:fs"
import { join } from "path"
import { homedir } from "os"
import { log } from "console";


// Charger et parser le fichier JSON
const track = JSON.parse (readFileSync("track.json", "utf-8"));
console.log(track);

// Verifier dossier ada-tech exist ~
const cheminAda = join(homedir(), "ada-tech")
console.log(cheminAda);
const adaVerif = existsSync(cheminAda);
console.log(adaVerif ? "✅ Il existe" : "❌ Il n'existe pas");

// Recuperer tout les projets du fichier JSON
// Iterer sur les projets
// Verifier si chacun des projets exist ou non

track.projects.forEach((project) => {
    const cheminProject = join(homedir(), "ada-tech", "bloc1", "projets", project.name );
    const dossierVerif = existsSync(cheminProject);
    console.log(dossierVerif ? `${project.name} - ✅ dossier trouvé` : `❌ ${project.name} - dossier inexistant`);

    // Vérifier que chaque projet est initialisé comme un repository Git
    const cheminGit = join(cheminProject, ".git");
    const gitExiste = dossierVerif && existsSync(cheminGit);
    console.log(gitExiste ? `  OK ${project.name} - Git initialisé` : `  NOT OK ${project.name} - Pas de Git`);
    });



