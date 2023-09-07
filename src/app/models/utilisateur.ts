import { statut } from "./statut";
export interface utilisateur {
    id?: number;
    prenom: string;
    nom: string;
    email: string;
    statut: statut;
    motDePasse: string;
}