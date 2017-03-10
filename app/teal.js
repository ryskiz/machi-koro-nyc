export let copyto = function(obj, res) {
    if (obj == null || typeof obj !== 'object') return obj;
    if (obj instanceof Array) {
        for (var i = obj.length - 1; i >= 0; --i)
            res[i] = $t.copy(obj[i]);
    }
    else {
        for (var i in obj) {
            if (obj.hasOwnProperty(i))
                res[i] = $t.copy(obj[i]);
        }
    }
    return res;
}

export let copy = function(obj) {
    if (!obj) return obj;
    return copyto(obj, new obj.constructor());
}

export let element = function(name, props, place) {
    var dom = document.createElement(name);
    if (props) for (var i in props) dom.setAttribute(i, props[i]);
    if (place) place.appendChild(dom);
    return dom;
}

export let inner = function(obj, sel) {
    sel.appendChild(typeof obj == 'string' ? document.createTextNode(obj) : obj);
}

export let id = function(id) {
    return document.getElementById(id);
}

export let set = function(sel, props) {
    for (var i in props) sel.setAttribute(i, props[i]);
    return sel;
}

export let clasz = function(sel, oldclass, newclass) {
    var oc = oldclass ? oldclass.split(/\s+/) : [],
        nc = newclass ? newclass.split(/\s+/) : [],
        classes = (sel.getAttribute('class') || '').split(/\s+/);
    if (!classes[0]) classes = [];
    for (var i in oc) {
        var ind = classes.indexOf(oc[i]);
        if (ind >= 0) classes.splice(ind, 1);
    }
    for (var i in nc) {
        if (nc[i] && classes.indexOf(nc[i]) < 0) classes.push(nc[i]);
    }
    sel.setAttribute('class', classes.join(' '));
}

export let empty = function(sel) {
    if (sel.childNodes)
        while (sel.childNodes.length)
            sel.removeChild(sel.firstChild);
}

export let remove = function(sel) {
    if (sel) {
        if (sel.parentNode) sel.parentNode.removeChild(sel);
        else for (var i = sel.length - 1; i >= 0; --i)
            sel[i].parentNode.removeChild(sel[i]);
    }
}

export let bind = function(sel, eventname, func, bubble) {
    if (eventname.constructor === Array) {
        for (var i in eventname)
            sel.addEventListener(eventname[i], func, bubble ? bubble : false);
    }
    else
        sel.addEventListener(eventname, func, bubble ? bubble : false);
}

export let unbind = function(sel, eventname, func, bubble) {
    if (eventname.constructor === Array) {
        for (var i in eventname)
            sel.removeEventListener(eventname[i], func, bubble ? bubble : false);
    }
    else
        sel.removeEventListener(eventname, func, bubble ? bubble : false);
}

export let one = function(sel, eventname, func, bubble) {
    var one_func = function(e) {
        func.call(this, e);
        unbind(sel, eventname, one_func, bubble);
    };
    bind(sel, eventname, one_func, bubble);
}

export let raise_event = function(sel, eventname, bubble, cancelable) {
    var evt = document.createEvent('UIEvents');
    evt.initEvent(eventname, bubble == undefined ? true : bubble,
        cancelable == undefined ? true : cancelable);
    sel.dispatchEvent(evt);
}

if (!document.getElementsByClassName) {
    let get_elements_by_class = function(classes, node) {
        var node = node || document,
            list = node.getElementsByTagName('*'),
            cl = classes.split(/\s+/),
            result = [];

        for (var i = list.length - 1; i >= 0; --i) {
            for (var j = cl.length - 1; j >= 0; --j) {
                var clas = list[i].getAttribute('class');
                if (clas && clas.search('\\b' + cl[j] + '\\b') != -1) {
                    result.push(list[i]);
                    break;
                }
            }
        }
        return result;
    }
}
else {
    let get_elements_by_class = function(classes, node) {
        return (node || document).getElementsByClassName(classes);
    }
}

export let rpc = function(params, callback) {
    var ajax = new XMLHttpRequest(), ret;
    ajax.open("post", 'f', true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4)
            callback.call(ajax, JSON.parse(ajax.responseText));
    };
    ajax.send(JSON.stringify(params));
}

export let uuid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export let get_url_params = function() {
    var params = window.location.search.substring(1).split("&");
    var res = {};
    for (var i in params) {
        var keyvalue = params[i].split("=");
        res[keyvalue[0]] = decodeURI(keyvalue[1]);
    }
    return res;
}

export let get_mouse_coords = function(ev) {
    var touches = ev.changedTouches;
    if (touches) return { x: touches[0].clientX, y: touches[0].clientY };
    return { x: ev.clientX, y: ev.clientY };
}