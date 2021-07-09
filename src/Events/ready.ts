export const run = async (bot) => {
    const statuses = [
        `Rich presence del bot.`
    ], status = statuses[Math.floor(Math.random() * statuses.length)]

    setInterval(() => {
        bot.user.setPresence({ status: "dnd", activity: { name: status, type: "WATCHING" } })
    }, 10000)
}