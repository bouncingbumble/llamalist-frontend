export const times = [
    '5:00AM',
    '5:15AM',
    '5:30AM',
    '5:45AM',
    '6:00AM',
    '6:15AM',
    '6:30AM',
    '6:45AM',
    '7:00AM',
    '7:15AM',
    '7:30AM',
    '7:45AM',
    '8:00AM',
    '8:15AM',
    '8:30AM',
    '8:45AM',
    '9:00AM',
    '9:15AM',
    '9:30AM',
    '9:45AM',
    '10:00AM',
    '10:15AM',
    '10:30AM',
    '10:45AM',
    '11:00AM',
    '11:15AM',
    '11:30AM',
    '11:45AM',
    '12:00PM',
    '12:15PM',
    '12:30PM',
    '12:45PM',
    '1:00PM',
    '1:15PM',
    '1:30PM',
    '1:45PM',
    '2:00PM',
    '2:15PM',
    '2:30PM',
    '2:45PM',
    '3:00PM',
    '3:15PM',
    '3:30PM',
    '3:45PM',
    '4:00PM',
    '4:15PM',
    '4:30PM',
    '4:45PM',
    '5:00PM',
    '5:15PM',
    '5:30PM',
    '5:45PM',
    '6:00PM',
    '6:15PM',
    '6:30PM',
    '6:45PM',
    '7:00PM',
    '7:15PM',
    '7:30PM',
    '7:45PM',
    '8:00PM',
    '8:15PM',
    '8:30PM',
    '8:45PM',
    '9:00PM',
    '9:15PM',
    '9:30PM',
    '9:45PM',
    '10:00PM',
]

export const convertTime12to24 = (time) => {
    if (time) {
        const modifier = time.slice(-2)
        let hours = time.split(':')[0]
        let minutes = time.split(':')[1].substring(0, 2)

        if (hours === '12') {
            hours = '00'
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12
        }

        return `${hours}:${minutes}`
    }
}

export const covertTimeTo12forMenu = (date) => {
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var AMPM = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    var strTime = hours + ':' + minutes + '' + AMPM
    return strTime
}

export const isOverDue = (due) => {
    if (due) {
        return new Date(due) < new Date()
    }
}

export const validateTime = (time) => {
    const formattedTime = time.toUpperCase().replaceAll(' ', '')
    if (formattedTime.includes(':')) {
        const [hours, minutesAndAMPM] = formattedTime.split(':')
        const minutes = minutesAndAMPM.substring(0, 2)
        const meridiem = minutesAndAMPM.substring(2, 4)

        if (Number(hours) > 0 && Number(hours) <= 12) {
            if (Number(minutes) >= 0 && Number(minutes) < 60) {
                if (meridiem === 'AM' || meridiem === 'PM') {
                    return formattedTime
                }
            }
        }
    }
    return false
}

export const getUTCHours = (hour) => {
    const date = new Date(new Date().setHours(hour))
    return date.getUTCHours()
}
