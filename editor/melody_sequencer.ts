/// <reference path="../node_modules/pxt-core/localtypings/blockly.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

namespace pxt.editor {

  export class MelodySequencer extends Blockly.Field implements Blockly.FieldCustom {
    public isFieldCustom_ = true;

    private params : any;

    private boardElement : SVGSVGElement;
    private gridElement_ : SVGGElement;
    private allBeats_    : pxsim.Map<SVGElement[]>;

    static NUM_BEATS   = 8;
    static NUM_TRACKS  = 12;
    static imageWidth  = 225;
    static imageHeight = 150;

    constructor(text: string, params: any, validator?: Function) {
      super(text, validator);
      this.params = params;
    }

    /**
     * Show the inline free-text editor on top of the text.
     * @private
     */
    showEditor_() {
    }

    initGrid() {
      const BOARD_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" id="field-neopixels" viewBox="0 0 180.09375 179.22874">
  <text x="-50" y="15" fill="white">C</text>
  <rect id="melody-track0beat0" width="20" height="20" fill="#000000"/>
  <rect id="melody-track0beat1" width="20" height="20" x="25" fill="#000000"/>
  <rect id="melody-track0beat2" width="20" height="20" x="50" fill="#000000"/>
  <rect id="melody-track0beat3" width="20" height="20" x="75" fill="#000000"/>
  <rect id="melody-track0beat4" width="20" height="20" x="100" fill="#000000"/>
  <rect id="melody-track0beat5" width="20" height="20" x="125" fill="#000000"/>
  <rect id="melody-track0beat6" width="20" height="20" x="150" fill="#000000"/>
  <rect id="melody-track0beat7" width="20" height="20" x="175" fill="#000000"/>
  <text x="-50" y="40" fill="white">C#/Db</text>
  <rect id="melody-track1beat0" width="20" height="20" y="25" fill="#000000"/>
  <rect id="melody-track1beat1" width="20" height="20" x="25" y="25" fill="#000000"/>
  <rect id="melody-track1beat2" width="20" height="20" x="50" y="25" fill="#000000"/>
  <rect id="melody-track1beat3" width="20" height="20" x="75" y="25" fill="#000000"/>
  <rect id="melody-track1beat4" width="20" height="20" x="100" y="25" fill="#000000"/>
  <rect id="melody-track1beat5" width="20" height="20" x="125" y="25" fill="#000000"/>
  <rect id="melody-track1beat6" width="20" height="20" x="150" y="25" fill="#000000"/>
  <rect id="melody-track1beat7" width="20" height="20" x="175" y="25" fill="#000000"/>
  <text x="-50" y="65" fill="white">D</text>
  <rect id="melody-track2beat0" width="20" height="20" y="50" fill="#000000"/>
  <rect id="melody-track2beat1" width="20" height="20" y="50" x="25" fill="#000000"/>
  <rect id="melody-track2beat2" width="20" height="20" y="50" x="50" fill="#000000"/>
  <rect id="melody-track2beat3" width="20" height="20" y="50" x="75" fill="#000000"/>
  <rect id="melody-track2beat4" width="20" height="20" y="50" x="100" fill="#000000"/>
  <rect id="melody-track2beat5" width="20" height="20" y="50" x="125" fill="#000000"/>
  <rect id="melody-track2beat6" width="20" height="20" y="50" x="150" fill="#000000"/>
  <rect id="melody-track2beat7" width="20" height="20" y="50" x="175" fill="#000000"/>
  <text x="-50" y="90" fill="white">D#/Eb</text>
  <rect id="melody-track3beat0" width="20" height="20" y="75" fill="#000000"/>
  <rect id="melody-track3beat1" width="20" height="20" x="25" y="75" fill="#000000"/>
  <rect id="melody-track3beat2" width="20" height="20" x="50" y="75" fill="#000000"/>
  <rect id="melody-track3beat3" width="20" height="20" x="75" y="75" fill="#000000"/>
  <rect id="melody-track3beat4" width="20" height="20" x="100" y="75" fill="#000000"/>
  <rect id="melody-track3beat5" width="20" height="20" x="125" y="75" fill="#000000"/>
  <rect id="melody-track3beat6" width="20" height="20" x="150" y="75" fill="#000000"/>
  <rect id="melody-track3beat7" width="20" height="20" x="175" y="75" fill="#000000"/>
  <text x="-50" y="115" fill="white">E</text>
  <rect id="melody-track4beat0" width="20" height="20" y="100" fill="#000000"/>
  <rect id="melody-track4beat1" width="20" height="20" x="25" y="100" fill="#000000"/>
  <rect id="melody-track4beat2" width="20" height="20" x="50" y="100" fill="#000000"/>
  <rect id="melody-track4beat3" width="20" height="20" x="75" y="100" fill="#000000"/>
  <rect id="melody-track4beat4" width="20" height="20" x="100" y="100" fill="#000000"/>
  <rect id="melody-track4beat5" width="20" height="20" x="125" y="100" fill="#000000"/>
  <rect id="melody-track4beat6" width="20" height="20" x="150" y="100" fill="#000000"/>
  <rect id="melody-track4beat7" width="20" height="20" x="175" y="100" fill="#000000"/>        
  <text x="-50" y="140" fill="white">F</text>
  <rect id="melody-track5beat0" width="20" height="20" y="125" fill="#000000"/>
  <rect id="melody-track5beat1" width="20" height="20" x="25" y="125" fill="#000000"/>
  <rect id="melody-track5beat2" width="20" height="20" x="50" y="125" fill="#000000"/>
  <rect id="melody-track5beat3" width="20" height="20" x="75" y="125" fill="#000000"/>
  <rect id="melody-track5beat4" width="20" height="20" x="100" y="125" fill="#000000"/>
  <rect id="melody-track5beat5" width="20" height="20" x="125" y="125" fill="#000000"/>
  <rect id="melody-track5beat6" width="20" height="20" x="150" y="125" fill="#000000"/>
  <rect id="melody-track5beat7" width="20" height="20" x="175" y="125" fill="#000000"/>     
  <text x="-50" y="165" fill="white">F#/Gb</text>
  <rect id="melody-track6beat0" width="20" height="20" y="150" fill="#000000"/>
  <rect id="melody-track6beat1" width="20" height="20" x="25" y="150" fill="#000000"/>
  <rect id="melody-track6beat2" width="20" height="20" x="50" y="150" fill="#000000"/>
  <rect id="melody-track6beat3" width="20" height="20" x="75" y="150" fill="#000000"/>
  <rect id="melody-track6beat4" width="20" height="20" x="100" y="150" fill="#000000"/>
  <rect id="melody-track6beat5" width="20" height="20" x="125" y="150" fill="#000000"/>
  <rect id="melody-track6beat6" width="20" height="20" x="150" y="150" fill="#000000"/>
  <rect id="melody-track6beat7" width="20" height="20" x="175" y="150" fill="#000000"/>     
  <text x="-50" y="190" fill="white">G</text>
  <rect id="melody-track7beat0" width="20" height="20" y="175" fill="#000000"/>
  <rect id="melody-track7beat1" width="20" height="20" x="25" y="175" fill="#000000"/>
  <rect id="melody-track7beat2" width="20" height="20" x="50" y="175" fill="#000000"/>
  <rect id="melody-track7beat3" width="20" height="20" x="75" y="175" fill="#000000"/>
  <rect id="melody-track7beat4" width="20" height="20" x="100" y="175" fill="#000000"/>
  <rect id="melody-track7beat5" width="20" height="20" x="125" y="175" fill="#000000"/>
  <rect id="melody-track7beat6" width="20" height="20" x="150" y="175" fill="#000000"/>
  <rect id="melody-track7beat7" width="20" height="20" x="175" y="175" fill="#000000"/>  
  <text x="-50" y="215" fill="white">G#/Ab</text>
  <rect id="melody-track8beat0" width="20" height="20" y="200" fill="#000000"/>
  <rect id="melody-track8beat1" width="20" height="20" x="25" y="200" fill="#000000"/>
  <rect id="melody-track8beat2" width="20" height="20" x="50" y="200" fill="#000000"/>
  <rect id="melody-track8beat3" width="20" height="20" x="75" y="200" fill="#000000"/>
  <rect id="melody-track8beat4" width="20" height="20" x="100" y="200" fill="#000000"/>
  <rect id="melody-track8beat5" width="20" height="20" x="125" y="200" fill="#000000"/>
  <rect id="melody-track8beat6" width="20" height="20" x="150" y="200" fill="#000000"/>
  <rect id="melody-track8beat7" width="20" height="20" x="175" y="200" fill="#000000"/> 
  <text x="-50" y="240" fill="white">A</text>
  <rect id="melody-track9beat0" width="20" height="20" y="225" fill="#000000"/>
  <rect id="melody-track9beat1" width="20" height="20" x="25" y="225" fill="#000000"/>
  <rect id="melody-track9beat2" width="20" height="20" x="50" y="225" fill="#000000"/>
  <rect id="melody-track9beat3" width="20" height="20" x="75" y="225" fill="#000000"/>
  <rect id="melody-track9beat4" width="20" height="20" x="100" y="225" fill="#000000"/>
  <rect id="melody-track9beat5" width="20" height="20" x="125" y="225" fill="#000000"/>
  <rect id="melody-track9beat6" width="20" height="20" x="150" y="225" fill="#000000"/>
  <rect id="melody-track9beat7" width="20" height="20" x="175" y="225" fill="#000000"/>    
  <text x="-50" y="265" fill="white">A#/Bb</text>
  <rect id="melody-track10beat0" width="20" height="20" y="250" fill="#000000"/>
  <rect id="melody-track10beat1" width="20" height="20" x="25" y="250" fill="#000000"/>
  <rect id="melody-track10beat2" width="20" height="20" x="50" y="250" fill="#000000"/>
  <rect id="melody-track10beat3" width="20" height="20" x="75" y="250" fill="#000000"/>
  <rect id="melody-track10beat4" width="20" height="20" x="100" y="250" fill="#000000"/>
  <rect id="melody-track10beat5" width="20" height="20" x="125" y="250" fill="#000000"/>
  <rect id="melody-track10beat6" width="20" height="20" x="150" y="250" fill="#000000"/>
  <rect id="melody-track10beat7" width="20" height="20" x="175" y="250" fill="#000000"/>       
  <text x="-50" y="290" fill="white">B</text>
  <rect id="melody-track11beat0" width="20" height="20" y="275" fill="#000000"/>
  <rect id="melody-track11beat1" width="20" height="20" x="25" y="275" fill="#000000"/>
  <rect id="melody-track11beat2" width="20" height="20" x="50" y="275" fill="#000000"/>
  <rect id="melody-track11beat3" width="20" height="20" x="75" y="275" fill="#000000"/>
  <rect id="melody-track11beat4" width="20" height="20" x="100" y="275" fill="#000000"/>
  <rect id="melody-track11beat5" width="20" height="20" x="125" y="275" fill="#000000"/>
  <rect id="melody-track11beat6" width="20" height="20" x="150" y="275" fill="#000000"/>
  <rect id="melody-track11beat7" width="20" height="20" x="175" y="275" fill="#000000"/>            
</svg>
`;

      this.boardElement = pxsim.svg.parseString(BOARD_SVG);
      pxsim.svg.hydrate(this.boardElement, {
        'height': MelodySequencer.imageHeight,
        'width': MelodySequencer.imageWidth,
        'padding': '2px'
      })

      this.gridElement_ = this.boardElement.getElementById("grid") as SVGGElement;

      this.allBeats_ = {};
      for (let i = 0; i < MelodySequencer.NUM_TRACKS; i++){
          let trackname = "track" + i;
          this.allBeats_[trackname] = [];
          for (let j = 0; j < MelodySequencer.NUM_BEATS; j++){
              let beatname = "beat" + j;
              let beatbox  = this.boardElement.getElementById("melody-" + trackname + beatname) as SVGElement;
              if (this.isCurrentlyEditable() && !this.isInFlyout()){
                  pxsim.svg.addClass(beatbox, trackname);
                  beatbox.setAttribute("active", "false");
                  pxsim.svg.onClick(beatbox, ev => this.onBoxClicked(ev, beatbox, i));
              }
              this.allBeats_[trackname].push(beatbox);
          }
      }

      this.fieldGroup_.appendChild(this.boardElement);
    }

    private isInFlyout() {
        return (this.sourceBlock_.workspace.getParentSvg() as SVGElement).className.baseVal == "blocklyFlyout";
    }

    render_() {
      if (!this.visible_) {
        this.size_.width = 0;
        return;
      }

      if (!this.allBeats_) this.initGrid();

      for (var track in this.allBeats_){
        let trackbeats = this.allBeats_[track];
        for (let b = 0; b < trackbeats.length; b++){
            const beatbox = trackbeats[b];
            pxsim.svg.fill(beatbox, "black");
        }
      }
      this.size_.height = Number(MelodySequencer.imageHeight) + 120;
      this.size_.width = Number(MelodySequencer.imageWidth);
    }

    isActive(beatBox: SVGElement) : boolean {
        if (beatBox.getAttribute("active") == "true") return true;
        return false;
    }

    onBoxClicked(e: Event, beatBox: SVGElement, id: number) {
      if (Blockly.utils.isRightButton(e)) return;
      let isActive = beatBox.getAttribute("active");
      if (isActive == "true") {
          beatBox.setAttribute("active", "false");
          pxsim.svg.fill(beatBox, 'black');
      } else {
          beatBox.setAttribute("active", "true");
          pxsim.svg.fill(beatBox, '#00ffff');
      }
      if (this.sourceBlock_ && this.sourceBlock_.workspace) this.sourceBlock_.workspace.getAudioManager().play('click');      
    }

    getValue() {
      return this.getValueString() || this.emptySequenceString();
    }

    emptySequenceString(): string {
        let sequence = {} as pxsim.Map<number[]>;
        for (let i = 0; i < MelodySequencer.NUM_TRACKS; i++){
            let trackname = "track" + i;
            sequence[trackname] = [];
            for (let j = 0; j < MelodySequencer.NUM_BEATS; j++){
                sequence[trackname].push(0);
            }
        }
        return '`' + JSON.stringify(sequence) + '`';
    }

    getValueString(): string {
      let sequence = {} as pxsim.Map<number[]>;
      for (var track in this.allBeats_){
        sequence[track] = [];
        let trackbeats = this.allBeats_[track];
        for (let b = 0; b < trackbeats.length; b++){
            let beatName = "beat" + b;
            let svgName = "melody-" + track + beatName;
            let svgEl = this.boardElement.getElementById(svgName) as SVGGElement;
            let active = this.isActive(svgEl);
            if (active) sequence[track].push(1);
            else        sequence[track].push(0);
        }
      }
      return '`' + JSON.stringify(sequence) + '`';
    }

    getValueArray(): string {
        return '';
    }

  }

}