(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/arcadia/",
    "workerjs": "/arcadia/worker.js",
    "tdworkerjs": "/arcadia/tdworker.js",
    "monacoworkerjs": "/arcadia/monacoworker.js",
    "pxtVersion": "2.0.10",
    "pxtRelId": "",
    "pxtCdnUrl": "/arcadia/",
    "commitCdnUrl": "/arcadia/",
    "blobCdnUrl": "/arcadia/",
    "cdnUrl": "/arcadia/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "simUrl": "/arcadia/simulator.html",
    "partsUrl": "/arcadia/siminstructions.html",
    "runUrl": "/arcadia/run.html",
    "docsUrl": "/arcadia/docs.html",
    "isStatic": true
};

    var scripts = [
        "/arcadia/highlight.js/highlight.pack.js",
        "/arcadia/bluebird.min.js",
        "/arcadia/typescript.js",
        "/arcadia/semantic.js",
        "/arcadia/marked/marked.min.js",
        "/arcadia/lzma/lzma_worker-min.js",
        "/arcadia/blockly/blockly_compressed.js",
        "/arcadia/blockly/blocks_compressed.js",
        "/arcadia/blockly/msg/js/en.js",
        "/arcadia/pxtlib.js",
        "/arcadia/pxtcompiler.js",
        "/arcadia/pxtblocks.js",
        "/arcadia/pxteditor.js",
        "/arcadia/pxtsim.js",
        "/arcadia/target.js",
        "/arcadia/pxtrunner.js"
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/arcadia/jquery.js")

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
