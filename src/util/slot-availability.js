// this is a helper function which will help to convert the given time in minutes only for 24hr clock
const parseTime = (timestr) => {
    const [hours, minutes] = timestr.split(":").map(Number)
    return hours*60 + minutes
}

//this is a helper function to convert minutes into 24hr clock

const parseMiuntes = (timeMin) => {
    const hours = Math.floor((timeMin/60)%24).toString().padStart(2,"0")
    const minutes = (timeMin%60).toString().padStart(2,"0")
    
    return `${hours}:${minutes}`

}

//this is the main function which will add all the available slots

const slots = (startTime, endTime, duration) => {
    let startMinutes = parseTime(startTime)
    let endMinutes = parseTime(endTime)
    if(endMinutes < startMinutes){
        endMinutes += 24*60
    }

    const slotsList = []

    while((startMinutes + duration) <= endMinutes){
        const slotDuration = `${parseMiuntes((startMinutes))}-${parseMiuntes(startMinutes + duration)}`
        slotsList.push(slotDuration)
        startMinutes += duration
    }

    console.log(slotsList, " duration per slot : ", duration);
    return slotsList

}

export {slots};