/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

namespace pxt.editor {
    initFieldExtensionsAsync = function (opts: pxt.editor.FieldExtensionOptions): Promise<pxt.editor.FieldExtensionResult> {
        pxt.debug("loading pxt-ar target extensions...");
        const modelRx = /\.(obj|mtl|stl|dae)$/i;
        const res: pxt.editor.FieldExtensionResult = {
            fieldEditors: [{
                selector: "drums",
                editor: DrumSequencer
            },
            {
                selector: "melody",
                editor: MelodySequencer
            }]
        };
        return Promise.resolve<pxt.editor.FieldExtensionResult>(res);
    };
}