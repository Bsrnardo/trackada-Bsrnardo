import { readFileSync, existsSync } from "node:fs"
import { join } from "node:path"
import { homedir } from "node:os"

// Charger et parser le fichier JSON
const track = JSON.parse(readFileSync("track.json", "utf-8"));

// Verifier dossier ada-tech
const cheminAda = join(homedir(), "ada-tech")
const adaVerif = existsSync(cheminAda);
console.log(adaVerif ? "✅ ada-tech existe" : "❌ ada-tech n'existe pas");
console.log("");

// Compteurs pour le pourcentage
let totalProjets = 0;
let projetsOK = 0;

// Iterer sur les projets
track.projects.forEach((project) => {
    totalProjets++;

    const cheminProject = join(homedir(), "ada-tech", "bloc1", "projets", project.name);
    const dossierVerif = existsSync(cheminProject);

    console.log(`${dossierVerif ? "✅" : "❌"} Dossier ${project.name}.`);

    // Vérifier Git
    const cheminGit = join(cheminProject, ".git");
    const gitExiste = dossierVerif && existsSync(cheminGit);
    console.log(gitExiste
        ? `   ✅ Le dossier est initié sur Git`
        : `   ❌ Le dossier n'est pas initié sur Git`
    );

    // Vérifier les fichiers
    let tousFichiersOK = true;
    project.required.forEach((fichier) => {
        const cheminFichier = join(cheminProject, fichier);
        const fichierExiste = dossierVerif && existsSync(cheminFichier);
        if (!fichierExiste) tousFichiersOK = false;
        console.log(fichierExiste
            ? `   ✅ ${fichier} existe bien.`
            : `   ❌ ${fichier} est absent.`
        );
    });

    // Message final du projet
    const projetComplet = dossierVerif && gitExiste && tousFichiersOK;
    if (projetComplet) projetsOK++;
    console.log(`Le projet ${project.name} est ${projetComplet ? "complet !" : "incomplet."}`);
    console.log("");
});

// Pourcentage final
const pourcentage = Math.round((projetsOK / totalProjets) * 100);
console.log(`${pourcentage}% des projets sont initialisés correctement. (${projetsOK}/${totalProjets}).`);