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
        context.log("Entering save-preferences operation for the Personalization API.");
        const client = cosmosClient_1.MySingletonCosmosClient.GetClient();
        try {
            const startedAt = performance_now_1.default();
            const profile = context.req.body;
            context.log(JSON.stringify(profile));
            // upsert document for given id
            //
            const response = yield client.database(cosmosClient_1.MySingletonCosmosClient.database).container(cosmosClient_1.MySingletonCosmosClient.collection).items.upsert(profile);
            const endedAt = performance_now_1.default();
            const elapsedPost = Math.round(endedAt - startedAt);
            const url = yield client.getWriteEndpoint();
            const cosmosTimingData = { duration: elapsedPost, preferredCosmosDBLocation: cosmosClient_1.MySingletonCosmosClient.location, actualReadOrWriteEndPoint: url };
            context.res = {
                status: 200,
                body: cosmosTimingData
            };
        }
        catch (e) {
            context.log(e);
        }
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map