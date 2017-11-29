namespace pxsim.network {

    let ws: any = null;

    /**
    * Send OSC message
    */
    //% promise
    export function sendOSCCommandAsync(ip: string, port: number, addr: string, args: string): Promise<string> {
        let newArgs = [] as any;
        let params = args.split(',');
        for (let i = 0; i < params.length; i++) {
            if (params[i])
                newArgs.push(parseFloat(params[i]));
        }            

        if (!ws){
            // look at url for current page and insert hostname (instead of redonkadonk)
            let urlString = "wss://" + window.location.hostname + ":8677";
            ws = new WebSocket(urlString);
            return new Promise<string>((resolve, reject) => {
                ws.onopen = function() {
                    let wsMessage = JSON.stringify({"ip": ip, "port": port, "addr": addr, "msg": newArgs});
                    ws.send(wsMessage);
                    resolve(wsMessage);
                };
            });             
        } else {
            return new Promise<string>((resolve, reject) => {
                let wsMessage = JSON.stringify({"ip": ip, "port": port, "addr": addr, "msg": newArgs});
                ws.send(wsMessage);
                resolve(wsMessage);
            }); 
        }


    }

}
