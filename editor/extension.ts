/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

namespace pxt.editor {
    initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug("loading pxt-ar target extensions...");
        const modelRx = /\.(obj|mtl|stl|dae)$/i;
        const res: pxt.editor.ExtensionResult = {
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
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    };
}