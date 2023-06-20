import { utilisateur } from "./utilisateur";

export interface location {
    id: number;
    raisonLocation: string;
    decision: string;
    dateDemandeLocation: Date;
    dateFinLocationPrevue: Date;
    dateDebutLocationPrevue: Date;
    dateProlongation: Date;
    dateValidationProlongation: Date;
    dateLocationEtat: Date;
    dateDecision: Date;
    utilisateur: utilisateur;
}