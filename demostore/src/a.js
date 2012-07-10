(function(window) {

var account = 'UA-30836645-1'

// Find :site by inspecting the script that loaded us.
var scriptRe = /\/a\.js$/
  , scripts = document.getElementsByTagName('script')
  , script
  , s;

for (var i = 0; i < scripts.length; i++) {
    s = scripts[i]
    if (scriptRe.test(s.src)) {
        script = s;
        break
    }
}

if (!script) return;

// ###
// # Data
// ###

var mobified = 0
  , unmobified = 0
  , template
  , buildDate
  , loadTime
  , Mobify = window.Mobify;

if (Mobify.api) {
    var data = Mobify.evaluatedData;

    mobified = 1

    if (Mobify.bail) {
        unmobified = 1
        template = 'unmobify'
    } else {
        if (data) {
            var points = Mobify.timing.points;
            loadTime = Math.round((points[points.length - 1] - points[0]) / 100) * 100;
            template = data.bodyType || data.templateName || (data.content && data.content.templateName) || 'unknown'
        }
    }

    if (data) {
        buildDate = data.buildDate
    }
}

var src = script.src.split('/').slice(0, -1).join('/') + '/a.html'
        + '#u=' + encodeURIComponent(location)
        + '&m=' + mobified 
        + '&a=' + account
        + (document.referrer ? '&r=' + encodeURIComponent(document.referrer) : '')
        + (template ? '&t=' + encodeURIComponent(template) : '')
        + (buildDate ? '&b=' + buildDate : '')
        + (loadTime ? '&l=' + loadTime : '')

// console.log((src).split('#')[1].split('&').join('\n'))

// ###
// # Insertion
// ###

var iframe = document.createElement('iframe')
iframe.src = src
iframe.style.display = 'none';
iframe.id = '__mobify_analytics'

setTimeout(function insert() {
    var body = document.getElementsByTagName('body')[0];
    if (body) {
        body.appendChild(iframe);
    } else {
        setTimeout(insert, 100);
    }
}, 15);

})(this);