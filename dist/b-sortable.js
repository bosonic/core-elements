(function () {
    function closest(el, selector, root) {
        if (selector == '*')
            return el;
        if (!el)
            return null;
        root = root || document;
        selector = selector.split('.');
        var tag = selector.shift().toUpperCase(), re = new RegExp('\\s(' + selector.join('|') + ')\\s', 'g');
        while (el !== root) {
            if ((tag === '' || el.nodeName == tag) && (!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)) {
                return el;
            }
            el = el.parentNode;
        }
        return null;
    }
    function ghostInBottom(root, evt) {
        var last = root.lastElementChild.getBoundingClientRect();
        return evt.clientY - (last.top + last.height) > 5;
    }
    var GHOST_CLASS = 'sortable-ghost', EXPANDO = 'sortable' + new Date().getTime(), activeGroup, currentDrag, isIE = !!document.createElement('div').dragDrop;
    window.BSortable = document.registerElement('b-sortable', {
        prototype: Object.create(HTMLElement.prototype, {
            handle: {
                enumerable: true,
                get: function () {
                    return this.hasAttribute('handle') ? this.getAttribute('handle') : null;
                }
            },
            draggable: {
                enumerable: true,
                get: function () {
                    return this.hasAttribute('draggable') ? this.getAttribute('draggable') : this.root.children[0] && this.root.children[0].nodeName || (/[uo]l/i.test(this.root.nodeName) ? 'li' : '*');
                }
            },
            createdCallback: {
                enumerable: true,
                value: function () {
                    this.root = this.firstElementChild;
                    this.group = this.hasAttribute('group') ? this.getAttribute('group') : Math.random();
                    this.root[EXPANDO] = this.group;
                    this.bindListeners();
                    this.addRootListeners();
                }
            },
            bindListeners: {
                enumerable: true,
                value: function () {
                    this.b = {};
                    [
                        'onTapStart',
                        'onDragOver',
                        'onDragStart',
                        'onDrop'
                    ].forEach(function (fnName) {
                        this.b[fnName] = this[fnName].bind(this);
                    }, this);
                }
            },
            addRootListeners: {
                enumerable: true,
                value: function () {
                    this.root.addEventListener('mousedown', this.b.onTapStart, false);
                    this.root.addEventListener('touchstart', this.b.onTapStart, false);
                    if (isIE)
                        this.root.addEventListener('selectstart', this.b.onTapStart, false);
                    this.root.addEventListener('dragover', this.b.onDragOver, false);
                    this.root.addEventListener('dragenter', this.b.onDragOver, false);
                }
            },
            onTapStart: {
                enumerable: true,
                value: function (evt) {
                    console.log('onTapStart');
                    var touch = evt.touches && evt.touches[0], target = (touch || evt).target;
                    if (this.handle) {
                        target = closest(target, this.handle, this.root);
                    }
                    target = closest(target, this.draggable, this.root);
                    if (target && evt.type == 'selectstart') {
                        if (target.tagName != 'A' && target.tagName != 'IMG') {
                            target.dragDrop();
                        }
                    }
                    if (target && !currentDrag && target.parentNode === this.root) {
                        currentDrag = target;
                        currentDrag.draggable = true;
                        activeGroup = this.group;
                        if (touch) {
                            tapEvt = {
                                target: target,
                                clientX: touch.clientX,
                                clientY: touch.clientY
                            };
                            this.onDragStart(tapEvt, true);
                            evt.preventDefault();
                        }
                        document.addEventListener('mouseup', this.b.onDrop, false);
                        document.addEventListener('touchend', this.b.onDrop, false);
                        document.addEventListener('touchcancel', this.b.onDrop, false);
                        this.root.addEventListener('dragstart', this.b.onDragStart, false);
                        this.root.addEventListener('dragend', this.b.onDrop, false);
                        document.addEventListener('dragover', this.onGlobalDragOver, false);
                        this.emptySelection();
                    }
                }
            },
            onDragStart: {
                enumerable: true,
                value: function (evt, isTouch) {
                    this.removeUpListeners();
                    if (isTouch) {
                    } else {
                        evt.dataTransfer.effectAllowed = 'move';
                        evt.dataTransfer.setData('Text', currentDrag.textContent);
                        document.addEventListener('drop', this.b.onDrop, false);
                    }
                    setTimeout(function () {
                        currentDrag.classList.add(GHOST_CLASS);
                    });
                }
            },
            onDragOver: {
                enumerable: true,
                value: function (evt) {
                    if (activeGroup !== this.group || evt.rootEl !== void 0 && evt.rootEl !== this.root)
                        return;
                    var target = closest(evt.target, this.draggable, this.root);
                    if (this.root.children.length === 0 || this.root === evt.target && ghostInBottom(this.root, evt)) {
                        this.root.appendChild(currentDrag);
                    } else if (target && target !== currentDrag) {
                        var after, drag = currentDrag, rect = target.getBoundingClientRect(), css = document.defaultView.getComputedStyle(target, null), width = rect.right - rect.left, height = rect.bottom - rect.top, floating = /left|right|inline/.test(css.cssFloat + css.display), isWide = target.offsetWidth > drag.offsetWidth, isLong = target.offsetHeight > drag.offsetHeight, halfway = (floating ? (evt.clientX - rect.left) / width : (evt.clientY - rect.top) / height) > 0.5, nextSibling = target.nextElementSibling, prevSibling = target.previousElementSibling;
                        if (floating) {
                            after = prevSibling === drag && !isWide || halfway && isWide;
                        } else {
                            after = nextSibling !== drag && !isLong || halfway && isLong;
                        }
                        if (after && !nextSibling) {
                            this.root.appendChild(currentDrag);
                        } else {
                            target.parentNode.insertBefore(currentDrag, after ? nextSibling : target);
                        }
                    }
                }
            },
            onGlobalDragOver: {
                enumerable: true,
                value: function (evt) {
                    evt.dataTransfer.dropEffect = 'move';
                    evt.preventDefault();
                }
            },
            onDrop: {
                enumerable: true,
                value: function (evt) {
                    document.removeEventListener('drop', this.b.onDrop, false);
                    document.removeEventListener('dragover', this.onGlobalDragOver, false);
                    this.root.removeEventListener('dragstart', this.b.onDragStart, false);
                    this.root.removeEventListener('selectstart', this.b.onTapStart, false);
                    this.root.removeEventListener('dragend', this.b.onDrop, false);
                    this.removeUpListeners();
                    if (!evt)
                        return;
                    evt.preventDefault();
                    evt.stopPropagation();
                    if (currentDrag) {
                        currentDrag.draggable = false;
                        currentDrag.classList.remove(GHOST_CLASS);
                    }
                    currentDrag = null;
                    activeGroup = null;
                }
            },
            emptySelection: {
                enumerable: true,
                value: function () {
                    try {
                        if (document.selection) {
                            document.selection.empty();
                        } else {
                            window.getSelection().removeAllRanges();
                        }
                    } catch (err) {
                    }
                }
            },
            removeUpListeners: {
                enumerable: true,
                value: function () {
                    document.removeEventListener('mouseup', this.b.onDrop, false);
                    document.removeEventListener('touchend', this.b.onDrop, false);
                    document.removeEventListener('touchcancel', this.b.onDrop, false);
                }
            },
            onUpdate: {
                enumerable: true,
                value: function (evt) {
                    evt.stopPropagation();
                    var detail = { item: evt.item };
                    this.dispatchEvent(new CustomEvent('update', { detail: detail }));
                }
            }
        })
    });
    ;
}());