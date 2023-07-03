import { statut } from "./statut";
export interface utilisateur {
    id?: number;
    prenom: string;
    nom: string;
    email: string;
    statut: statut;
    login: string;
    sexe: string;
    affiliation: string;
    portable: string;
    motDePasse: string;
}