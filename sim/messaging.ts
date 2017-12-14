namespace pxsim.messaging {
    
        let peer : any = null;
        let connections : any = {};
    
        var script = document.createElement('script');
        script.onload = function () {
            peer = new Peer({host: 'localhost', port: 9000, path: '/'});
            peer.on('open', function(id : string) { 
                document.getElementById('userid').innerHTML = 'Your user id is: ' + id.toString();
             });
            peer.on('connection', function(dataConnection: any) { 
                console.log("connected to user");
                connections[dataConnection.id] = dataConnection;
                dataConnection.on('open', function() {
                    console.log("ready 4 data");
                    dataConnection.send("yooo dawg");
                    dataConnection.on('data', function(data : any) {
                        console.log(data);
                    });
                });
                dataConnection.on('error', function() {console.log("error")});
            });
            peer.on('close', function() {});
            peer.on('disconnected', function() {});
            peer.on('error', function(err: any) {});
        };
        script.src = "/sim/peer.min.js";
        document.head.appendChild(script);
    
        /**
         * Peer
         * @param id The value of the marker
         */
        //% blockId=peer_block block="send key %key| value %value| to %id"
        //% blockNamespace=messaging inBasicCategory=true
        //% weight=100
        export function send(key: string, value: number, id: string) { 
            if (peer){
                if (connections[id]){
                    connections[id].send("hey hey heyyyy");
                } else {
                    let dataConnection = peer.connect(id);
                    dataConnection.on('open', function(){
                        dataConnection.send("hey hey heyyyy");
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
            let event = 0x1;
            board().bus.listen(key, event, handler);
        }
    


    }