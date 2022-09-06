/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : api/reservation.js
 * Description    : Cette page a pour but de montrer au client sa réservation.
 *                  Il peut y voir l'heure du rendez-vous, l'employé qui lui   
 *                  est attribué ainsi que l'agenda de cette compagnie.
 */

/**
 * 
 */
export function getReservations(){
    return {
        employe: ["R Justin", "P Vincent", "D Dimitri", "T Olivier"],
        appointments: [
            {
                title: 'Coasdfupe femme',
                startDate: new Date(2022, 9, 2, 9, 35),
                endDate: new Date(2022, 9, 2, 11, 30),
                id: 0,
                location: 'R Justin',
            },
            {
                title: 'Coupe homme',
                startDate: new Date(2022, 8, 3, 16, 35),
                endDate: new Date(2022, 8, 3, 17, 30),
                id: 1,
                location: 'P Vincent',
            },
            {
                title: 'Coupe homme',
                startDate: new Date(2022, 9, 1, 16, 35),
                endDate: new Date(2022, 9, 1, 17, 30),
                id: 2,
                location: 'T Olivier',
            }
        ]
    }
}

export function getReservationsByEmploye(){
    const reservations = getReservations();
    const appointments = reservations.appointments;
    const employes = reservations.employe;
    let r = []
    for(const employe of employes){
        r[employe] = [];
    }
    for(const reservation of appointments){
        if(r[reservation.location] != undefined)
            r[reservation.location].push(reservation);
    }
    return {employes: employes, appoitments: r};
}

export function makeReservation(form){
    console.log(form);
}