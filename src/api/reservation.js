export function getReservations(){
    return {
        employe: ["R Justin", "P Vincent", "D Dimitri", "T Olivier"],
        appointments: [
            {
                title: 'Coasdfupe femme',
                startDate: new Date(2018, 5, 25, 9, 35),
                endDate: new Date(2018, 5, 25, 11, 30),
                id: 0,
                location: 'R Justin',
            },
            {
                title: 'Coupe homme',
                startDate: new Date(2018, 5, 25, 16, 35),
                endDate: new Date(2018, 5, 25, 17, 30),
                id: 1,
                location: 'P Vincent',
            },
            {
                title: 'Coupe homme',
                startDate: new Date(2018, 5, 25, 16, 35),
                endDate: new Date(2018, 5, 25, 17, 30),
                id: 1,
                location: 'T Olivier',
            }
        ]
    }
}