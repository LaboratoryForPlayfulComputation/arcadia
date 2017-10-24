var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../node_modules/pxt-core/localtypings/blockly.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
var pxt;
(function (pxt) {
    var editor;
    (function (editor) {
        var DrumSequencer = (function (_super) {
            __extends(DrumSequencer, _super);
            function DrumSequencer(text, params, validator) {
                _super.call(this, text, validator);
                this.isFieldCustom_ = true;
                this.params = params;
            }
            /**
             * Show the inline free-text editor on top of the text.
             * @private
             */
            DrumSequencer.prototype.showEditor_ = function () {
            };
            DrumSequencer.prototype.initGrid = function () {
                var _this = this;
                var BOARD_SVG = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" id=\"drum-sequencer\" viewBox=\"0 -20 180.09375 179.22874\">\n  <text x=\"-50\" y=\"15\" fill=\"white\">Kick</text>\n  <rect id=\"track0beat0\" width=\"20\" height=\"20\" fill=\"#000000\"/>\n  <rect id=\"track0beat1\" width=\"20\" height=\"20\" x=\"25\" fill=\"#000000\"/>\n  <rect id=\"track0beat2\" width=\"20\" height=\"20\" x=\"50\" fill=\"#000000\"/>\n  <rect id=\"track0beat3\" width=\"20\" height=\"20\" x=\"75\" fill=\"#000000\"/>\n  <rect id=\"track0beat4\" width=\"20\" height=\"20\" x=\"100\" fill=\"#000000\"/>\n  <rect id=\"track0beat5\" width=\"20\" height=\"20\" x=\"125\" fill=\"#000000\"/>\n  <rect id=\"track0beat6\" width=\"20\" height=\"20\" x=\"150\" fill=\"#000000\"/>\n  <rect id=\"track0beat7\" width=\"20\" height=\"20\" x=\"175\" fill=\"#000000\"/>\n  <text x=\"-50\" y=\"40\" fill=\"white\">Snare</text>\n  <rect id=\"track1beat0\" width=\"20\" height=\"20\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"track1beat1\" width=\"20\" height=\"20\" x=\"25\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"track1beat2\" width=\"20\" height=\"20\" x=\"50\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"track1beat3\" width=\"20\" height=\"20\" x=\"75\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"track1beat4\" width=\"20\" height=\"20\" x=\"100\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"track1beat5\" width=\"20\" height=\"20\" x=\"125\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"track1beat6\" width=\"20\" height=\"20\" x=\"150\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"track1beat7\" width=\"20\" height=\"20\" x=\"175\" y=\"25\" fill=\"#000000\"/>\n  <text x=\"-50\" y=\"65\" fill=\"white\">HiHat</text>\n  <rect id=\"track2beat0\" width=\"20\" height=\"20\" y=\"50\" fill=\"#000000\"/>\n  <rect id=\"track2beat1\" width=\"20\" height=\"20\" y=\"50\" x=\"25\" fill=\"#000000\"/>\n  <rect id=\"track2beat2\" width=\"20\" height=\"20\" y=\"50\" x=\"50\" fill=\"#000000\"/>\n  <rect id=\"track2beat3\" width=\"20\" height=\"20\" y=\"50\" x=\"75\" fill=\"#000000\"/>\n  <rect id=\"track2beat4\" width=\"20\" height=\"20\" y=\"50\" x=\"100\" fill=\"#000000\"/>\n  <rect id=\"track2beat5\" width=\"20\" height=\"20\" y=\"50\" x=\"125\" fill=\"#000000\"/>\n  <rect id=\"track2beat6\" width=\"20\" height=\"20\" y=\"50\" x=\"150\" fill=\"#000000\"/>\n  <rect id=\"track2beat7\" width=\"20\" height=\"20\" y=\"50\" x=\"175\" fill=\"#000000\"/>\n  <text x=\"-50\" y=\"90\" fill=\"white\">Click</text>\n  <rect id=\"track3beat0\" width=\"20\" height=\"20\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"track3beat1\" width=\"20\" height=\"20\" x=\"25\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"track3beat2\" width=\"20\" height=\"20\" x=\"50\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"track3beat3\" width=\"20\" height=\"20\" x=\"75\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"track3beat4\" width=\"20\" height=\"20\" x=\"100\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"track3beat5\" width=\"20\" height=\"20\" x=\"125\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"track3beat6\" width=\"20\" height=\"20\" x=\"150\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"track3beat7\" width=\"20\" height=\"20\" x=\"175\" y=\"75\" fill=\"#000000\"/>\n  <text x=\"-50\" y=\"115\" fill=\"white\">Splat</text>\n  <rect id=\"track4beat0\" width=\"20\" height=\"20\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"track4beat1\" width=\"20\" height=\"20\" x=\"25\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"track4beat2\" width=\"20\" height=\"20\" x=\"50\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"track4beat3\" width=\"20\" height=\"20\" x=\"75\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"track4beat4\" width=\"20\" height=\"20\" x=\"100\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"track4beat5\" width=\"20\" height=\"20\" x=\"125\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"track4beat6\" width=\"20\" height=\"20\" x=\"150\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"track4beat7\" width=\"20\" height=\"20\" x=\"175\" y=\"100\" fill=\"#000000\"/>        \n</svg>\n";
                this.boardElement = pxsim.svg.parseString(BOARD_SVG);
                pxsim.svg.hydrate(this.boardElement, {
                    'height': DrumSequencer.imageHeight,
                    'width': DrumSequencer.imageWidth,
                    'padding': '2px'
                });
                this.gridElement_ = this.boardElement.getElementById("grid");
                this.allBeats_ = {};
                var _loop_1 = function(i) {
                    var trackname = "track" + i;
                    this_1.allBeats_[trackname] = [];
                    var _loop_2 = function(j) {
                        var beatname = "beat" + j;
                        var beatbox = this_1.boardElement.getElementById(trackname + beatname);
                        if (this_1.isCurrentlyEditable() && !this_1.isInFlyout()) {
                            pxsim.svg.addClass(beatbox, trackname);
                            beatbox.setAttribute("active", "false");
                            pxsim.svg.onClick(beatbox, function (ev) { return _this.onBoxClicked(ev, beatbox, i); });
                        }
                        this_1.allBeats_[trackname].push(beatbox);
                    };
                    for (var j = 0; j < DrumSequencer.NUM_BEATS; j++) {
                        _loop_2(j);
                    }
                };
                var this_1 = this;
                for (var i = 0; i < DrumSequencer.NUM_TRACKS; i++) {
                    _loop_1(i);
                }
                this.fieldGroup_.appendChild(this.boardElement);
            };
            DrumSequencer.prototype.isInFlyout = function () {
                return this.sourceBlock_.workspace.getParentSvg().className.baseVal == "blocklyFlyout";
            };
            DrumSequencer.prototype.render_ = function () {
                if (!this.visible_) {
                    this.size_.width = 0;
                    return;
                }
                if (!this.allBeats_)
                    this.initGrid();
                for (var track in this.allBeats_) {
                    var trackbeats = this.allBeats_[track];
                    for (var b = 0; b < trackbeats.length; b++) {
                        var beatbox = trackbeats[b];
                        pxsim.svg.fill(beatbox, "black");
                    }
                }
                this.size_.height = Number(DrumSequencer.imageHeight);
                this.size_.width = Number(DrumSequencer.imageWidth);
            };
            DrumSequencer.prototype.isActive = function (beatBox) {
                if (beatBox.getAttribute("active") == "true")
                    return true;
                return false;
            };
            DrumSequencer.prototype.onBoxClicked = function (e, beatBox, id) {
                if (Blockly.utils.isRightButton(e))
                    return;
                var isActive = beatBox.getAttribute("active");
                if (isActive == "true") {
                    beatBox.setAttribute("active", "false");
                    pxsim.svg.fill(beatBox, 'black');
                }
                else {
                    beatBox.setAttribute("active", "true");
                    pxsim.svg.fill(beatBox, '#00ffff');
                }
                if (this.sourceBlock_ && this.sourceBlock_.workspace)
                    this.sourceBlock_.workspace.getAudioManager().play('click');
            };
            DrumSequencer.prototype.getValue = function () {
                return this.getValueString() || this.emptySequenceString();
            };
            DrumSequencer.prototype.emptySequenceString = function () {
                var sequence = {};
                for (var i = 0; i < DrumSequencer.NUM_TRACKS; i++) {
                    var trackname = 'track' + i;
                    sequence[trackname] = [];
                    for (var j = 0; j < DrumSequencer.NUM_BEATS; j++) {
                        sequence[trackname].push(0);
                    }
                }
                return '`' + JSON.stringify(sequence) + '`';
            };
            DrumSequencer.prototype.getValueString = function () {
                var sequence = {};
                for (var track in this.allBeats_) {
                    sequence[track] = [];
                    var trackbeats = this.allBeats_[track];
                    for (var b = 0; b < trackbeats.length; b++) {
                        var beatName = 'beat' + b;
                        var svgName = track + beatName;
                        var svgEl = this.boardElement.getElementById(svgName);
                        var active = this.isActive(svgEl);
                        if (active)
                            sequence[track].push(1);
                        else
                            sequence[track].push(0);
                    }
                }
                return '`' + JSON.stringify(sequence) + '`';
            };
            DrumSequencer.prototype.getValueArray = function () {
                return '';
            };
            DrumSequencer.NUM_BEATS = 8;
            DrumSequencer.NUM_TRACKS = 5;
            DrumSequencer.imageWidth = 225;
            DrumSequencer.imageHeight = 150;
            return DrumSequencer;
        }(Blockly.Field));
        editor.DrumSequencer = DrumSequencer;
    })(editor = pxt.editor || (pxt.editor = {}));
})(pxt || (pxt = {}));
/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />
var pxt;
(function (pxt) {
    var editor;
    (function (editor) {
        editor.initExtensionsAsync = function (opts) {
            pxt.debug("loading pxt-ar target extensions...");
            var modelRx = /\.(obj|mtl|stl|dae)$/i;
            var res = {
                fieldEditors: [{
                        selector: "drums",
                        editor: editor.DrumSequencer
                    },
                    {
                        selector: "melody",
                        editor: editor.MelodySequencer
                    }],
                resourceImporters: [{
                        id: "model",
                        canImport: function (file) { return modelRx.test(file.name); },
                        importAsync: function (project, file) {
                            var t = modelRx.exec(file.name)[1].toLowerCase();
                            var n = ts.pxtc.escapeIdentifier(file.name.replace(modelRx, ""));
                            return ts.pxtc.Util.fileReadAsTextAsync(file)
                                .then(function (contents) { return project.updateFileAsync(file.name + ".ts", "\n/**\n * Custom 3D models for markers\n */\n//% weight=88\nnamespace models {\n    /*\n    * Sets a custom 3D model on the marker based on " + n + "\n    */\n    //% blockId=set_model_" + n + " block=\"%marker=marker_block|set model " + n + "\"\n    export function set" + ts.pxtc.Util.capitalize(n) + "(marker: number) {\n        design.setModel(marker, ModelType." + t.toUpperCase() + ", " + JSON.stringify(contents) + ")\n    }\n}\n", false); });
                        }
                    }]
            };
            return Promise.resolve(res);
        };
    })(editor = pxt.editor || (pxt.editor = {}));
})(pxt || (pxt = {}));
/// <reference path="../node_modules/pxt-core/localtypings/blockly.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
var pxt;
(function (pxt) {
    var editor;
    (function (editor) {
        var MelodySequencer = (function (_super) {
            __extends(MelodySequencer, _super);
            function MelodySequencer(text, params, validator) {
                _super.call(this, text, validator);
                this.isFieldCustom_ = true;
                this.params = params;
            }
            /**
             * Show the inline free-text editor on top of the text.
             * @private
             */
            MelodySequencer.prototype.showEditor_ = function () {
            };
            MelodySequencer.prototype.initGrid = function () {
                var _this = this;
                var BOARD_SVG = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" id=\"field-neopixels\" viewBox=\"0 0 180.09375 179.22874\">\n  <text x=\"-50\" y=\"15\" fill=\"white\">C</text>\n  <rect id=\"melody-track0beat0\" width=\"20\" height=\"20\" fill=\"#000000\"/>\n  <rect id=\"melody-track0beat1\" width=\"20\" height=\"20\" x=\"25\" fill=\"#000000\"/>\n  <rect id=\"melody-track0beat2\" width=\"20\" height=\"20\" x=\"50\" fill=\"#000000\"/>\n  <rect id=\"melody-track0beat3\" width=\"20\" height=\"20\" x=\"75\" fill=\"#000000\"/>\n  <rect id=\"melody-track0beat4\" width=\"20\" height=\"20\" x=\"100\" fill=\"#000000\"/>\n  <rect id=\"melody-track0beat5\" width=\"20\" height=\"20\" x=\"125\" fill=\"#000000\"/>\n  <rect id=\"melody-track0beat6\" width=\"20\" height=\"20\" x=\"150\" fill=\"#000000\"/>\n  <rect id=\"melody-track0beat7\" width=\"20\" height=\"20\" x=\"175\" fill=\"#000000\"/>\n  <text x=\"-50\" y=\"40\" fill=\"white\">C#/Db</text>\n  <rect id=\"melody-track1beat0\" width=\"20\" height=\"20\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"melody-track1beat1\" width=\"20\" height=\"20\" x=\"25\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"melody-track1beat2\" width=\"20\" height=\"20\" x=\"50\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"melody-track1beat3\" width=\"20\" height=\"20\" x=\"75\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"melody-track1beat4\" width=\"20\" height=\"20\" x=\"100\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"melody-track1beat5\" width=\"20\" height=\"20\" x=\"125\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"melody-track1beat6\" width=\"20\" height=\"20\" x=\"150\" y=\"25\" fill=\"#000000\"/>\n  <rect id=\"melody-track1beat7\" width=\"20\" height=\"20\" x=\"175\" y=\"25\" fill=\"#000000\"/>\n  <text x=\"-50\" y=\"65\" fill=\"white\">D</text>\n  <rect id=\"melody-track2beat0\" width=\"20\" height=\"20\" y=\"50\" fill=\"#000000\"/>\n  <rect id=\"melody-track2beat1\" width=\"20\" height=\"20\" y=\"50\" x=\"25\" fill=\"#000000\"/>\n  <rect id=\"melody-track2beat2\" width=\"20\" height=\"20\" y=\"50\" x=\"50\" fill=\"#000000\"/>\n  <rect id=\"melody-track2beat3\" width=\"20\" height=\"20\" y=\"50\" x=\"75\" fill=\"#000000\"/>\n  <rect id=\"melody-track2beat4\" width=\"20\" height=\"20\" y=\"50\" x=\"100\" fill=\"#000000\"/>\n  <rect id=\"melody-track2beat5\" width=\"20\" height=\"20\" y=\"50\" x=\"125\" fill=\"#000000\"/>\n  <rect id=\"melody-track2beat6\" width=\"20\" height=\"20\" y=\"50\" x=\"150\" fill=\"#000000\"/>\n  <rect id=\"melody-track2beat7\" width=\"20\" height=\"20\" y=\"50\" x=\"175\" fill=\"#000000\"/>\n  <text x=\"-50\" y=\"90\" fill=\"white\">D#/Eb</text>\n  <rect id=\"melody-track3beat0\" width=\"20\" height=\"20\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"melody-track3beat1\" width=\"20\" height=\"20\" x=\"25\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"melody-track3beat2\" width=\"20\" height=\"20\" x=\"50\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"melody-track3beat3\" width=\"20\" height=\"20\" x=\"75\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"melody-track3beat4\" width=\"20\" height=\"20\" x=\"100\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"melody-track3beat5\" width=\"20\" height=\"20\" x=\"125\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"melody-track3beat6\" width=\"20\" height=\"20\" x=\"150\" y=\"75\" fill=\"#000000\"/>\n  <rect id=\"melody-track3beat7\" width=\"20\" height=\"20\" x=\"175\" y=\"75\" fill=\"#000000\"/>\n  <text x=\"-50\" y=\"115\" fill=\"white\">E</text>\n  <rect id=\"melody-track4beat0\" width=\"20\" height=\"20\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"melody-track4beat1\" width=\"20\" height=\"20\" x=\"25\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"melody-track4beat2\" width=\"20\" height=\"20\" x=\"50\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"melody-track4beat3\" width=\"20\" height=\"20\" x=\"75\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"melody-track4beat4\" width=\"20\" height=\"20\" x=\"100\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"melody-track4beat5\" width=\"20\" height=\"20\" x=\"125\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"melody-track4beat6\" width=\"20\" height=\"20\" x=\"150\" y=\"100\" fill=\"#000000\"/>\n  <rect id=\"melody-track4beat7\" width=\"20\" height=\"20\" x=\"175\" y=\"100\" fill=\"#000000\"/>        \n  <text x=\"-50\" y=\"140\" fill=\"white\">F</text>\n  <rect id=\"melody-track5beat0\" width=\"20\" height=\"20\" y=\"125\" fill=\"#000000\"/>\n  <rect id=\"melody-track5beat1\" width=\"20\" height=\"20\" x=\"25\" y=\"125\" fill=\"#000000\"/>\n  <rect id=\"melody-track5beat2\" width=\"20\" height=\"20\" x=\"50\" y=\"125\" fill=\"#000000\"/>\n  <rect id=\"melody-track5beat3\" width=\"20\" height=\"20\" x=\"75\" y=\"125\" fill=\"#000000\"/>\n  <rect id=\"melody-track5beat4\" width=\"20\" height=\"20\" x=\"100\" y=\"125\" fill=\"#000000\"/>\n  <rect id=\"melody-track5beat5\" width=\"20\" height=\"20\" x=\"125\" y=\"125\" fill=\"#000000\"/>\n  <rect id=\"melody-track5beat6\" width=\"20\" height=\"20\" x=\"150\" y=\"125\" fill=\"#000000\"/>\n  <rect id=\"melody-track5beat7\" width=\"20\" height=\"20\" x=\"175\" y=\"125\" fill=\"#000000\"/>     \n  <text x=\"-50\" y=\"165\" fill=\"white\">F#/Gb</text>\n  <rect id=\"melody-track6beat0\" width=\"20\" height=\"20\" y=\"150\" fill=\"#000000\"/>\n  <rect id=\"melody-track6beat1\" width=\"20\" height=\"20\" x=\"25\" y=\"150\" fill=\"#000000\"/>\n  <rect id=\"melody-track6beat2\" width=\"20\" height=\"20\" x=\"50\" y=\"150\" fill=\"#000000\"/>\n  <rect id=\"melody-track6beat3\" width=\"20\" height=\"20\" x=\"75\" y=\"150\" fill=\"#000000\"/>\n  <rect id=\"melody-track6beat4\" width=\"20\" height=\"20\" x=\"100\" y=\"150\" fill=\"#000000\"/>\n  <rect id=\"melody-track6beat5\" width=\"20\" height=\"20\" x=\"125\" y=\"150\" fill=\"#000000\"/>\n  <rect id=\"melody-track6beat6\" width=\"20\" height=\"20\" x=\"150\" y=\"150\" fill=\"#000000\"/>\n  <rect id=\"melody-track6beat7\" width=\"20\" height=\"20\" x=\"175\" y=\"150\" fill=\"#000000\"/>     \n  <text x=\"-50\" y=\"190\" fill=\"white\">G</text>\n  <rect id=\"melody-track7beat0\" width=\"20\" height=\"20\" y=\"175\" fill=\"#000000\"/>\n  <rect id=\"melody-track7beat1\" width=\"20\" height=\"20\" x=\"25\" y=\"175\" fill=\"#000000\"/>\n  <rect id=\"melody-track7beat2\" width=\"20\" height=\"20\" x=\"50\" y=\"175\" fill=\"#000000\"/>\n  <rect id=\"melody-track7beat3\" width=\"20\" height=\"20\" x=\"75\" y=\"175\" fill=\"#000000\"/>\n  <rect id=\"melody-track7beat4\" width=\"20\" height=\"20\" x=\"100\" y=\"175\" fill=\"#000000\"/>\n  <rect id=\"melody-track7beat5\" width=\"20\" height=\"20\" x=\"125\" y=\"175\" fill=\"#000000\"/>\n  <rect id=\"melody-track7beat6\" width=\"20\" height=\"20\" x=\"150\" y=\"175\" fill=\"#000000\"/>\n  <rect id=\"melody-track7beat7\" width=\"20\" height=\"20\" x=\"175\" y=\"175\" fill=\"#000000\"/>  \n  <text x=\"-50\" y=\"215\" fill=\"white\">G#/Ab</text>\n  <rect id=\"melody-track8beat0\" width=\"20\" height=\"20\" y=\"200\" fill=\"#000000\"/>\n  <rect id=\"melody-track8beat1\" width=\"20\" height=\"20\" x=\"25\" y=\"200\" fill=\"#000000\"/>\n  <rect id=\"melody-track8beat2\" width=\"20\" height=\"20\" x=\"50\" y=\"200\" fill=\"#000000\"/>\n  <rect id=\"melody-track8beat3\" width=\"20\" height=\"20\" x=\"75\" y=\"200\" fill=\"#000000\"/>\n  <rect id=\"melody-track8beat4\" width=\"20\" height=\"20\" x=\"100\" y=\"200\" fill=\"#000000\"/>\n  <rect id=\"melody-track8beat5\" width=\"20\" height=\"20\" x=\"125\" y=\"200\" fill=\"#000000\"/>\n  <rect id=\"melody-track8beat6\" width=\"20\" height=\"20\" x=\"150\" y=\"200\" fill=\"#000000\"/>\n  <rect id=\"melody-track8beat7\" width=\"20\" height=\"20\" x=\"175\" y=\"200\" fill=\"#000000\"/> \n  <text x=\"-50\" y=\"240\" fill=\"white\">A</text>\n  <rect id=\"melody-track9beat0\" width=\"20\" height=\"20\" y=\"225\" fill=\"#000000\"/>\n  <rect id=\"melody-track9beat1\" width=\"20\" height=\"20\" x=\"25\" y=\"225\" fill=\"#000000\"/>\n  <rect id=\"melody-track9beat2\" width=\"20\" height=\"20\" x=\"50\" y=\"225\" fill=\"#000000\"/>\n  <rect id=\"melody-track9beat3\" width=\"20\" height=\"20\" x=\"75\" y=\"225\" fill=\"#000000\"/>\n  <rect id=\"melody-track9beat4\" width=\"20\" height=\"20\" x=\"100\" y=\"225\" fill=\"#000000\"/>\n  <rect id=\"melody-track9beat5\" width=\"20\" height=\"20\" x=\"125\" y=\"225\" fill=\"#000000\"/>\n  <rect id=\"melody-track9beat6\" width=\"20\" height=\"20\" x=\"150\" y=\"225\" fill=\"#000000\"/>\n  <rect id=\"melody-track9beat7\" width=\"20\" height=\"20\" x=\"175\" y=\"225\" fill=\"#000000\"/>    \n  <text x=\"-50\" y=\"265\" fill=\"white\">A#/Bb</text>\n  <rect id=\"melody-track10beat0\" width=\"20\" height=\"20\" y=\"250\" fill=\"#000000\"/>\n  <rect id=\"melody-track10beat1\" width=\"20\" height=\"20\" x=\"25\" y=\"250\" fill=\"#000000\"/>\n  <rect id=\"melody-track10beat2\" width=\"20\" height=\"20\" x=\"50\" y=\"250\" fill=\"#000000\"/>\n  <rect id=\"melody-track10beat3\" width=\"20\" height=\"20\" x=\"75\" y=\"250\" fill=\"#000000\"/>\n  <rect id=\"melody-track10beat4\" width=\"20\" height=\"20\" x=\"100\" y=\"250\" fill=\"#000000\"/>\n  <rect id=\"melody-track10beat5\" width=\"20\" height=\"20\" x=\"125\" y=\"250\" fill=\"#000000\"/>\n  <rect id=\"melody-track10beat6\" width=\"20\" height=\"20\" x=\"150\" y=\"250\" fill=\"#000000\"/>\n  <rect id=\"melody-track10beat7\" width=\"20\" height=\"20\" x=\"175\" y=\"250\" fill=\"#000000\"/>       \n  <text x=\"-50\" y=\"290\" fill=\"white\">B</text>\n  <rect id=\"melody-track11beat0\" width=\"20\" height=\"20\" y=\"275\" fill=\"#000000\"/>\n  <rect id=\"melody-track11beat1\" width=\"20\" height=\"20\" x=\"25\" y=\"275\" fill=\"#000000\"/>\n  <rect id=\"melody-track11beat2\" width=\"20\" height=\"20\" x=\"50\" y=\"275\" fill=\"#000000\"/>\n  <rect id=\"melody-track11beat3\" width=\"20\" height=\"20\" x=\"75\" y=\"275\" fill=\"#000000\"/>\n  <rect id=\"melody-track11beat4\" width=\"20\" height=\"20\" x=\"100\" y=\"275\" fill=\"#000000\"/>\n  <rect id=\"melody-track11beat5\" width=\"20\" height=\"20\" x=\"125\" y=\"275\" fill=\"#000000\"/>\n  <rect id=\"melody-track11beat6\" width=\"20\" height=\"20\" x=\"150\" y=\"275\" fill=\"#000000\"/>\n  <rect id=\"melody-track11beat7\" width=\"20\" height=\"20\" x=\"175\" y=\"275\" fill=\"#000000\"/>            \n</svg>\n";
                this.boardElement = pxsim.svg.parseString(BOARD_SVG);
                pxsim.svg.hydrate(this.boardElement, {
                    'height': MelodySequencer.imageHeight,
                    'width': MelodySequencer.imageWidth,
                    'padding': '2px'
                });
                this.gridElement_ = this.boardElement.getElementById("grid");
                this.allBeats_ = {};
                var _loop_3 = function(i) {
                    var trackname = "track" + i;
                    this_2.allBeats_[trackname] = [];
                    var _loop_4 = function(j) {
                        var beatname = "beat" + j;
                        var beatbox = this_2.boardElement.getElementById("melody-" + trackname + beatname);
                        if (this_2.isCurrentlyEditable() && !this_2.isInFlyout()) {
                            pxsim.svg.addClass(beatbox, trackname);
                            beatbox.setAttribute("active", "false");
                            pxsim.svg.onClick(beatbox, function (ev) { return _this.onBoxClicked(ev, beatbox, i); });
                        }
                        this_2.allBeats_[trackname].push(beatbox);
                    };
                    for (var j = 0; j < MelodySequencer.NUM_BEATS; j++) {
                        _loop_4(j);
                    }
                };
                var this_2 = this;
                for (var i = 0; i < MelodySequencer.NUM_TRACKS; i++) {
                    _loop_3(i);
                }
                this.fieldGroup_.appendChild(this.boardElement);
            };
            MelodySequencer.prototype.isInFlyout = function () {
                return this.sourceBlock_.workspace.getParentSvg().className.baseVal == "blocklyFlyout";
            };
            MelodySequencer.prototype.render_ = function () {
                if (!this.visible_) {
                    this.size_.width = 0;
                    return;
                }
                if (!this.allBeats_)
                    this.initGrid();
                for (var track in this.allBeats_) {
                    var trackbeats = this.allBeats_[track];
                    for (var b = 0; b < trackbeats.length; b++) {
                        var beatbox = trackbeats[b];
                        pxsim.svg.fill(beatbox, "black");
                    }
                }
                this.size_.height = Number(MelodySequencer.imageHeight) + 120;
                this.size_.width = Number(MelodySequencer.imageWidth);
            };
            MelodySequencer.prototype.isActive = function (beatBox) {
                if (beatBox.getAttribute("active") == "true")
                    return true;
                return false;
            };
            MelodySequencer.prototype.onBoxClicked = function (e, beatBox, id) {
                if (Blockly.utils.isRightButton(e))
                    return;
                var isActive = beatBox.getAttribute("active");
                if (isActive == "true") {
                    beatBox.setAttribute("active", "false");
                    pxsim.svg.fill(beatBox, 'black');
                }
                else {
                    beatBox.setAttribute("active", "true");
                    pxsim.svg.fill(beatBox, '#00ffff');
                }
                if (this.sourceBlock_ && this.sourceBlock_.workspace)
                    this.sourceBlock_.workspace.getAudioManager().play('click');
            };
            MelodySequencer.prototype.getValue = function () {
                return this.getValueString() || this.emptySequenceString();
            };
            MelodySequencer.prototype.emptySequenceString = function () {
                var sequence = {};
                for (var i = 0; i < MelodySequencer.NUM_TRACKS; i++) {
                    var trackname = "track" + i;
                    sequence[trackname] = [];
                    for (var j = 0; j < MelodySequencer.NUM_BEATS; j++) {
                        sequence[trackname].push(0);
                    }
                }
                return '`' + JSON.stringify(sequence) + '`';
            };
            MelodySequencer.prototype.getValueString = function () {
                var sequence = {};
                for (var track in this.allBeats_) {
                    sequence[track] = [];
                    var trackbeats = this.allBeats_[track];
                    for (var b = 0; b < trackbeats.length; b++) {
                        var beatName = "beat" + b;
                        var svgName = "melody-" + track + beatName;
                        var svgEl = this.boardElement.getElementById(svgName);
                        var active = this.isActive(svgEl);
                        if (active)
                            sequence[track].push(1);
                        else
                            sequence[track].push(0);
                    }
                }
                return '`' + JSON.stringify(sequence) + '`';
            };
            MelodySequencer.prototype.getValueArray = function () {
                return '';
            };
            MelodySequencer.NUM_BEATS = 8;
            MelodySequencer.NUM_TRACKS = 12;
            MelodySequencer.imageWidth = 225;
            MelodySequencer.imageHeight = 150;
            return MelodySequencer;
        }(Blockly.Field));
        editor.MelodySequencer = MelodySequencer;
    })(editor = pxt.editor || (pxt.editor = {}));
})(pxt || (pxt = {}));
