"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersOperations = void 0;
var usersOperations = /** @class */ (function () {
    function usersOperations(user) {
        this.user = user;
    }
    usersOperations.prototype.capitalize = function (param) {
        return param.charAt(0).toUpperCase() + param.slice(1).toLowerCase();
    };
    return usersOperations;
}());
exports.usersOperations = usersOperations;
//# sourceMappingURL=useroperations.model.js.map