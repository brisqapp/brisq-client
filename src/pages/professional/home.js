/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : home.js
 * Description    : Contenu de la page d'acceuil, correspond à l'agenda
 */

import AgendaReadOnly from "../../component/agendaReadOnly"; 

const Home = () => {
    return (
    <div style={{margin:"45px 30px"}}>
        <AgendaReadOnly />
    </div>
    );
};
  
export default Home;