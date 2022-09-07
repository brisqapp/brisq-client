function getHourMinuteFromString(str){
    return str.split(":");
}

const startDayHour = "07:00";
const endDayHour = "19:00";
const monday = {
    year: 2020,
    month: 0,
    day: 6
}

function orderScheduleByWeekday( a, b ) {
    if ( a.weekday < b.weekday ){
      return -1;
    }
    if ( a.weekday > b.weekday ){
      return 1;
    }
    return 0;
}

export function scheduleToAppoitments(employe){
    let appointements = [];
    let idSchedule = 0;
    const schedules = employe.schedule.sort(orderScheduleByWeekday);

    for(let day = 1; day <= 7; day++){
        let schedule = schedules[idSchedule];
        if(day == schedule?.weekday){
            appointements.push({
                title: 'Non disponible',
                startDate: new Date(
                    monday.year, 
                    monday.month,
                    monday.day + day - 1, 
                    getHourMinuteFromString(startDayHour)[0],                    
                    getHourMinuteFromString(startDayHour)[1]
                ),
                endDate: new Date(
                    monday.year, 
                    monday.month, 
                    monday.day + day - 1, 
                    getHourMinuteFromString(schedule.morningBegin)[0],                    
                    getHourMinuteFromString(schedule.morningBegin)[1]
                ),
                id: 0,
                schedule: true,
                rRule: 'FREQ=WEEKLY'
            },
            {
                title: 'Non disponible',
                startDate: new Date(
                    monday.year, 
                    monday.month,
                    monday.day + day - 1, 
                    getHourMinuteFromString(schedule.morningEnd)[0],                    
                    getHourMinuteFromString(schedule.morningEnd)[1]
                ),
                endDate: new Date(
                    monday.year, 
                    monday.month, 
                    monday.day + day - 1, 
                    getHourMinuteFromString(schedule.afternoonBegin)[0],                    
                    getHourMinuteFromString(schedule.afternoonBegin)[1]
                ),
                id: 0,
                schedule: true,
                rRule: 'FREQ=WEEKLY'
            },
            {
                title: 'Non disponible',
                startDate: new Date(
                    monday.year, 
                    monday.month,
                    monday.day + day - 1, 
                    getHourMinuteFromString(schedule.afternoonEnd)[0],                    
                    getHourMinuteFromString(schedule.afternoonEnd)[1]
                ),
                endDate: new Date(
                    monday.year, 
                    monday.month, 
                    monday.day + day - 1, 
                    getHourMinuteFromString(endDayHour)[0],                    
                    getHourMinuteFromString(endDayHour)[1]
                ),
                id: 0,
                schedule: true,
                rRule: 'FREQ=WEEKLY'
            },)
            idSchedule++;
        } else {
            appointements.push({
                title: 'Non disponible',
                startDate: new Date(
                    monday.year, 
                    monday.month,
                    monday.day + day - 1, 
                    getHourMinuteFromString(startDayHour)[0],                    
                    getHourMinuteFromString(startDayHour)[1]
                ),
                endDate: new Date(
                    monday.year, 
                    monday.month, 
                    monday.day + day - 1, 
                    getHourMinuteFromString(endDayHour)[0],                    
                    getHourMinuteFromString(endDayHour)[1]
                ),
                id: 0,
                schedule: true,
                rRule: 'FREQ=WEEKLY'
            })
        }
    }
    return appointements;
}