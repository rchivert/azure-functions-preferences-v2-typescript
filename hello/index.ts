// module.exports = async function Run (context: any, req: any) {
export async function run  (context: any, req: any) {

    context.log("JavaScript HTTP trigger function 'hello' processed a request.");

    // get OAuth info (used by webpart)
    const url      = process.env.WEBAPI_APPID_URI;
    const appid    = process.env.WEBAPI_APPID;

    const data = {
        // tslint:disable-next-line:object-literal-key-quotes
        "url" : url,
        // tslint:disable-next-line:object-literal-key-quotes
        "appid" : appid
    };

    context.res =   {
        // status: 200, /* Defaults to 200 */
        body:  data
        };
}