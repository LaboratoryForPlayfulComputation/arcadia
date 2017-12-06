namespace pxsim.youtube {
    
        let ws: any = null;
        let ip = "localhost";
        let port = 6448;

        /**
        * Send set video ID command
        */
        //% promise
        export function sendVideoCommandAsync(id: string): Promise<string> {
            return webSocketHelper("/id", id);            
        }  

        /**
        * Send speed command
        */
        //% promise
        export function sendSpeedCommandAsync(rate: number): Promise<string> {
            return webSocketHelper("/speed", rate);            
        }        

        /**
        * Send seek command
        */
        //% promise
        export function sendSeekCommandAsync(time: number): Promise<string> {
            return webSocketHelper("/seek", time);            
        }

        /**
        * Send rewind command
        */
        //% promise
        export function sendRewindCommandAsync(time: number): Promise<string> {
            return webSocketHelper("/rewind", time);            
        }

        /**
        * Send fastforward command
        */
        //% promise
        export function sendFastForwardCommandAsync(time: number): Promise<string> {
            return webSocketHelper("/fastforward", time);            
        }

        /**
        * Send play command
        */
        //% promise
        export function sendPlayCommandAsync(): Promise<string> {
            return webSocketHelper("/play", 1);            
        }

        /**
        * Send pause command
        */
        //% promise
        export function sendPauseCommandAsync(): Promise<string> {
            return webSocketHelper("/pause", 1);            
        }

        /**
        * Send stop command
        */
        //% promise
        export function sendStopCommandAsync(): Promise<string> {
            return webSocketHelper("/stop", 1);            
        }

        /**
        * Send volume command
        */
        //% promise
        export function sendVolumeCommandAsync(value: number): Promise<string> {
            return webSocketHelper("/volume", value);            
        }

        /**
        * Send mute command
        */
        //% promise
        export function sendMuteCommandAsync(): Promise<string> {
            return webSocketHelper("/mute", 1);            
        }

        /**
        * Send unmute command
        */
        //% promise
        export function sendUnmuteCommandAsync(): Promise<string> {
            return webSocketHelper("/mute", 0);            
        }

        function webSocketHelper(addr: string, arg: any): Promise<string> {
            if (!ws){
                // look at url for current page and insert hostname (instead of redonkadonk)
                let urlString = "wss://" + window.location.hostname + ":8677";
                ws = new WebSocket(urlString);
                return new Promise<string>((resolve, reject) => {
                    ws.onopen = function() {
                        let wsMessage = JSON.stringify({"ip": ip, "port": port, "addr": addr, "msg": [arg]});
                        ws.send(wsMessage);
                        resolve(wsMessage);
                    };
                });             
            } else {
                return new Promise<string>((resolve, reject) => {
                    let wsMessage = JSON.stringify({"ip": ip, "port": port, "addr": addr, "msg": [arg]});
                    ws.send(wsMessage);
                    resolve(wsMessage);
                }); 
            }
        }

    
    }
    