import { CosmosClient, CosmosClientOptions, RetryOptions, ConnectionPolicy } from "@azure/cosmos";


export interface ICosmosDataWithTimings {
    "links": string[];
    "color": string;
    "id": string;
    "duration": number;
    "preferredCosmosDBLocation": string;
    "actualReadOrWriteEndPoint": string;
    }

export interface ICosmosTimings {
        "duration": number;
        "preferredCosmosDBLocation": string;
        "actualReadOrWriteEndPoint": string;
        }

export class MySingletonCosmosClient
    {
    private static _client: CosmosClient ;

    public static location: string;
    public static database: string;
    public static collection: string;

    public static GetClient(): CosmosClient
        {
        if (this._client === undefined)
            {
            const disableSSL        = process.env.COSMOS_DB_DISABLE_SSL;
            const preferredLocation = process.env.COSMOS_DB_PREFERRED_LOCATION; //  "West US" | "East US" | "West Europe" | "Japan East" | "Brazil South" | "Australia East" | "South India"
            const url               = process.env.COSMOS_DB_HOSTURL;
            const key               = process.env.COSMOS_DB_KEY;
            this.database          = process.env.COSMOS_DB_PERSONALIZATION_DATABASE as string;
            this.collection        = process.env.COSMOS_DB_PERSONALIZATION_COLLECTION as string;

            this.location = preferredLocation ? preferredLocation : "East US"; // default to "East US" if property not set
            const locations: string[] = new Array(this.location);
            const retryOption: RetryOptions = new RetryOptions(9, 5000, 2);

            const connectionPolicy = new ConnectionPolicy();
            connectionPolicy.DisableSSLVerification = (disableSSL === "true");
            connectionPolicy.EnableEndpointDiscovery = true;
            connectionPolicy.PreferredLocations = locations;
            connectionPolicy.UseMultipleWriteLocations = true;
            connectionPolicy.RetryOptions = retryOption;

            const clientoptions: CosmosClientOptions = {
                endpoint: url as string,
                auth: {masterKey: key},
                connectionPolicy
                };

            this._client = new CosmosClient(clientoptions);
            }

        return this._client;
        }
    }