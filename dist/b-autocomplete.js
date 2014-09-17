(function () {
    var KEY = {
            ENTER: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };
    function normalizeTokens(tokens) {
        return tokens.filter(function (token) {
            return !!token;
        }).map(function (token) {
            return token.toLowerCase();
        });
    }
    function newIndexNode() {
        return {
            ids: [],
            children: {}
        };
    }
    function buildIndex(options) {
        var index = newIndexNode();
        options.forEach(function (option, id) {
            var tokens = normalizeTokens(option.split(/\s+/));
            tokens.forEach(function (token) {
                var ch, chars = token.split(''), node = index;
                while (ch = chars.shift()) {
                    node = node.children[ch] || (node.children[ch] = newIndexNode());
                    node.ids.push(id);
                }
            });
        });
        return index;
    }
    function find(query, index, options) {
        var matches, tokens = normalizeTokens(query.split(/\s+/));
        tokens.forEach(function (token) {
            var node = index, ch, chars = token.split('');
            if (matches && matches.length === 0) {
                return false;
            }
            while (node && (ch = chars.shift())) {
                node = node.children[ch];
            }
            if (node && chars.length === 0) {
                ids = node.ids.slice(0);
                matches = matches ? getIntersection(matches, ids) : ids;
            } else {
                matches = [];
                return false;
            }
        });
        return matches ? unique(matches).map(function (id) {
            return options[id];
        }) : [];
    }
    function unique(array) {
        var seen = {}, uniques = [];
        for (var i = 0; i < array.length; i++) {
            if (!seen[array[i]]) {
                seen[array[i]] = true;
                uniques.push(array[i]);
            }
        }
        return uniques;
    }
    function getIntersection(arrayA, arrayB) {
        var ai = 0, bi = 0, intersection = [];
        arrayA = arrayA.sort(compare);
        arrayB = arrayB.sort(compare);
        while (ai < arrayA.length && bi < arrayB.length) {
            if (arrayA[ai] < arrayB[bi]) {
                ai++;
            } else if (arrayA[ai] > arrayB[bi]) {
                bi++;
            } else {
                intersection.push(arrayA[ai]);
                ai++;
                bi++;
            }
        }
        return intersection;
        function compare(a, b) {
            return a - b;
        }
    }
    var template = function () {
            var df0 = document.createDocumentFragment();
            var el0 = document.createElement('input');
            el0.setAttribute('type', 'text');
            el0.setAttribute('autocomplete', 'off');
            el0.setAttribute('role', 'textbox');
            el0.setAttribute('value', '');
            df0.appendChild(el0);
            var el0 = document.createElement('b-selectable');
            el0.setAttribute('target', 'li');
            var el1 = document.createElement('ul');
            el0.appendChild(el1);
            df0.appendChild(el0);
            return { content: df0 };
        }();
    window.BAutocomplete = document.registerElement('b-autocomplete', {
        prototype: Object.create(HTMLElement.prototype, {
            createdCallback: {
                enumerable: true,
                value: function () {
                    this.createShadowRoot();
                    this.shadowRoot.appendChild(template.content.cloneNode(true));
                }
            },
            attributeChangedCallback: {
                enumerable: true,
                value: function (name, oldValue, newValue) {
                    if (['options'].indexOf(name) !== -1) {
                        this[name + 'Changed'].call(this, oldValue, newValue);
                    }
                }
            },
            data: {
                enumerable: true,
                get: function () {
                    if (this.hasAttribute('list')) {
                        var list = document.querySelector('#' + this.getAttribute('list'));
                        if (list && list.options) {
                            return Array.prototype.map.call(list.options, function (opt) {
                                return opt.value;
                            });
                        }
                    } else if (this.hasAttribute('options')) {
                        var options = this.getAttribute('options');
                        if (!Array.isArray(options)) {
                            options = options.split(' ');
                        }
                        return options;
                    }
                    return [];
                }
            },
            index: {
                enumerable: true,
                get: function () {
                    if (!this.__index) {
                        this.__index = buildIndex(this.data);
                    }
                    return this.__index;
                }
            },
            suggestionList: {
                enumerable: true,
                get: function () {
                    return this.shadowRoot.querySelector('ul');
                }
            },
            selectable: {
                enumerable: true,
                get: function () {
                    return this.shadowRoot.querySelector('b-selectable');
                }
            },
            input: {
                enumerable: true,
                get: function () {
                    return this.shadowRoot.querySelector('input[type=text]');
                }
            },
            suggestions: {
                enumerable: true,
                get: function () {
                    return this.shadowRoot.querySelector('b-repeat');
                }
            },
            attachedCallback: {
                enumerable: true,
                value: function () {
                    this.input.addEventListener('input', this.onInputChange.bind(this), false);
                    this.input.addEventListener('focus', this.onInputFocus.bind(this), false);
                    this.input.addEventListener('blur', this.onInputBlur.bind(this), false);
                    this.selectable.addEventListener('mousedown', this.onSuggestionPick.bind(this), false);
                    this.selectable.addEventListener('b-activate', this.pickSuggestion.bind(this), false);
                }
            },
            handleAria: {
                enumerable: true,
                value: function () {
                    this.setAttribute('role', 'combobox');
                    this.setAttribute('aria-autocomplete', 'list');
                }
            },
            onInputFocus: {
                enumerable: true,
                value: function (e) {
                    this.keydownListener = this.keydownHandler.bind(this);
                    this.input.addEventListener('keydown', this.keydownListener, false);
                }
            },
            onInputBlur: {
                enumerable: true,
                value: function (e) {
                    if (this.cancelBlur) {
                        this.cancelBlur = false;
                        return;
                    }
                    this.input.removeEventListener('keydown', this.keydownListener, false);
                    this.hideSuggestionList();
                }
            },
            onSuggestionPick: {
                enumerable: true,
                value: function (e) {
                    e.preventDefault();
                    this.cancelBlur = true;
                }
            },
            keydownHandler: {
                enumerable: true,
                value: function (e) {
                    e.stopPropagation();
                    switch (e.keyCode) {
                    case KEY.ENTER: {
                            this.selectable.activate();
                            break;
                        }
                    case KEY.DOWN: {
                            if (!this.areSuggestionsVisible()) {
                                this.showSuggestionList();
                            } else {
                                this.selectable.selectNextItem();
                            }
                            break;
                        }
                    case KEY.UP: {
                            if (!this.areSuggestionsVisible()) {
                                this.showSuggestionList();
                            } else {
                                this.selectable.selectPreviousItem();
                            }
                            break;
                        }
                    default:
                        return;
                    }
                    e.preventDefault();
                }
            },
            onInputChange: {
                enumerable: true,
                value: function (e) {
                    e.stopPropagation();
                    if (!this.areSuggestionsVisible()) {
                        this.showSuggestionList();
                        this.input.focus();
                    } else {
                        this.refreshSuggestionList();
                    }
                    this.selectFirstSuggestion();
                }
            },
            filterOptions: {
                enumerable: true,
                value: function () {
                    var query = this.input.value;
                    if (!query)
                        return this.data;
                    return find(query, this.index, this.data);
                }
            },
            paintSuggestionList: {
                enumerable: true,
                value: function () {
                    this.selectable.unselect();
                    var sugList = this.suggestionList;
                    while (sugList.childNodes.length > 0) {
                        sugList.removeChild(sugList.childNodes[0]);
                    }
                    this.filterOptions().forEach(function (val) {
                        var tag = document.createElement('li');
                        tag.innerHTML = val;
                        sugList.appendChild(tag);
                    });
                }
            },
            refreshSuggestionList: {
                enumerable: true,
                value: function () {
                    this.paintSuggestionList();
                }
            },
            toggleSuggestionList: {
                enumerable: true,
                value: function (e) {
                    if (e) {
                        e.stopPropagation();
                    }
                    this.areSuggestionsVisible() ? this.hideSuggestionList() : this.showSuggestionList();
                    this.input.focus();
                }
            },
            showSuggestionList: {
                enumerable: true,
                value: function () {
                    this.paintSuggestionList();
                    this.selectable.setAttribute('visible', '');
                }
            },
            hideSuggestionList: {
                enumerable: true,
                value: function () {
                    if (this.areSuggestionsVisible()) {
                        this.selectable.removeAttribute('visible');
                    }
                }
            },
            selectFirstSuggestion: {
                enumerable: true,
                value: function () {
                    this.selectable.selectFirst();
                }
            },
            areSuggestionsVisible: {
                enumerable: true,
                value: function () {
                    return this.selectable.hasAttribute('visible');
                }
            },
            pickSuggestion: {
                enumerable: true,
                value: function (e) {
                    this.cancelBlur = false;
                    this.input.value = this.getItemValue(e.detail.item);
                    this.hideSuggestionList();
                }
            },
            getItemValue: {
                enumerable: true,
                value: function (itemIndex) {
                    return this.shadowRoot.querySelectorAll('li')[itemIndex].innerHTML;
                }
            }
        })
    });
}());