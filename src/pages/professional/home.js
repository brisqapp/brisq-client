/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : home.js
 * Description    : Contenu de la page d'acceuil, l'employeur est dirigé sur cette
 *                  page une fois qu'il s'est logué.
 */

import AgendaReadOnly from "../../component/agendaReadOnly";

// Retourne le contenu de l'agenda
const Home = () => {
    return (
        <div style={{ margin: "45px 30px" }}>
            <AgendaReadOnly />
        </div>
    );
};

export default Home;