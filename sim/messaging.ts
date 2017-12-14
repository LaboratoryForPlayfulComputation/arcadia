namespace pxsim.messaging {
    
        /*
        let peer : any = null;
        let connections = new Array();
    
        var script = document.createElement('script');
        script.onload = function () {
            // this.peer = new Peer({key: '648xw9rwll92j4i'}); // need key for deployment if using the cloud
            peer = new Peer({host: 'localhost', port: 9000, path: '/'}); // for running locally and with custom server
            peer.on('open', function(id : string) { });
            peer.on('connection', function(dataConnection: any) { 
                connections.push(dataConnection);
                dataConnection.on('data', function(data : any) { });
            });
            peer.on('close', function() { });
            peer.on('disconnected', function() { });
            peer.on('error', function(err: any) { });
        };
        script.src = "/sim/peer.min.js";
        document.head.appendChild(script);
        */
    
        /**
         * Peer
         * @param id The value of the marker
         */
        //% blockId=peer_block block="send key %key| value %value| to %id"
        //% blockNamespace=messaging inBasicCategory=true
        //% weight=100
        export function send(key: string, value: number, id: string) { 
            /*
            if (peer){
                let conn = peer.connect(id);
                let sendString = {key: value};
                conn.on('open', function(){
                  conn.send(sendString);
                });
            }
            */
        } 
    
        /**
         * Peer
         * @param id The value of the marker
         */
        //% blockId=peer_conn_block block="connect to %id"
        //% blockNamespace=messaging inBasicCategory=true
        //% weight=100
        export function connect(id: string) { 
            /*
            if (peer) {
                let conn = peer.connect(id);
            }
            */
        }
    
        /**
         * Allows user to define callbacks for receive event
         * @param key 
         */
        //% blockId=peer_receive block="when I receive key %key|do" blockGap=8
        //% blockNamespace=messaging inBasicCategory=true
        //% weight=99    
        export function receive(key: string, handler: RefAction) {
            /*
            let event = 0x1;
            board().bus.listen(key, event, handler);
            */
        }
    


    }