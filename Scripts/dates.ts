const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function getDate() {

    const time = new Date

    const year = time.getFullYear().toString()
    const day = days[time.getDay()]
    const month = months[time.getMonth()]
    const date = time.getDate().toString()

    return `${day} ${month} ${date} ${year}`
}