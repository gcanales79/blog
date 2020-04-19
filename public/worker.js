/*console.log("Service Worker")

self.addEventListener("push",e=>{
    const data=e.data.json();
    console.log(data)
    console.log("Notification Received")
    self.registration.showNotification(data.title,{
        body:data.message,
        icon:"/assets/images/apple-icon-120X120.png",
        data:{
            url:data.url
        }
    })
})

self.addEventListener('notificationclick', function(event) {
    let url = "https://www.bitesoftheworld.mx";
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({ includeUncontrolled: true, type: 'window'}).then( windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});*/