"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cosmos_1 = require("@azure/cosmos");
class MySingletonCosmosClient {
    static GetClient() {
        if (this._client === undefined) {
            const disableSSL = process.env.COSMOS_DB_DISABLE_SSL;
            const preferredLocation = process.env.COSMOS_DB_PREFERRED_LOCATION; //  "West US" | "East US" | "West Europe" | "Japan East" | "Brazil South" | "Australia East" | "South India"
            const url = process.env.COSMOS_DB_HOSTURL;
            const key = process.env.COSMOS_DB_KEY;
            this.database = process.env.COSMOS_DB_PERSONALIZATION_DATABASE;
            this.collection = process.env.COSMOS_DB_PERSONALIZATION_COLLECTION;
            this.location = preferredLocation ? preferredLocation : "East US"; // default to "East US" if property not set
            const locations = new Array(this.location);
            const retryOption = new cosmos_1.RetryOptions(9, 5000, 2);
            const connectionPolicy = new cosmos_1.ConnectionPolicy();
            connectionPolicy.DisableSSLVerification = (disableSSL === "true");
            connectionPolicy.EnableEndpointDiscovery = true;
            connectionPolicy.PreferredLocations = locations;
            connectionPolicy.UseMultipleWriteLocations = true;
            connectionPolicy.RetryOptions = retryOption;
            const clientoptions = {
                endpoint: url,
                auth: { masterKey: key },
                connectionPolicy
            };
            this._client = new cosmos_1.CosmosClient(clientoptions);
        }
        return this._client;
    }
}
exports.MySingletonCosmosClient = MySingletonCosmosClient;
//# sourceMappingURL=cosmosClient.js.map