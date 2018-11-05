"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const performance_now_1 = __importDefault(require("performance-now"));
const cosmosClient_1 = require("../common/cosmosClient");
function run(context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log("Entering get-preferences operation for Personalization");
        // get the user id from url
        const id = req.params.id;
        context.log("id = " + id);
        const client = cosmosClient_1.MySingletonCosmosClient.GetClient();
        try {
            const startedAt = performance_now_1.default();
            if (id !== "") {
                context.log("before item GET");
                const item = yield client.database(cosmosClient_1.MySingletonCosmosClient.database).container(cosmosClient_1.MySingletonCosmosClient.collection).item(id);
                context.log("after item GET");
                const i = yield item.read();
                context.log("after i READ ");
                const endedAt = performance_now_1.default();
                const elapsedPost = Math.round(endedAt - startedAt);
                const userPersonalDataWithTimings = i.body;
                userPersonalDataWithTimings.duration = elapsedPost;
                userPersonalDataWithTimings.preferredCosmosDBLocation = cosmosClient_1.MySingletonCosmosClient.location;
                userPersonalDataWithTimings.actualReadOrWriteEndPoint = yield client.getReadEndpoitn();
                context.res.body = userPersonalDataWithTimings;
            }
            else {
                context.res = {
                    status: 400,
                    body: `$"No records found for the id: {id}"`
                };
            }
        }
        catch (e) {
            context.log(e);
            context.res.body = e;
        }
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map