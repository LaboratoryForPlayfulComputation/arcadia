namespace pxsim.messaging {

    /**
     * Peer
     * @param id The value of the marker
     */
    //% blockId=peer_block block="send key %key| value %value| to %id"
    //% weight=100
    export function send(key: string, value: any, id: string) { 
        let peer = board().peer;
        let conn = peer.connect(id);
        let sendString = '{' + key + ':' + value + '}';
        conn.on('open', function(){
          conn.send(sendString);
        });
    } 

    /**
     * Allows user to define callbacks for receive event
     * @param key 
     */
    //% blockId=peer_receive block="when I receive key %key|do" blockGap=8
    //% weight=99    
    export function receive(key: string, handler: RefAction) {
        let event = 0x1;
        board().bus.listen(key, event, handler);
    }

}