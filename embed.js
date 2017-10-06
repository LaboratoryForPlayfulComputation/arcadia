(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/pxt-ar/",
    "workerjs": "/pxt-ar/worker.js",
    "tdworkerjs": "/pxt-ar/tdworker.js",
    "monacoworkerjs": "/pxt-ar/monacoworker.js",
    "pxtVersion": "2.0.10",
    "pxtRelId": "",
    "pxtCdnUrl": "/pxt-ar/",
    "commitCdnUrl": "/pxt-ar/",
    "blobCdnUrl": "/pxt-ar/",
    "cdnUrl": "/pxt-ar/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "simUrl": "/pxt-ar/simulator.html",
    "partsUrl": "/pxt-ar/siminstructions.html",
    "runUrl": "/pxt-ar/run.html",
    "docsUrl": "/pxt-ar/docs.html",
    "isStatic": true
};

    var scripts = [
        "/pxt-ar/highlight.js/highlight.pack.js",
        "/pxt-ar/bluebird.min.js",
        "/pxt-ar/typescript.js",
        "/pxt-ar/semantic.js",
        "/pxt-ar/marked/marked.min.js",
        "/pxt-ar/lzma/lzma_worker-min.js",
        "/pxt-ar/blockly/blockly_compressed.js",
        "/pxt-ar/blockly/blocks_compressed.js",
        "/pxt-ar/blockly/msg/js/en.js",
        "/pxt-ar/pxtlib.js",
        "/pxt-ar/pxtcompiler.js",
        "/pxt-ar/pxtblocks.js",
        "/pxt-ar/pxteditor.js",
        "/pxt-ar/pxtsim.js",
        "/pxt-ar/target.js",
        "/pxt-ar/pxtrunner.js"
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/pxt-ar/jquery.js")

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
