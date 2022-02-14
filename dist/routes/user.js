"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var useroperations_model_1 = require("../useroperations.model");
var router = express_1.default.Router();
router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});
var client = require("../connection");
var cors_1 = __importDefault(require("cors"));
var corsOption = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
};
router.use((0, cors_1.default)(corsOption));
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.query("select  *,(SELECT array_to_json(array_agg( row_to_json(address.*))) as address  from address where users.userid=address.userid) from  users;\n", function (err, result) {
                    if (!err) {
                        res.send(result.rows);
                    }
                })];
            case 1:
                _a.sent();
                client.end;
                return [2 /*return*/];
        }
    });
}); });
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, innerQuery, userId, classobj, arr, insertQuery;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.body;
                innerQuery = "";
                classobj = new useroperations_model_1.usersOperations(req.body);
                classobj.user;
                arr = [
                    req.body.mailingdetails,
                    req.body.billingdetails,
                    req.body.residencydetails,
                ];
                insertQuery = "insert into users(suffix,firstname,middlename,lastname,email,phonenumber)\n                       values('".concat(user.suffix, "', '").concat(classobj.capitalize(classobj.user.firstname), "','").concat(user.middlename, "', '").concat(classobj.capitalize(classobj.user.lastname), "', '").concat(user.email, "','").concat(user.phonenumber, "') RETURNING userid");
                return [4 /*yield*/, client.query(insertQuery, function (error, response) {
                        if (!error) {
                            userId = response.rows[0].userid;
                            var commonQuery = "insert into address(userid,addresstype,address,city,state,postcode) values";
                            for (var i = 0; i < arr.length; i++) {
                                innerQuery += "('".concat(userId, "','").concat(arr[i].addressType, "','").concat(arr[i].address, "','").concat(arr[i].city, "','").concat(arr[i].state, "','").concat(arr[i].postcode, "')");
                                if (i < arr.length - 1) {
                                    innerQuery += ",";
                                }
                            }
                            var finalQuery = commonQuery + innerQuery;
                            client.query(finalQuery, function (err, result) {
                                if (!err) {
                                    res.send("Inserted was successful");
                                }
                                else {
                                    console.log(err.message);
                                }
                            });
                            client.end;
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get("/:userid", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.query("   select *,(SELECT array_to_json(array_agg( row_to_json(address.*))) as address \n  from address where users.userid=".concat(req.params.userid, " and address.userid=").concat(req.params.userid, ") from users where userid =").concat(req.params.userid, ";\n"), function (err, result) {
                    if (!err) {
                        res.status(200).send(result.rows[0]);
                    }
                })];
            case 1:
                _a.sent();
                client.end;
                return [2 /*return*/];
        }
    });
}); });
router.put("/:userid", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var billing, residency, mailing, addressarray, updatedQuery, query, userId, user, Query, updateQuery, i, UpdateQuery;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                billing = req.body.billingdetails;
                residency = req.body.residencydetails;
                mailing = req.body.mailingdetails;
                addressarray = [billing, residency, mailing];
                updatedQuery = "";
                query = "";
                user = req.body;
                Query = "";
                updateQuery = "update users\n                     set suffix='".concat(user.suffix, "',\n                     phonenumber='").concat(user.phonenumber, "',\n                     firstname = '").concat(user.firstname, "',\n                     middlename = '").concat(user.middlename, "',\n                      lastname = '").concat(user.lastname, "',\n                     email = '").concat(user.email, "'\n                     where userid = ").concat(user.userid, " ;");
                return [4 /*yield*/, client.query(updateQuery, function (err, result) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (!err) {
                                return [2 /*return*/, res.send("Update was successful")];
                            }
                            else {
                                console.log(err.message);
                            }
                            client.end;
                            return [2 /*return*/];
                        });
                    }); })];
            case 1:
                _a.sent();
                userId = user.userid;
                for (i = 0; i < addressarray.length; i++) {
                    query += "update  address set  addresstype='".concat(addressarray[i].addresstype, "',\n    address='").concat(addressarray[i].address, "',city='").concat(addressarray[i].city, "',\n    state='").concat(addressarray[i].state, "',postcode='").concat(addressarray[i].postcode, "' \n    where id=").concat(addressarray[i].id, " and userid= ").concat(user.userid, "; ");
                }
                UpdateQuery = query;
                client.query(UpdateQuery, function (err, result) {
                    if (!err) {
                    }
                    else {
                        console.log(err.message);
                    }
                    client.end;
                });
                return [2 /*return*/];
        }
    });
}); });
router.delete("/:userid", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var insertQuery;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                insertQuery = "delete from address  where userid=".concat(req.params.userid, " ;delete from users where userid=").concat(req.params.userid);
                return [4 /*yield*/, client.query(insertQuery, function (err, result) {
                        if (!err) {
                            res.send("Deleted Successfully");
                        }
                        else {
                            console.log(err.message);
                        }
                    })];
            case 1:
                _a.sent();
                client.end;
                return [2 /*return*/];
        }
    });
}); });
client.connect();
module.exports = router;
//# sourceMappingURL=user.js.map