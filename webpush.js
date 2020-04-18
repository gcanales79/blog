const webpush=require("web-push");

console.log(process.env.VAPIDPUBLIC_KEY)

webpush.setVapidDetails(
    "mailto:gustavo.canales@me.com",
    process.env.VAPIDPUBLIC_KEY,
    process.env.VAPIDPRIVATE_KEY);

module.exports=webpush;