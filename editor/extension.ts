/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

namespace pxt.editor {
    initExtensionsAsync = function(opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug('loading pxt-ar target extensions...')
        const res: pxt.editor.ExtensionResult = {
            fieldEditors: [{
                selector: "drums",
                editor: DrumSequencer
            },
            {
               selector: "melody",
               editor: MelodySequencer 
            }]
        };
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }
}