webpackJsonpjwplayer([2], {
    /***/ 96: /***/ function(module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        !((__WEBPACK_AMD_DEFINE_ARRAY__ = []),
        (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
            // https://github.com/davidchambers/Base64.js
            // v0.3.0

            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

            function InvalidCharacterError(message) {
                this.message = message;
            }
            InvalidCharacterError.prototype = new Error();
            InvalidCharacterError.prototype.name = "InvalidCharacterError";

            // encoder
            // [https://gist.github.com/999166] by [https://github.com/nignag]
            window.btoa ||
                (window.btoa = function(input) {
                    var str = String(input);
                    for (
                        // initialize result and counter
                        var block, charCode, idx = 0, map = chars, output = "";
                        // if the next str index does not exist:
                        //   change the mapping table to "="
                        //   check if d has no fractional digits
                        str.charAt(idx | 0) || ((map = "="), idx % 1);
                        // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
                        output += map.charAt(63 & (block >> (8 - (idx % 1) * 8)))
                    ) {
                        charCode = str.charCodeAt((idx += 3 / 4));
                        if (charCode > 0xff) {
                            throw new InvalidCharacterError(
                                "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
                            );
                        }
                        block = (block << 8) | charCode;
                    }
                    return output;
                });

            // decoder
            // [https://gist.github.com/1020396] by [https://github.com/atk]
            window.atob ||
                (window.atob = function(input) {
                    var str = String(input).replace(/=+$/, "");
                    if (str.length % 4 == 1) {
                        throw new InvalidCharacterError(
                            "'atob' failed: The string to be decoded is not correctly encoded."
                        );
                    }
                    for (
                        // initialize result and counters
                        var bc = 0, bs, buffer, idx = 0, output = "";
                        // get next character
                        (buffer = str.charAt(idx++));
                        // character found in table? initialize bit storage and add its ascii value;
                        ~buffer &&
                        ((bs = bc % 4 ? bs * 64 + buffer : buffer),
                        // and if not first of each 4 characters,
                        // convert the first 8 bits to one ascii character
                        bc++ % 4)
                            ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
                            : 0
                    ) {
                        // try to find character in table (0-63, not found => -1)
                        buffer = chars.indexOf(buffer);
                    }
                    return output;
                });
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)),
        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

        /***/
    }
});
//# sourceMappingURL=polyfills.base64.c0525bf5836e1deca17d.map