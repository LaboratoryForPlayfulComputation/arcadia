namespace pxsim.messaging {
    
        let peer : any = null;
        let connections : any = {};
    
        var script = document.createElement('script');
        script.onload = function () {
            initializePeer();
        };
        script.src = "/sim/peer.min.js";
        document.head.appendChild(script);

        function updateUserId(id : string){
            document.getElementById('userid').innerHTML = 'Your user id is: ' + id.toString();
        }

        function initializePeer(){
            /* Create instance of PeerJS */
            peer = new Peer({
                host: 'liminal-jam.herokuapp.com',
                secure: true,
                port: 443,
                key: 'peerjs',
                debug: 3});

            /* Received user ID from server */
            peer.on('open', function(id : string) { 
                updateUserId(id);
            });
            peer.on('close', function() {});
            peer.on('disconnected', function() {});
            peer.on('error', function(err: any) {});

            /* Successfully created data connection */
            peer.on('connection', function(dataConnection: PeerJs.DataConnection) { 
                connections[dataConnection.peer] = dataConnection;
                dataConnection.on('data', function(data: any) {
                    console.log(data["key"]);
                    board().bus.queue(data['key'], 0x1);
                });
                dataConnection.on('close', function() { });
                dataConnection.on('error', function() { });
            });
        }

        /**
         * Peer
         * @param id The value of the marker
         */
        //% blockId=peer_block block="send key %key| value %value| to %id"
        //% blockNamespace=messaging inBasicCategory=true
        //% weight=100
        export function send(key: string, value: number, id: string) { 
            if (peer){
                let dataConnection = connections[id];
                if (dataConnection && dataConnection.open){
                    dataConnection.send({"key": key, "value": value});
                } else {
                    let dataConnection = peer.connect(id);
                    connections[dataConnection.peer] = dataConnection;
                    dataConnection.on('open', function(){
                        dataConnection.send({"key": key, "value": value});
                        dataConnection.on('data', function(data: any){
                            console.log(data["key"]);
                            board().bus.queue(data["key"], 0x1);
                        });
                    });
                }
            }
        } 
    
        /**
         * Peer
         * @param id The value of the marker
         */
        //% blockId=peer_conn_block block="connect to %id"
        //% blockNamespace=messaging inBasicCategory=true
        //% weight=100
        export function connect(id: string) { 
            if (peer) {
                let conn = peer.connect(id);
            }
        }
    
        /**
         * Allows user to define callbacks for receive event
         * @param key 
         */
        //% blockId=peer_receive block="when I receive key %key|do" blockGap=8
        //% blockNamespace=messaging inBasicCategory=true
        //% weight=99    
        export function receive(key: string, handler: RefAction) {
            board().bus.listen(key, 0x1, handler);
        }
    


    }