// 加载js
let scriptLoaded = {};
export function loadScript(code, url) {
  return new Promise((resolve, reject) => {
    if (typeof scriptLoaded[code] === "undefined") {
      let script = document.createElement("script");
      script.src = url;
      document.body.appendChild(script);

      script.onload = function() {
        scriptLoaded[code] = true;
        resolve({code})
      };
      script.onerror = function(error) {
        reject(error)
      }
    } else {
      resolve()
    }
  })
}
