import { categorie } from "./categorie";
import { lieuStockage } from "./lieuStockage";
import { modele } from "./modele";
export interface materiel{
    id?: number;
    matricule : string;
    modele : modele;
    lieuStockage : lieuStockage;
    categorie : categorie;
}