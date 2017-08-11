/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

namespace pxt.editor {
    initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug("loading pxt-ar target extensions...");
        const modelRx = /\.(obj|mtl|stl|dae)$/i;
        const res: pxt.editor.ExtensionResult = {
            fieldEditors: [{
                selector: "drums",
                editor: DrumSequencer
            },
            {
                selector: "melody",
                editor: MelodySequencer
            }],
            resourceImporters: [{
                id: "model",
                canImport: file => modelRx.test(file.name),
                importAsync: (project, file) => {
                    const t: string = modelRx.exec(file.name)[1].toLowerCase();
                    const n: string = ts.pxtc.escapeIdentifier(file.name.replace(modelRx, ""));
                    return ts.pxtc.Util.fileReadAsTextAsync(file)
                        .then(contents => project.updateFileAsync(file.name + ".ts",
                            `
/**
 * Custom 3D models for markers
 */
//% weight=88
namespace models {
    /*
    * Sets a custom 3D model on the marker based on ${n}
    */
    //% blockId=set_model_${n} block="%marker=marker_block|set model ${n}"
    export function set${ts.pxtc.Util.capitalize(n)}(marker: number) {
        design.setModel(marker, ModelType.${t.toUpperCase()}, ${JSON.stringify(contents)})
    }
}
`, false));
                }
            }]
        };
        
        let flipButton = document.createElement("button");
        flipButton.innerHTML = "&#9789;&#9790;";
        let editorTools = document.getElementById("simulators");
        editorTools.appendChild(flipButton);

        document.addEventListener("keydown", keyDownTextField, true);
        function keyDownTextField(e: any) {
            let keyCode = e.keyCode;
            let sim = document.getElementsByTagName("iframe")[0].contentWindow.document.body;
            if (keyCode == 13) {
                if ((sim.className as any).includes("mirror-sim")){
                    (sim.className as any).replace("mirror-sim", "");
                } else {
                    sim.className += " mirror-sim";
                }
            }
        }
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    };
}