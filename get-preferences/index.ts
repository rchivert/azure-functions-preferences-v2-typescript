import now from "performance-now";
import { MySingletonCosmosClient, ICosmosDataWithTimings } from "../common/cosmosClient";

export async function run (context: any, req: any) {
    context.log("Entering get-preferences operation for Personalization");

    // get the user id from url
    const id = req.params.id;
    context.log("id = " + id);

    const client = MySingletonCosmosClient.GetClient();

    try
    {
    const startedAt = now();

    if (id !== "") {
        context.log("before item GET");
        const item = await client.database(MySingletonCosmosClient.database).container(MySingletonCosmosClient.collection).item(id);
        context.log("after item GET");
        const i = await item.read<ICosmosDataWithTimings>();
        context.log("after i READ ");

        const endedAt = now();
        const elapsedPost = Math.round(endedAt - startedAt);

        const userPersonalDataWithTimings  = i.body as ICosmosDataWithTimings;
        userPersonalDataWithTimings.duration = elapsedPost;
        userPersonalDataWithTimings.preferredCosmosDBLocation = MySingletonCosmosClient.location;
        userPersonalDataWithTimings.actualReadOrWriteEndPoint = await client.getReadEndpoitn() ;

        context.res.body = userPersonalDataWithTimings;
        }
    else {
        context.res = {
                status: 400,
                body: `$"No records found for the id: {id}"`
            };
        }
    }
    catch (e)
        {
        context.log(e);
        context.res.body = e;
        }
}