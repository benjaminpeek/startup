function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    let socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    return socket;
}

let socket = configureWebSocket();