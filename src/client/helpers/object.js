export function jsonColorize(json, searchTerm = '') {
    const searchTermRegex = new RegExp(searchTerm, 'gi')
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'json-num';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-str';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-bool';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }

        if (searchTerm !== '' && searchTermRegex.test(match)) {
            cls = 'highlight'
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}