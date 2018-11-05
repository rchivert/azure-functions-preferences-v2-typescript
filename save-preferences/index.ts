import now from "performance-now";
import { MySingletonCosmosClient, ICosmosTimings } from "../common/cosmosClient";

export async function run (context: any, req: any) {
    context.log("Entering save-preferences operation for the Personalization API.");

    const client = MySingletonCosmosClient.GetClient();

    try {
        const startedAt = now();
        const profile = context.req.body;
        context.log(JSON.stringify(profile));

        // upsert document for given id
        //
        const response = await client.database(MySingletonCosmosClient.database).container(MySingletonCosmosClient.collection).items.upsert(profile);
        const endedAt = now();
        const elapsedPost = Math.round(endedAt - startedAt);

        const url = await client.getWriteEndpoint() ;
        const cosmosTimingData: ICosmosTimings = {duration: elapsedPost, preferredCosmosDBLocation: MySingletonCosmosClient.location, actualReadOrWriteEndPoint: url};
        context.res = {
            status: 200,
            body: cosmosTimingData
            };
        }
    catch (e) {
        context.log(e);
        }
}