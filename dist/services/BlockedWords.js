"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function evaluate(text) {
    const patterns = /[#+]|onlyfans/i;
    const regexp = new RegExp(patterns);
    return regexp.test(text);
}
exports.default = {
    evaluate
};
