/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * pxt-monaco-typescript version: 2.3.4(4576690a731361e1ac44e7da634213905e1e6562)
 * Released under the MIT license
 * https://github.com/Microsoft/pxt-monaco-typescript/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
define('vs/language/typescript/src/tokenization',["require", "exports", "../lib/typescriptServices"], function (require, exports, ts) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var Language;
    (function (Language) {
        Language[Language["TypeScript"] = 0] = "TypeScript";
        Language[Language["EcmaScript5"] = 1] = "EcmaScript5";
    })(Language = exports.Language || (exports.Language = {}));
    function createTokenizationSupport(language) {
        var classifier = ts.createClassifier(), bracketTypeTable = language === Language.TypeScript ? tsBracketTypeTable : jsBracketTypeTable, tokenTypeTable = language === Language.TypeScript ? tsTokenTypeTable : jsTokenTypeTable;
        return {
            getInitialState: function () { return new State(language, ts.EndOfLineState.None, false); },
            tokenize: function (line, state) { return tokenize(bracketTypeTable, tokenTypeTable, classifier, state, line); }
        };
    }
    exports.createTokenizationSupport = createTokenizationSupport;
    var State = (function () {
        function State(language, eolState, inJsDocComment) {
            this.language = language;
            this.eolState = eolState;
            this.inJsDocComment = inJsDocComment;
        }
        State.prototype.clone = function () {
            return new State(this.language, this.eolState, this.inJsDocComment);
        };
        State.prototype.equals = function (other) {
            if (other === this) {
                return true;
            }
            if (!other || !(other instanceof State)) {
                return false;
            }
            if (this.eolState !== other.eolState) {
                return false;
            }
            if (this.inJsDocComment !== other.inJsDocComment) {
                return false;
            }
            return true;
        };
        return State;
    }());
    function tokenize(bracketTypeTable, tokenTypeTable, classifier, state, text) {
        // Create result early and fill in tokens
        var ret = {
            tokens: [],
            endState: new State(state.language, ts.EndOfLineState.None, false)
        };
        function appendFn(startIndex, type, text) {
            if (text === void 0) { text = null; }
            if (ret.tokens.length === 0 || ret.tokens[ret.tokens.length - 1].scopes !== type) {
                if (text && (type.indexOf("identifier") > -1 || type.indexOf("keyword") > -1)) {
                    ret.tokens.push({
                        startIndex: startIndex,
                        scopes: type + " " + text
                    });
                }
                else {
                    ret.tokens.push({
                        startIndex: startIndex,
                        scopes: type
                    });
                }
            }
        }
        var isTypeScript = state.language === Language.TypeScript;
        // shebang statement, #! /bin/node
        if (!isTypeScript && checkSheBang(0, text, appendFn)) {
            return ret;
        }
        var result = classifier.getClassificationsForLine(text, state.eolState, true), offset = 0;
        ret.endState.eolState = result.finalLexState;
        ret.endState.inJsDocComment = result.finalLexState === ts.EndOfLineState.InMultiLineCommentTrivia && (state.inJsDocComment || /\/\*\*.*$/.test(text));
        for (var _i = 0, _a = result.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            var type;
            if (entry.classification === ts.TokenClass.Punctuation) {
                // punctions: check for brackets: (){}[]
                var ch = text.charCodeAt(offset);
                type = bracketTypeTable[ch] || tokenTypeTable[entry.classification];
                appendFn(offset, type);
            }
            else if (entry.classification === ts.TokenClass.Comment) {
                // comments: check for JSDoc, block, and line comments
                if (ret.endState.inJsDocComment || /\/\*\*.*\*\//.test(text.substr(offset, entry.length))) {
                    appendFn(offset, isTypeScript ? 'comment.doc.ts' : 'comment.doc.js');
                }
                else {
                    appendFn(offset, isTypeScript ? 'comment.ts' : 'comment.js');
                }
            }
            else {
                // everything else
                appendFn(offset, tokenTypeTable[entry.classification] || '', text.substr(offset, entry.length));
            }
            offset += entry.length;
        }
        return ret;
    }
    var tsBracketTypeTable = Object.create(null);
    tsBracketTypeTable['('.charCodeAt(0)] = 'delimiter.parenthesis.ts';
    tsBracketTypeTable[')'.charCodeAt(0)] = 'delimiter.parenthesis.ts';
    tsBracketTypeTable['{'.charCodeAt(0)] = 'delimiter.bracket.ts';
    tsBracketTypeTable['}'.charCodeAt(0)] = 'delimiter.bracket.ts';
    tsBracketTypeTable['['.charCodeAt(0)] = 'delimiter.array.ts';
    tsBracketTypeTable[']'.charCodeAt(0)] = 'delimiter.array.ts';
    var tsTokenTypeTable = Object.create(null);
    tsTokenTypeTable[ts.TokenClass.Identifier] = 'identifier.ts';
    tsTokenTypeTable[ts.TokenClass.Keyword] = 'keyword.ts';
    tsTokenTypeTable[ts.TokenClass.Operator] = 'delimiter.ts';
    tsTokenTypeTable[ts.TokenClass.Punctuation] = 'delimiter.ts';
    tsTokenTypeTable[ts.TokenClass.NumberLiteral] = 'number.ts';
    tsTokenTypeTable[ts.TokenClass.RegExpLiteral] = 'regexp.ts';
    tsTokenTypeTable[ts.TokenClass.StringLiteral] = 'string.ts';
    var jsBracketTypeTable = Object.create(null);
    jsBracketTypeTable['('.charCodeAt(0)] = 'delimiter.parenthesis.js';
    jsBracketTypeTable[')'.charCodeAt(0)] = 'delimiter.parenthesis.js';
    jsBracketTypeTable['{'.charCodeAt(0)] = 'delimiter.bracket.js';
    jsBracketTypeTable['}'.charCodeAt(0)] = 'delimiter.bracket.js';
    jsBracketTypeTable['['.charCodeAt(0)] = 'delimiter.array.js';
    jsBracketTypeTable[']'.charCodeAt(0)] = 'delimiter.array.js';
    var jsTokenTypeTable = Object.create(null);
    jsTokenTypeTable[ts.TokenClass.Identifier] = 'identifier.js';
    jsTokenTypeTable[ts.TokenClass.Keyword] = 'keyword.js';
    jsTokenTypeTable[ts.TokenClass.Operator] = 'delimiter.js';
    jsTokenTypeTable[ts.TokenClass.Punctuation] = 'delimiter.js';
    jsTokenTypeTable[ts.TokenClass.NumberLiteral] = 'number.js';
    jsTokenTypeTable[ts.TokenClass.RegExpLiteral] = 'regexp.js';
    jsTokenTypeTable[ts.TokenClass.StringLiteral] = 'string.js';
    function checkSheBang(deltaOffset, line, appendFn) {
        if (line.indexOf('#!') === 0) {
            appendFn(deltaOffset, 'comment.shebang');
            return true;
        }
    }
});

define('vs/language/typescript/src/workerManager',["require", "exports"], function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = monaco.Promise;
    var WorkerManager = (function () {
        function WorkerManager(modeId, defaults) {
            var _this = this;
            this._modeId = modeId;
            this._defaults = defaults;
            this._worker = null;
            this._idleCheckInterval = setInterval(function () { return _this._checkIfIdle(); }, 30 * 1000);
            this._lastUsedTime = 0;
            this._configChangeListener = this._defaults.onDidChange(function () { return _this._stopWorker(); });
        }
        WorkerManager.prototype._stopWorker = function () {
            if (this._worker) {
                this._worker.dispose();
                this._worker = null;
            }
            this._client = null;
        };
        WorkerManager.prototype.dispose = function () {
            clearInterval(this._idleCheckInterval);
            this._configChangeListener.dispose();
            this._stopWorker();
        };
        WorkerManager.prototype._checkIfIdle = function () {
            if (!this._worker) {
                return;
            }
            var maxIdleTime = this._defaults.getWorkerMaxIdleTime();
            var timePassedSinceLastUsed = Date.now() - this._lastUsedTime;
            if (maxIdleTime > 0 && timePassedSinceLastUsed > maxIdleTime) {
                this._stopWorker();
            }
        };
        WorkerManager.prototype._getClient = function () {
            var _this = this;
            this._lastUsedTime = Date.now();
            if (!this._client) {
                this._worker = monaco.editor.createWebWorker({
                    // module that exports the create() method and returns a `TypeScriptWorker` instance
                    moduleId: 'vs/language/typescript/src/worker',
                    label: this._modeId,
                    // passed in to the create() method
                    createData: {
                        compilerOptions: this._defaults.getCompilerOptions(),
                        extraLibs: this._defaults.getExtraLibs()
                    }
                });
                var p = this._worker.getProxy();
                if (this._defaults.getEagerModelSync()) {
                    p = p.then(function (worker) {
                        return _this._worker.withSyncedResources(monaco.editor.getModels()
                            .filter(function (model) { return model.getModeId() === _this._modeId; })
                            .map(function (model) { return model.uri; }));
                    });
                }
                this._client = p;
            }
            return this._client;
        };
        WorkerManager.prototype.getLanguageServiceWorker = function () {
            var _this = this;
            var resources = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                resources[_i] = arguments[_i];
            }
            var _client;
            return toShallowCancelPromise(this._getClient().then(function (client) {
                _client = client;
            }).then(function (_) {
                return _this._worker.withSyncedResources(resources);
            }).then(function (_) { return _client; }));
        };
        return WorkerManager;
    }());
    exports.WorkerManager = WorkerManager;
    function toShallowCancelPromise(p) {
        var completeCallback;
        var errorCallback;
        var r = new Promise(function (c, e) {
            completeCallback = c;
            errorCallback = e;
        }, function () { });
        p.then(completeCallback, errorCallback);
        return r;
    }
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('vs/language/typescript/src/languageFeatures',["require", "exports", "../lib/typescriptServices"], function (require, exports, ts) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var Uri = monaco.Uri;
    var Position = monaco.Position;
    var Promise = monaco.Promise;
    var snippets = {
        "For Loop": {
            "prefix": "for",
            "body": [
                "for (let ${1:index} = 0; ${1:index} < 4; ${1:index}++) {",
                "\t$0",
                "}"
            ],
            "description": "For Loop"
        },
        "Function Statement": {
            "prefix": "function",
            "body": [
                "function ${1:name}() {",
                "\t$0",
                "}"
            ],
            "description": "Function Statement"
        },
        "If Statement": {
            "prefix": "if",
            "body": [
                "if (${1:condition}) {",
                "\t$0",
                "}"
            ],
            "description": "If Statement"
        },
        "If-Else Statement": {
            "prefix": "ifelse",
            "body": [
                "if (${1:condition}) {",
                "\t$0",
                "} else {",
                "\t",
                "}"
            ],
            "description": "If-Else Statement"
        },
        "While Statement": {
            "prefix": "while",
            "body": [
                "while (${1:condition}) {",
                "\t$0",
                "}"
            ],
            "description": "While Statement"
        }
    };
    var Adapter = (function () {
        function Adapter(_worker) {
            this._worker = _worker;
        }
        Adapter.prototype._positionToOffset = function (uri, position) {
            var model = monaco.editor.getModel(uri);
            return model.getOffsetAt(position);
        };
        Adapter.prototype._offsetToPosition = function (uri, offset) {
            var model = monaco.editor.getModel(uri);
            return model.getPositionAt(offset);
        };
        Adapter.prototype._textSpanToRange = function (uri, span) {
            var p1 = this._offsetToPosition(uri, span.start);
            var p2 = this._offsetToPosition(uri, span.start + span.length);
            var startLineNumber = p1.lineNumber, startColumn = p1.column;
            var endLineNumber = p2.lineNumber, endColumn = p2.column;
            return { startLineNumber: startLineNumber, startColumn: startColumn, endLineNumber: endLineNumber, endColumn: endColumn };
        };
        return Adapter;
    }());
    exports.Adapter = Adapter;
    // --- diagnostics --- ---
    var DiagnostcsAdapter = (function (_super) {
        __extends(DiagnostcsAdapter, _super);
        function DiagnostcsAdapter(_defaults, _selector, worker) {
            var _this = _super.call(this, worker) || this;
            _this._defaults = _defaults;
            _this._selector = _selector;
            _this._disposables = [];
            _this._listener = Object.create(null);
            var onModelAdd = function (model) {
                if (model.getModeId() !== _selector) {
                    return;
                }
                var handle;
                var changeSubscription = model.onDidChangeContent(function () {
                    clearTimeout(handle);
                    handle = setTimeout(function () { return _this._doValidate(model.uri); }, 500);
                });
                _this._listener[model.uri.toString()] = {
                    dispose: function () {
                        changeSubscription.dispose();
                        clearTimeout(handle);
                    }
                };
                _this._doValidate(model.uri);
            };
            var onModelRemoved = function (model) {
                monaco.editor.setModelMarkers(model, _this._selector, []);
                var key = model.uri.toString();
                if (_this._listener[key]) {
                    _this._listener[key].dispose();
                    delete _this._listener[key];
                }
            };
            _this._disposables.push(monaco.editor.onDidCreateModel(onModelAdd));
            _this._disposables.push(monaco.editor.onWillDisposeModel(onModelRemoved));
            _this._disposables.push(monaco.editor.onDidChangeModelLanguage(function (event) {
                onModelRemoved(event.model);
                onModelAdd(event.model);
            }));
            _this._disposables.push({
                dispose: function () {
                    for (var _i = 0, _a = monaco.editor.getModels(); _i < _a.length; _i++) {
                        var model = _a[_i];
                        onModelRemoved(model);
                    }
                }
            });
            _this._disposables.push(_this._defaults.onDidChange(function () {
                // redo diagnostics when options change
                for (var _i = 0, _a = monaco.editor.getModels(); _i < _a.length; _i++) {
                    var model = _a[_i];
                    onModelRemoved(model);
                    onModelAdd(model);
                }
            }));
            monaco.editor.getModels().forEach(onModelAdd);
            return _this;
        }
        DiagnostcsAdapter.prototype.dispose = function () {
            this._disposables.forEach(function (d) { return d && d.dispose(); });
            this._disposables = [];
        };
        DiagnostcsAdapter.prototype._doValidate = function (resource) {
            var _this = this;
            this._worker(resource).then(function (worker) {
                if (!monaco.editor.getModel(resource)) {
                    // model was disposed in the meantime
                    return null;
                }
                var promises = [];
                var _a = _this._defaults.getDiagnosticsOptions(), noSyntaxValidation = _a.noSyntaxValidation, noSemanticValidation = _a.noSemanticValidation;
                if (!noSyntaxValidation) {
                    promises.push(worker.getSyntacticDiagnostics(resource.toString()));
                }
                if (!noSemanticValidation) {
                    promises.push(worker.getSemanticDiagnostics(resource.toString()));
                }
                return Promise.join(promises);
            }).then(function (diagnostics) {
                if (!diagnostics || !monaco.editor.getModel(resource)) {
                    // model was disposed in the meantime
                    return null;
                }
                var markers = diagnostics
                    .reduce(function (p, c) { return c.concat(p); }, [])
                    .map(function (d) { return _this._convertDiagnostics(resource, d); });
                monaco.editor.setModelMarkers(monaco.editor.getModel(resource), _this._selector, markers);
            }).done(undefined, function (err) {
                console.error(err);
            });
        };
        DiagnostcsAdapter.prototype._convertDiagnostics = function (resource, diag) {
            var _a = this._offsetToPosition(resource, diag.start), startLineNumber = _a.lineNumber, startColumn = _a.column;
            var _b = this._offsetToPosition(resource, diag.start + diag.length), endLineNumber = _b.lineNumber, endColumn = _b.column;
            return {
                severity: monaco.Severity.Error,
                startLineNumber: startLineNumber,
                startColumn: startColumn,
                endLineNumber: endLineNumber,
                endColumn: endColumn,
                message: ts.flattenDiagnosticMessageText(diag.messageText, '\n')
            };
        };
        return DiagnostcsAdapter;
    }(Adapter));
    exports.DiagnostcsAdapter = DiagnostcsAdapter;
    var SuggestAdapter = (function (_super) {
        __extends(SuggestAdapter, _super);
        function SuggestAdapter(worker) {
            var _this = _super.call(this, worker) || this;
            _this.typescriptSnippets = [];
            Object.keys(snippets).forEach(function (snippetKey) {
                var snippet = snippets[snippetKey];
                var prefix = snippet.prefix;
                var body = snippet.body.join('\n');
                var description = snippet.description;
                _this.typescriptSnippets.push({
                    prefix: prefix,
                    body: body,
                    description: description
                });
            });
            return _this;
        }
        Object.defineProperty(SuggestAdapter.prototype, "triggerCharacters", {
            get: function () {
                return ['.'];
            },
            enumerable: true,
            configurable: true
        });
        SuggestAdapter.prototype.provideCompletionItems = function (model, position, token) {
            var wordInfo = model.getWordUntilPosition(position);
            var resource = model.uri;
            var offset = this._positionToOffset(resource, position);
            var lineContent = model.getLineContent(position.lineNumber);
            var wordUnderCursor = model.getWordAtPosition(position);
            var wordBefore = '';
            var wordAfter = '';
            if (wordUnderCursor) {
                wordBefore = lineContent.substring(wordUnderCursor.startColumn - 1, position.column - 1);
                wordAfter = lineContent.substring(position.column - 1, wordUnderCursor.endColumn - 1);
            }
            var lineContentBefore = lineContent.substr(0, position.column - 1);
            var lineContentAfter = lineContent.substr(position.column - 1);
            var isNamespace = false;
            var prevWordInfo = model.getWordUntilPosition(new Position(position.lineNumber, wordInfo.startColumn - 1));
            if (prevWordInfo && prevWordInfo.word && prevWordInfo.word != "")
                isNamespace = true;
            return wireCancellationToken(token, this._worker(resource).then(function (worker) {
                var promises = [];
                promises.push(worker.getCompletionsAtPosition(resource.toString(), offset));
                var promise = worker.getNavigateToItems(wordInfo.word).then(function (navigation) {
                    if (!navigation || navigation.length == 0)
                        return [];
                    function convert(bucket, entry) {
                        var label = entry.containerName ? entry.containerName + '.' + entry.name : entry.name;
                        var result = {
                            uri: resource,
                            position: position,
                            label: label,
                            name: entry.name,
                            sortText: entry.name,
                            filterText: (isNamespace ? prevWordInfo.word + "." : (entry.containerName ? entry.containerName + "." : "")) + entry.name,
                            kind: SuggestAdapter.convertKind(entry.kind),
                            containerName: entry.containerName,
                            navigation: entry,
                            skipCodeSnippet: lineContentAfter.trim() != "",
                            insertText: {
                                value: (isNamespace ? prevWordInfo.word + "." : (entry.containerName ? entry.containerName + "." : "")) + entry.name,
                            },
                            range: new monaco.Range(position.lineNumber, position.column - wordInfo.word.length - (isNamespace ? prevWordInfo.word.length + 1 : 0), position.lineNumber, position.column)
                        };
                        bucket.push(result);
                    }
                    var result = [];
                    navigation
                        .filter(function (item) { return (item.kind == Kind.function && item.kindModifiers != "")
                        && (isNamespace ? item.containerName != prevWordInfo.word : true); })
                        .forEach(function (item) { return convert(result, item); });
                    return result;
                });
                promises.push(promise);
                return Promise.join(promises);
            }).then(function (values) {
                if (!values) {
                    return;
                }
                var info = values[0];
                var moreinfo = values[1];
                if (!info) {
                    return;
                }
                var suggestions = info.entries
                    .map(function (entry) {
                    return {
                        uri: resource,
                        position: position,
                        label: entry.name,
                        name: entry.name,
                        sortText: entry.sortText,
                        kind: SuggestAdapter.convertKind(entry.kind),
                        skipCodeSnippet: lineContentAfter.trim() != ""
                    };
                });
                if (moreinfo) {
                    suggestions = suggestions.concat(moreinfo);
                }
                return suggestions;
            }));
        };
        SuggestAdapter.prototype.resolveCompletionItem = function (item, token) {
            var _this = this;
            var myItem = item;
            var resource = myItem.uri;
            var position = myItem.position;
            var entry = this.typescriptSnippets.filter(function (snippet) { return snippet.prefix == myItem.label; })[0];
            if (entry) {
                return new Promise(function (resolve, reject) {
                    myItem.insertText = {
                        value: entry.body
                    };
                    myItem.documentation = entry.description;
                    resolve(myItem);
                });
            }
            return wireCancellationToken(token, this._worker(resource).then(function (worker) {
                if (myItem.navigation) {
                    return worker.getCompletionEntryDetailsAndSnippet(myItem.navigation.fileName, myItem.navigation.textSpan.start, myItem.name, myItem.label);
                }
                else {
                    return worker.getCompletionEntryDetailsAndSnippet(resource.toString(), _this._positionToOffset(resource, position), myItem.name, myItem.label);
                }
            }).then(function (values) {
                if (!values) {
                    return myItem;
                }
                var details = values[0];
                var codeSnippet = values[1];
                if (!details) {
                    return myItem;
                }
                myItem.uri = resource;
                myItem.position = position;
                myItem.kind = SuggestAdapter.convertKind(details.kind);
                myItem.detail = ts.displayPartsToString(details.displayParts);
                myItem.documentation = ts.displayPartsToString(details.documentation);
                myItem.insertText = !myItem.skipCodeSnippet ? { value: codeSnippet } : null;
                return myItem;
            }));
        };
        SuggestAdapter.convertKind = function (kind) {
            switch (kind) {
                case Kind.primitiveType:
                case Kind.keyword:
                    return monaco.languages.CompletionItemKind.Keyword;
                case Kind.variable:
                case Kind.localVariable:
                    return monaco.languages.CompletionItemKind.Variable;
                case Kind.memberVariable:
                case Kind.memberGetAccessor:
                case Kind.memberSetAccessor:
                    return monaco.languages.CompletionItemKind.Field;
                case Kind.function:
                case Kind.memberFunction:
                case Kind.constructSignature:
                case Kind.callSignature:
                case Kind.indexSignature:
                    return monaco.languages.CompletionItemKind.Function;
                case Kind.enum:
                    return monaco.languages.CompletionItemKind.Enum;
                case Kind.module:
                    return monaco.languages.CompletionItemKind.Module;
                case Kind.class:
                    return monaco.languages.CompletionItemKind.Class;
                case Kind.interface:
                    return monaco.languages.CompletionItemKind.Interface;
                case Kind.warning:
                    return monaco.languages.CompletionItemKind.File;
            }
            return monaco.languages.CompletionItemKind.Property;
        };
        return SuggestAdapter;
    }(Adapter));
    exports.SuggestAdapter = SuggestAdapter;
    var SignatureHelpAdapter = (function (_super) {
        __extends(SignatureHelpAdapter, _super);
        function SignatureHelpAdapter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.signatureHelpTriggerCharacters = ['(', ','];
            return _this;
        }
        SignatureHelpAdapter.prototype.provideSignatureHelp = function (model, position, token) {
            var _this = this;
            var resource = model.uri;
            return wireCancellationToken(token, this._worker(resource).then(function (worker) { return worker.getSignatureHelpItems(resource.toString(), _this._positionToOffset(resource, position)); }).then(function (info) {
                if (!info) {
                    return;
                }
                var ret = {
                    activeSignature: info.selectedItemIndex,
                    activeParameter: info.argumentIndex,
                    signatures: []
                };
                info.items.forEach(function (item) {
                    var signature = {
                        label: '',
                        documentation: null,
                        parameters: []
                    };
                    signature.label += ts.displayPartsToString(item.prefixDisplayParts);
                    item.parameters.forEach(function (p, i, a) {
                        var label = ts.displayPartsToString(p.displayParts);
                        var parameter = {
                            label: label,
                            documentation: ts.displayPartsToString(p.documentation)
                        };
                        signature.label += label;
                        signature.parameters.push(parameter);
                        if (i < a.length - 1) {
                            signature.label += ts.displayPartsToString(item.separatorDisplayParts);
                        }
                    });
                    signature.label += ts.displayPartsToString(item.suffixDisplayParts);
                    ret.signatures.push(signature);
                });
                return ret;
            }));
        };
        return SignatureHelpAdapter;
    }(Adapter));
    exports.SignatureHelpAdapter = SignatureHelpAdapter;
    // --- hover ------
    var QuickInfoAdapter = (function (_super) {
        __extends(QuickInfoAdapter, _super);
        function QuickInfoAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        QuickInfoAdapter.prototype.provideHover = function (model, position, token) {
            var _this = this;
            var resource = model.uri;
            var wordInfo = model.getWordAtPosition(position);
            return wireCancellationToken(token, this._worker(resource).then(function (worker) {
                var promises = [];
                promises.push(worker.getQuickInfoAtPosition(resource.toString(), _this._positionToOffset(resource, position)));
                promises.push(worker.getSignatureHelpItems(resource.toString(), _this._positionToOffset(resource, position)));
                if (wordInfo)
                    promises.push(worker.getCompletionEntryDetails(resource.toString(), _this._positionToOffset(resource, position), wordInfo.word));
                return Promise.join(promises);
            }).then(function (values) {
                if (!values) {
                    return;
                }
                var info = values[0];
                var signature = values[1];
                var completion = values[2];
                if (info && completion) {
                    var contents = ts.displayPartsToString(completion.documentation);
                    if (!contents)
                        contents = ts.displayPartsToString(info.displayParts);
                    return {
                        range: _this._textSpanToRange(resource, info.textSpan),
                        contents: [contents]
                    };
                }
                else if (signature && signature.items[0]) {
                    if (signature.items[0].parameters.length > 0) {
                        var activeParameter = signature.argumentIndex;
                        var contents = ts.displayPartsToString(signature.items[0].parameters[activeParameter].documentation);
                        if (!contents)
                            contents = ts.displayPartsToString(signature.items[0].parameters[activeParameter].displayParts);
                        var parameterSpan = signature.applicableSpan;
                        if (signature.argumentCount > 1) {
                            var parametersStr = model.getValue().substr(signature.applicableSpan.start, signature.applicableSpan.length);
                            var parametersSplit = parametersStr.split(',');
                            parameterSpan.start = parameterSpan.start + parametersStr.indexOf(parametersSplit[activeParameter]);
                            parameterSpan.length = parametersSplit[activeParameter].length;
                        }
                        return {
                            range: _this._textSpanToRange(resource, parameterSpan),
                            contents: [contents]
                        };
                    }
                }
                else if (info) {
                    var contents = ts.displayPartsToString(info.displayParts);
                    return {
                        range: _this._textSpanToRange(resource, info.textSpan),
                        contents: [contents]
                    };
                }
                return;
            }));
        };
        return QuickInfoAdapter;
    }(Adapter));
    exports.QuickInfoAdapter = QuickInfoAdapter;
    // --- occurrences ------
    var OccurrencesAdapter = (function (_super) {
        __extends(OccurrencesAdapter, _super);
        function OccurrencesAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OccurrencesAdapter.prototype.provideDocumentHighlights = function (model, position, token) {
            var _this = this;
            var resource = model.uri;
            return wireCancellationToken(token, this._worker(resource).then(function (worker) {
                return worker.getOccurrencesAtPosition(resource.toString(), _this._positionToOffset(resource, position));
            }).then(function (entries) {
                if (!entries) {
                    return;
                }
                return entries.map(function (entry) {
                    return {
                        range: _this._textSpanToRange(resource, entry.textSpan),
                        kind: entry.isWriteAccess ? monaco.languages.DocumentHighlightKind.Write : monaco.languages.DocumentHighlightKind.Text
                    };
                });
            }));
        };
        return OccurrencesAdapter;
    }(Adapter));
    exports.OccurrencesAdapter = OccurrencesAdapter;
    // --- definition ------
    var DefinitionAdapter = (function (_super) {
        __extends(DefinitionAdapter, _super);
        function DefinitionAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DefinitionAdapter.prototype.provideDefinition = function (model, position, token) {
            var _this = this;
            var resource = model.uri;
            return wireCancellationToken(token, this._worker(resource).then(function (worker) {
                return worker.getDefinitionAtPosition(resource.toString(), _this._positionToOffset(resource, position));
            }).then(function (entries) {
                if (!entries) {
                    return;
                }
                var result = [];
                for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                    var entry = entries_1[_i];
                    var uri = Uri.parse(entry.fileName);
                    if (monaco.editor.getModel(uri)) {
                        result.push({
                            uri: uri,
                            range: _this._textSpanToRange(uri, entry.textSpan)
                        });
                    }
                }
                return result;
            }));
        };
        return DefinitionAdapter;
    }(Adapter));
    exports.DefinitionAdapter = DefinitionAdapter;
    // --- references ------
    var ReferenceAdapter = (function (_super) {
        __extends(ReferenceAdapter, _super);
        function ReferenceAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ReferenceAdapter.prototype.provideReferences = function (model, position, context, token) {
            var _this = this;
            var resource = model.uri;
            return wireCancellationToken(token, this._worker(resource).then(function (worker) {
                return worker.getReferencesAtPosition(resource.toString(), _this._positionToOffset(resource, position));
            }).then(function (entries) {
                if (!entries) {
                    return;
                }
                var result = [];
                for (var _i = 0, entries_2 = entries; _i < entries_2.length; _i++) {
                    var entry = entries_2[_i];
                    var uri = Uri.parse(entry.fileName);
                    if (monaco.editor.getModel(uri)) {
                        result.push({
                            uri: uri,
                            range: _this._textSpanToRange(uri, entry.textSpan)
                        });
                    }
                }
                return result;
            }));
        };
        return ReferenceAdapter;
    }(Adapter));
    exports.ReferenceAdapter = ReferenceAdapter;
    // --- outline ------
    var OutlineAdapter = (function (_super) {
        __extends(OutlineAdapter, _super);
        function OutlineAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OutlineAdapter.prototype.provideDocumentSymbols = function (model, token) {
            var _this = this;
            var resource = model.uri;
            return wireCancellationToken(token, this._worker(resource).then(function (worker) { return worker.getNavigationBarItems(resource.toString()); }).then(function (items) {
                if (!items) {
                    return;
                }
                var convert = function (bucket, item, containerLabel) {
                    var result = {
                        name: item.text,
                        kind: outlineTypeTable[item.kind] || monaco.languages.SymbolKind.Variable,
                        location: {
                            uri: resource,
                            range: _this._textSpanToRange(resource, item.spans[0])
                        },
                        containerName: containerLabel
                    };
                    if (item.childItems && item.childItems.length > 0) {
                        for (var _i = 0, _a = item.childItems; _i < _a.length; _i++) {
                            var child = _a[_i];
                            convert(bucket, child, result.name);
                        }
                    }
                    bucket.push(result);
                };
                var result = [];
                items.forEach(function (item) { return convert(result, item); });
                return result;
            }));
        };
        return OutlineAdapter;
    }(Adapter));
    exports.OutlineAdapter = OutlineAdapter;
    var Kind = (function () {
        function Kind() {
        }
        Kind.unknown = '';
        Kind.keyword = 'keyword';
        Kind.script = 'script';
        Kind.module = 'module';
        Kind.class = 'class';
        Kind.interface = 'interface';
        Kind.type = 'type';
        Kind.enum = 'enum';
        Kind.variable = 'var';
        Kind.localVariable = 'local var';
        Kind.function = 'function';
        Kind.localFunction = 'local function';
        Kind.memberFunction = 'method';
        Kind.memberGetAccessor = 'getter';
        Kind.memberSetAccessor = 'setter';
        Kind.memberVariable = 'property';
        Kind.constructorImplementation = 'constructor';
        Kind.callSignature = 'call';
        Kind.indexSignature = 'index';
        Kind.constructSignature = 'construct';
        Kind.parameter = 'parameter';
        Kind.typeParameter = 'type parameter';
        Kind.primitiveType = 'primitive type';
        Kind.label = 'label';
        Kind.alias = 'alias';
        Kind.const = 'const';
        Kind.let = 'let';
        Kind.warning = 'warning';
        return Kind;
    }());
    exports.Kind = Kind;
    var outlineTypeTable = Object.create(null);
    outlineTypeTable[Kind.module] = monaco.languages.SymbolKind.Module;
    outlineTypeTable[Kind.class] = monaco.languages.SymbolKind.Class;
    outlineTypeTable[Kind.enum] = monaco.languages.SymbolKind.Enum;
    outlineTypeTable[Kind.interface] = monaco.languages.SymbolKind.Interface;
    outlineTypeTable[Kind.memberFunction] = monaco.languages.SymbolKind.Method;
    outlineTypeTable[Kind.memberVariable] = monaco.languages.SymbolKind.Property;
    outlineTypeTable[Kind.memberGetAccessor] = monaco.languages.SymbolKind.Property;
    outlineTypeTable[Kind.memberSetAccessor] = monaco.languages.SymbolKind.Property;
    outlineTypeTable[Kind.variable] = monaco.languages.SymbolKind.Variable;
    outlineTypeTable[Kind.const] = monaco.languages.SymbolKind.Variable;
    outlineTypeTable[Kind.localVariable] = monaco.languages.SymbolKind.Variable;
    outlineTypeTable[Kind.variable] = monaco.languages.SymbolKind.Variable;
    outlineTypeTable[Kind.function] = monaco.languages.SymbolKind.Function;
    outlineTypeTable[Kind.localFunction] = monaco.languages.SymbolKind.Function;
    // --- formatting ----
    var FormatHelper = (function (_super) {
        __extends(FormatHelper, _super);
        function FormatHelper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FormatHelper._convertOptions = function (options) {
            return {
                ConvertTabsToSpaces: options.insertSpaces,
                TabSize: options.tabSize,
                IndentSize: options.tabSize,
                IndentStyle: ts.IndentStyle.Smart,
                NewLineCharacter: '\n',
                InsertSpaceAfterCommaDelimiter: true,
                InsertSpaceAfterSemicolonInForStatements: true,
                InsertSpaceBeforeAndAfterBinaryOperators: true,
                InsertSpaceAfterKeywordsInControlFlowStatements: true,
                InsertSpaceAfterFunctionKeywordForAnonymousFunctions: true,
                InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
                InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
                InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
                PlaceOpenBraceOnNewLineForControlBlocks: false,
                PlaceOpenBraceOnNewLineForFunctions: false
            };
        };
        FormatHelper.prototype._convertTextChanges = function (uri, change) {
            return {
                text: change.newText,
                range: this._textSpanToRange(uri, change.span)
            };
        };
        return FormatHelper;
    }(Adapter));
    exports.FormatHelper = FormatHelper;
    var FormatAdapter = (function (_super) {
        __extends(FormatAdapter, _super);
        function FormatAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FormatAdapter.prototype.provideDocumentRangeFormattingEdits = function (model, range, options, token) {
            var _this = this;
            var resource = model.uri;
            return wireCancellationToken(token, this._worker(resource).then(function (worker) {
                return worker.getFormattingEditsForRange(resource.toString(), _this._positionToOffset(resource, { lineNumber: range.startLineNumber, column: range.startColumn }), _this._positionToOffset(resource, { lineNumber: range.endLineNumber, column: range.endColumn }), FormatHelper._convertOptions(options));
            }).then(function (edits) {
                if (edits) {
                    return edits.map(function (edit) { return _this._convertTextChanges(resource, edit); });
                }
            }));
        };
        return FormatAdapter;
    }(FormatHelper));
    exports.FormatAdapter = FormatAdapter;
    var FormatOnTypeAdapter = (function (_super) {
        __extends(FormatOnTypeAdapter, _super);
        function FormatOnTypeAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(FormatOnTypeAdapter.prototype, "autoFormatTriggerCharacters", {
            get: function () {
                return [';', '}', '\n'];
            },
            enumerable: true,
            configurable: true
        });
        FormatOnTypeAdapter.prototype.provideOnTypeFormattingEdits = function (model, position, ch, options, token) {
            var _this = this;
            var resource = model.uri;
            return wireCancellationToken(token, this._worker(resource).then(function (worker) {
                return worker.getFormattingEditsAfterKeystroke(resource.toString(), _this._positionToOffset(resource, position), ch, FormatHelper._convertOptions(options));
            }).then(function (edits) {
                if (edits) {
                    return edits.map(function (edit) { return _this._convertTextChanges(resource, edit); });
                }
            }));
        };
        return FormatOnTypeAdapter;
    }(FormatHelper));
    exports.FormatOnTypeAdapter = FormatOnTypeAdapter;
    /**
     * Hook a cancellation token to a WinJS Promise
     */
    function wireCancellationToken(token, promise) {
        token.onCancellationRequested(function () { return promise.cancel(); });
        return promise;
    }
});

define('vs/language/typescript/src/mode',["require", "exports", "./tokenization", "./workerManager", "./languageFeatures"], function (require, exports, tokenization_1, workerManager_1, languageFeatures) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var javaScriptWorker;
    var typeScriptWorker;
    function setupTypeScript(defaults) {
        typeScriptWorker = setupMode(defaults, 'typescript', tokenization_1.Language.TypeScript);
    }
    exports.setupTypeScript = setupTypeScript;
    function setupJavaScript(defaults) {
        javaScriptWorker = setupMode(defaults, 'javascript', tokenization_1.Language.EcmaScript5);
    }
    exports.setupJavaScript = setupJavaScript;
    function getJavaScriptWorker() {
        return new monaco.Promise(function (resolve, reject) {
            if (!javaScriptWorker) {
                return reject("JavaScript not registered!");
            }
            resolve(javaScriptWorker);
        });
    }
    exports.getJavaScriptWorker = getJavaScriptWorker;
    function getTypeScriptWorker() {
        return new monaco.Promise(function (resolve, reject) {
            if (!typeScriptWorker) {
                return reject("TypeScript not registered!");
            }
            resolve(typeScriptWorker);
        });
    }
    exports.getTypeScriptWorker = getTypeScriptWorker;
    function setupMode(defaults, modeId, language) {
        var disposables = [];
        var client = new workerManager_1.WorkerManager(modeId, defaults);
        disposables.push(client);
        var worker = function (first) {
            var more = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                more[_i - 1] = arguments[_i];
            }
            return client.getLanguageServiceWorker.apply(client, [first].concat(more));
        };
        disposables.push(monaco.languages.registerCompletionItemProvider(modeId, new languageFeatures.SuggestAdapter(worker)));
        disposables.push(monaco.languages.registerSignatureHelpProvider(modeId, new languageFeatures.SignatureHelpAdapter(worker)));
        disposables.push(monaco.languages.registerHoverProvider(modeId, new languageFeatures.QuickInfoAdapter(worker)));
        disposables.push(monaco.languages.registerDocumentHighlightProvider(modeId, new languageFeatures.OccurrencesAdapter(worker)));
        disposables.push(monaco.languages.registerDefinitionProvider(modeId, new languageFeatures.DefinitionAdapter(worker)));
        disposables.push(monaco.languages.registerReferenceProvider(modeId, new languageFeatures.ReferenceAdapter(worker)));
        disposables.push(monaco.languages.registerDocumentSymbolProvider(modeId, new languageFeatures.OutlineAdapter(worker)));
        disposables.push(monaco.languages.registerDocumentRangeFormattingEditProvider(modeId, new languageFeatures.FormatAdapter(worker)));
        disposables.push(monaco.languages.registerOnTypeFormattingEditProvider(modeId, new languageFeatures.FormatOnTypeAdapter(worker)));
        disposables.push(new languageFeatures.DiagnostcsAdapter(defaults, modeId, worker));
        disposables.push(monaco.languages.setLanguageConfiguration(modeId, richEditConfiguration));
        disposables.push(monaco.languages.setTokensProvider(modeId, tokenization_1.createTokenizationSupport(language)));
        return worker;
    }
    var richEditConfiguration = {
        wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        comments: {
            lineComment: '//',
            blockComment: ['/*', '*/']
        },
        brackets: [
            ['{', '}'],
            ['[', ']'],
            ['(', ')']
        ],
        onEnterRules: [
            {
                // e.g. /** | */
                beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                afterText: /^\s*\*\/$/,
                action: { indentAction: monaco.languages.IndentAction.IndentOutdent, appendText: ' * ' }
            },
            {
                // e.g. /** ...|
                beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                action: { indentAction: monaco.languages.IndentAction.None, appendText: ' * ' }
            },
            {
                // e.g.  * ...|
                beforeText: /^(\t|(\ \ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
                action: { indentAction: monaco.languages.IndentAction.None, appendText: '* ' }
            },
            {
                // e.g.  */|
                beforeText: /^(\t|(\ \ ))*\ \*\/\s*$/,
                action: { indentAction: monaco.languages.IndentAction.None, removeText: 1 }
            }
        ],
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"', notIn: ['string'] },
            { open: '\'', close: '\'', notIn: ['string', 'comment'] },
            { open: '`', close: '`', notIn: ['string', 'comment'] },
            { open: "/**", close: " */", notIn: ["string"] }
        ]
    };
});

