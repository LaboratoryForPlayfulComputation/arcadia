/// <reference path="../node_modules/pxt-core/localtypings/blockly.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

namespace pxt.editor {

  export class DrumSequencer extends Blockly.Field implements Blockly.FieldCustom {
    public isFieldCustom_ = true;

    private params : any;

    private boardElement : SVGSVGElement;
    private gridElement_ : SVGGElement;
    private allBeats_    : pxsim.Map<SVGElement[]>;

    static NUM_BEATS   = 8;
    static NUM_TRACKS  = 5;
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
<svg xmlns="http://www.w3.org/2000/svg" id="drum-sequencer" viewBox="0 -20 180.09375 179.22874">
  <text x="-50" y="15" fill="white">Kick</text>
  <rect id="track0beat0" width="20" height="20" fill="#000000"/>
  <rect id="track0beat1" width="20" height="20" x="25" fill="#000000"/>
  <rect id="track0beat2" width="20" height="20" x="50" fill="#000000"/>
  <rect id="track0beat3" width="20" height="20" x="75" fill="#000000"/>
  <rect id="track0beat4" width="20" height="20" x="100" fill="#000000"/>
  <rect id="track0beat5" width="20" height="20" x="125" fill="#000000"/>
  <rect id="track0beat6" width="20" height="20" x="150" fill="#000000"/>
  <rect id="track0beat7" width="20" height="20" x="175" fill="#000000"/>
  <text x="-50" y="40" fill="white">Snare</text>
  <rect id="track1beat0" width="20" height="20" y="25" fill="#000000"/>
  <rect id="track1beat1" width="20" height="20" x="25" y="25" fill="#000000"/>
  <rect id="track1beat2" width="20" height="20" x="50" y="25" fill="#000000"/>
  <rect id="track1beat3" width="20" height="20" x="75" y="25" fill="#000000"/>
  <rect id="track1beat4" width="20" height="20" x="100" y="25" fill="#000000"/>
  <rect id="track1beat5" width="20" height="20" x="125" y="25" fill="#000000"/>
  <rect id="track1beat6" width="20" height="20" x="150" y="25" fill="#000000"/>
  <rect id="track1beat7" width="20" height="20" x="175" y="25" fill="#000000"/>
  <text x="-50" y="65" fill="white">HiHat</text>
  <rect id="track2beat0" width="20" height="20" y="50" fill="#000000"/>
  <rect id="track2beat1" width="20" height="20" y="50" x="25" fill="#000000"/>
  <rect id="track2beat2" width="20" height="20" y="50" x="50" fill="#000000"/>
  <rect id="track2beat3" width="20" height="20" y="50" x="75" fill="#000000"/>
  <rect id="track2beat4" width="20" height="20" y="50" x="100" fill="#000000"/>
  <rect id="track2beat5" width="20" height="20" y="50" x="125" fill="#000000"/>
  <rect id="track2beat6" width="20" height="20" y="50" x="150" fill="#000000"/>
  <rect id="track2beat7" width="20" height="20" y="50" x="175" fill="#000000"/>
  <text x="-50" y="90" fill="white">Click</text>
  <rect id="track3beat0" width="20" height="20" y="75" fill="#000000"/>
  <rect id="track3beat1" width="20" height="20" x="25" y="75" fill="#000000"/>
  <rect id="track3beat2" width="20" height="20" x="50" y="75" fill="#000000"/>
  <rect id="track3beat3" width="20" height="20" x="75" y="75" fill="#000000"/>
  <rect id="track3beat4" width="20" height="20" x="100" y="75" fill="#000000"/>
  <rect id="track3beat5" width="20" height="20" x="125" y="75" fill="#000000"/>
  <rect id="track3beat6" width="20" height="20" x="150" y="75" fill="#000000"/>
  <rect id="track3beat7" width="20" height="20" x="175" y="75" fill="#000000"/>
  <text x="-50" y="115" fill="white">Splat</text>
  <rect id="track4beat0" width="20" height="20" y="100" fill="#000000"/>
  <rect id="track4beat1" width="20" height="20" x="25" y="100" fill="#000000"/>
  <rect id="track4beat2" width="20" height="20" x="50" y="100" fill="#000000"/>
  <rect id="track4beat3" width="20" height="20" x="75" y="100" fill="#000000"/>
  <rect id="track4beat4" width="20" height="20" x="100" y="100" fill="#000000"/>
  <rect id="track4beat5" width="20" height="20" x="125" y="100" fill="#000000"/>
  <rect id="track4beat6" width="20" height="20" x="150" y="100" fill="#000000"/>
  <rect id="track4beat7" width="20" height="20" x="175" y="100" fill="#000000"/>        
</svg>
`;

      this.boardElement = pxsim.svg.parseString(BOARD_SVG);
      pxsim.svg.hydrate(this.boardElement, {
        'height': DrumSequencer.imageHeight,
        'width': DrumSequencer.imageWidth,
        'padding': '2px'
      })

      this.gridElement_ = this.boardElement.getElementById("grid") as SVGGElement;

      this.allBeats_ = {};
      for (let i = 0; i < DrumSequencer.NUM_TRACKS; i++){
          let trackname = "track" + i;
          this.allBeats_[trackname] = [];
          for (let j = 0; j < DrumSequencer.NUM_BEATS; j++){
              let beatname = "beat" + j;
              let beatbox = this.boardElement.getElementById(trackname + beatname) as SVGElement;
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
      this.size_.height = Number(DrumSequencer.imageHeight);
      this.size_.width = Number(DrumSequencer.imageWidth);
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
        for (let i = 0; i < DrumSequencer.NUM_TRACKS; i++){
            let trackname = 'track' + i;
            sequence[trackname] = [];
            for (let j = 0; j < DrumSequencer.NUM_BEATS; j++){
                sequence[trackname].push(0);
            }
        }
        return '`' + JSON.stringify(sequence) + '`';
    }

    getValueString(): string {
      let sequence = {} as pxsim.Map<number[]>;
      for (var track in this.allBeats_){
        sequence[track] = [];
        let trackbeats  = this.allBeats_[track];
        for (let b = 0; b < trackbeats.length; b++){
            let beatName = 'beat' + b;
            let svgName = track + beatName;
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