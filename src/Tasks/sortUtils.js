export const getUrgencyBasedOnDueDate = (date) => {
    const due = new Date(date) //conver '2021-01-15T18:00:00.000Z' format to JS date object
    if ((due - Date.now()) / (1000 * 3600 * 24) < 3) {
        return 1
    } else if (
        (due - Date.now()) / (1000 * 3600 * 24) > 3 &&
        (due - Date.now()) / (1000 * 3600 * 24) < 7
    ) {
        return 2
    } else if ((due - Date.now()) / (1000 * 3600 * 24) > 7) {
        return 3
    }
}

export const sortTasksByDueDate = (unsortedArray, direction) => {
    let sortedList = []

    let dueDates = []
    let noDueDates = []

    //break up tasks into by due date and no due date
    unsortedArray.forEach((task) => {
        if (task.due) {
            dueDates.push(task)
        } else {
            noDueDates.push(task)
        }
    })

    switch (direction) {
        case 'newestFirst':
            dueDates.sort((a, b) => {
                const datea = new Date(a.due)
                const dateb = new Date(b.due)

                return datea - dateb
            })
            sortedList = [...dueDates, ...noDueDates]
            break
        case 'oldestFirst':
            dueDates.sort((a, b) => {
                const datea = new Date(a.due)
                const dateb = new Date(b.due)

                return dateb - datea
            })
            sortedList = [...dueDates, ...noDueDates]
            break
        default:
            alert('not a valid sort option')
            break
    }

    return sortedList
}

export const sortTasksByCreationDate = (unsortedArray, direction) => {
    let unsortedArrayCopy = [...unsortedArray]

    switch (direction) {
        case 'newestFirst':
            unsortedArrayCopy.sort((a, b) => {
                const datea = new Date(a.createdDate)
                const dateb = new Date(b.createdDate)

                return dateb - datea
            })
            break
        case 'oldestFirst':
            unsortedArrayCopy.sort((a, b) => {
                const datea = new Date(a.createdDate)
                const dateb = new Date(b.createdDate)

                return datea - dateb
            })
            break
        default:
            alert('not a valid sort option')
            break
    }

    return unsortedArrayCopy
}

export const sortTasksByDragAndDrop = (unsortedArrayOfTasks) => {
    return unsortedArrayOfTasks.sort((a, b) => a.position - b.position)
}
