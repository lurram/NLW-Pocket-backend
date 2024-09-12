import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goal";
import { createGoalCompletionRoute } from "./routes/create-completion";
import { getGoalPendingRoute } from "./routes/get-pending-goals";
import { getWeekSummaryRoute } from "./routes/get-week-summary";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getGoalPendingRoute);
app.register(getWeekSummaryRoute);
app.register(createGoalRoute);
app.register(createGoalCompletionRoute);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP server running");
  });
