var input = document.querySelector('[data-input]');
var output = document.querySelector('[data-output]');
var copy = document.querySelector('[data-copy]');

function convert(string) {
    var escaped = [];

    for (var char of string) {
        escaped.push('"\\' + char.codePointAt().toString(16) + '"');
    }

    return escaped.join(' ');
}

function syncOutputWithInput() {
    output.value = 'content: ' + (convert(input.value) || '""') + ';';
}

// On input
input.addEventListener('input', syncOutputWithInput);

// Initially
syncOutputWithInput();

// Copy to clipboard
copy.addEventListener('click', function() {
    output.select();

    try {
        if (document.execCommand('copy')) {
            copy.classList.add('-success');

            setTimeout(function() {
                copy.classList.remove('-success');
            }, 2000);
        }
    } catch (e) {
        console.error(e);
    }
});
