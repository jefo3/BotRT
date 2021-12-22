"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function evaluate(texto) {
    const patterns = /[#+]|onlyfans/i;
    const regexp = new RegExp(patterns);
    return regexp.test(texto);
}
exports.default = {
    evaluate
};
