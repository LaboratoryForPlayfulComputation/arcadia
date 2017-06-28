/// <reference path="../node_modules/pxt-core/localtypings/blockly.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

namespace pxt.editor {

  export class DrumSequencer extends Blockly.Field implements Blockly.FieldCustom {
    public isFieldCustom_ = true;

    private params: any;

    private boardElement      : SVGSVGElement;
    private gridElement_      : SVGGElement;
    private allBeats_         : pxsim.Map<SVGElement[]>;
    private kickbeats_        : SVGElement[];
    private snarebeats_       : SVGElement[];
    private hihatclosedbeats_ : SVGElement[];
    private hihatopenbeats_   : SVGElement[];
    private cymbalbeats_      : SVGElement[];
    private instruments_      : SVGElement[];

    static NUM_BEATS = 8;
    static imageWidth = 225;
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
  <rect id="kick0" width="20" height="20" fill="#c8c8c8"/>
  <rect id="kick1" width="20" height="20" x="25" fill="#c8c8c8"/>
  <rect id="kick2" width="20" height="20" x="50" fill="#c8c8c8"/>
  <rect id="kick3" width="20" height="20" x="75" fill="#c8c8c8"/>
  <rect id="kick4" width="20" height="20" x="100" fill="#c8c8c8"/>
  <rect id="kick5" width="20" height="20" x="125" fill="#c8c8c8"/>
  <rect id="kick6" width="20" height="20" x="150" fill="#c8c8c8"/>
  <rect id="kick7" width="20" height="20" x="175" fill="#c8c8c8"/>
  <rect id="snare0" width="20" height="20" y="25" fill="#c8c8c8"/>
  <rect id="snare1" width="20" height="20" x="25" y="25" fill="#c8c8c8"/>
  <rect id="snare2" width="20" height="20" x="50" y="25" fill="#c8c8c8"/>
  <rect id="snare3" width="20" height="20" x="75" y="25" fill="#c8c8c8"/>
  <rect id="snare4" width="20" height="20" x="100" y="25" fill="#c8c8c8"/>
  <rect id="snare5" width="20" height="20" x="125" y="25" fill="#c8c8c8"/>
  <rect id="snare6" width="20" height="20" x="150" y="25" fill="#c8c8c8"/>
  <rect id="snare7" width="20" height="20" x="175" y="25" fill="#c8c8c8"/>
  <rect id="hihatclosed0" width="20" height="20" y="50" fill="#c8c8c8"/>
  <rect id="hihatclosed1" width="20" height="20" y="50" x="25" fill="#c8c8c8"/>
  <rect id="hihatclosed2" width="20" height="20" y="50" x="50" fill="#c8c8c8"/>
  <rect id="hihatclosed3" width="20" height="20" y="50" x="75" fill="#c8c8c8"/>
  <rect id="hihatclosed4" width="20" height="20" y="50" x="100" fill="#c8c8c8"/>
  <rect id="hihatclosed5" width="20" height="20" y="50" x="125" fill="#c8c8c8"/>
  <rect id="hihatclosed6" width="20" height="20" y="50" x="150" fill="#c8c8c8"/>
  <rect id="hihatclosed7" width="20" height="20" y="50" x="175" fill="#c8c8c8"/>
  <rect id="hihatopen0" width="20" height="20" y="75" fill="#c8c8c8"/>
  <rect id="hihatopen1" width="20" height="20" x="25" y="75" fill="#c8c8c8"/>
  <rect id="hihatopen2" width="20" height="20" x="50" y="75" fill="#c8c8c8"/>
  <rect id="hihatopen3" width="20" height="20" x="75" y="75" fill="#c8c8c8"/>
  <rect id="hihatopen4" width="20" height="20" x="100" y="75" fill="#c8c8c8"/>
  <rect id="hihatopen5" width="20" height="20" x="125" y="75" fill="#c8c8c8"/>
  <rect id="hihatopen6" width="20" height="20" x="150" y="75" fill="#c8c8c8"/>
  <rect id="hihatopen7" width="20" height="20" x="175" y="75" fill="#c8c8c8"/>
  <rect id="cymbal0" width="20" height="20" y="100" fill="#c8c8c8"/>
  <rect id="cymbal1" width="20" height="20" x="25" y="100" fill="#c8c8c8"/>
  <rect id="cymbal2" width="20" height="20" x="50" y="100" fill="#c8c8c8"/>
  <rect id="cymbal3" width="20" height="20" x="75" y="100" fill="#c8c8c8"/>
  <rect id="cymbal4" width="20" height="20" x="100" y="100" fill="#c8c8c8"/>
  <rect id="cymbal5" width="20" height="20" x="125" y="100" fill="#c8c8c8"/>
  <rect id="cymbal6" width="20" height="20" x="150" y="100" fill="#c8c8c8"/>
  <rect id="cymbal7" width="20" height="20" x="175" y="100" fill="#c8c8c8"/>        
</svg>
`;

      this.boardElement = pxsim.svg.parseString(BOARD_SVG);
      pxsim.svg.hydrate(this.boardElement, {
        'height': DrumSequencer.imageHeight,
        'width': DrumSequencer.imageWidth,
        'padding': '2px'
      })

      this.gridElement_ = this.boardElement.getElementById("grid") as SVGGElement;

      this.allBeats_         = {};
      this.kickbeats_        = [];
      this.snarebeats_       = [];
      this.hihatclosedbeats_ = [];
      this.hihatopenbeats_   = [];
      this.cymbalbeats_      = [];
      for (let i = 0; i < DrumSequencer.NUM_BEATS; i++) {
        let kickBox        = this.boardElement.getElementById("kick" + i) as SVGGElement;
        let snareBox       = this.boardElement.getElementById("snare" + i) as SVGGElement;
        let hihatclosedBox = this.boardElement.getElementById("hihatclosed" + i) as SVGGElement;
        let hihatopenBox   = this.boardElement.getElementById("hihatopen" + i) as SVGGElement;
        let cymbalBox      = this.boardElement.getElementById("cymbal" + i) as SVGGElement;
        if (this.isCurrentlyEditable() && !this.isInFlyout()) {
            pxsim.svg.addClass(kickBox, 'kick');
            pxsim.svg.addClass(snareBox, 'snare');
            pxsim.svg.addClass(hihatclosedBox, 'hihatclosed');
            pxsim.svg.addClass(hihatopenBox, 'hihatopen');
            pxsim.svg.addClass(cymbalBox, 'cymbal');
            kickBox.setAttribute("active", "false");
            snareBox.setAttribute("active", "false");
            hihatclosedBox.setAttribute("active", "false");
            hihatopenBox.setAttribute("active", "false");
            cymbalBox.setAttribute("active", "false");
            pxsim.svg.onClick(kickBox, ev => this.onBoxClicked(ev, kickBox, i));
            pxsim.svg.onClick(snareBox, ev => this.onBoxClicked(ev, snareBox, i));
            pxsim.svg.onClick(hihatclosedBox, ev => this.onBoxClicked(ev, hihatclosedBox, i));
            pxsim.svg.onClick(hihatopenBox, ev => this.onBoxClicked(ev, hihatopenBox, i));
            pxsim.svg.onClick(cymbalBox, ev => this.onBoxClicked(ev, cymbalBox, i));
        }
        this.kickbeats_.push(kickBox);
        this.snarebeats_.push(snareBox);
        this.hihatclosedbeats_.push(hihatclosedBox);
        this.hihatopenbeats_.push(hihatopenBox);
        this.cymbalbeats_.push(cymbalBox);
        this.allBeats_['kick']        = this.kickbeats_;
        this.allBeats_['snare']       = this.snarebeats_;
        this.allBeats_['hihatclosed'] = this.hihatclosedbeats_;
        this.allBeats_['hihatopen']   = this.hihatopenbeats_;
        this.allBeats_['cymbal']      = this.cymbalbeats_;
      }

      this.fieldGroup_.appendChild(this.boardElement);

      // Hide the borderRect since we're not using it.
      (this.borderRect_ as HTMLElement).style.display = 'none';
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

      const colors = this.getValue().replace(/["`']/g, "").split(/\s+/) || [];
      for (let i = 0; i < DrumSequencer.NUM_BEATS; i++) {
          for (var key in this.allBeats_){
              let beatArray = this.allBeats_[key];
              for (let i = 0; i < beatArray.length; i++){
                const beatBox = beatArray[i];
                pxsim.svg.fill(beatBox, 'grey');
                //beatBox.setAttribute("data-color", colors[i] || "0xff");                 
              }
          }
      }
      this.size_.height = Number(DrumSequencer.imageHeight);
      this.size_.width  = Number(DrumSequencer.imageWidth);
    }

    isActive(beatBox: SVGElement) : boolean {
        if (beatBox.getAttribute("active") == "true") return true;
        return false;
    }

    onBoxClicked(e: Event, beatBox: SVGElement, id: number) {
      if (Blockly.utils.isRightButton(e)) return;
      let isActive = beatBox.getAttribute("active");
      console.log(isActive);
      if (isActive == "true") {
          beatBox.setAttribute("active", "false");
          pxsim.svg.fill(beatBox, 'gray');
      } else {
          beatBox.setAttribute("active", "true");
          pxsim.svg.fill(beatBox, '#00ffff');
      }
      if (this.sourceBlock_ && this.sourceBlock_.workspace) this.sourceBlock_.workspace.playAudio('click');      
    }

   getValue() {
      return '';
    }

    getValueArray(): pxsim.Map<[number]> {
      let instruments = ['kick', 'snare', 'hihatclosed'];
      let sequence = {} as pxsim.Map<[number]>;
      for (var instrument in instruments){
        for (let i = 0; i < DrumSequencer.NUM_BEATS; i++){
            let svgName = instrument + i;
            let svgEl = this.boardElement.getElementById(svgName) as SVGGElement;
            let active = this.isActive(svgEl);
            if (active) sequence[instrument].push(1);
            else sequence[instrument].push(0);
        }
      }
      return sequence;
    }

  }

}