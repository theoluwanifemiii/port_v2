import { httpRouter } from "convex/server";
import { sendEmail } from "./emailActions";
const http = httpRouter();
http.route({
    path: "/send-email",
    method: "POST",
    handler: sendEmail,
});
http.route({
    path: "/send-email",
    method: "OPTIONS",
    handler: sendEmail,
});
export default http;
