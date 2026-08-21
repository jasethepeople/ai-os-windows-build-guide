import { COOKIE_NAME } from "@shared/const";
import { nanoid } from "nanoid";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createBugReport } from "./db";

const optionalText = (maxLength: number) => z.string().trim().max(maxLength).optional();

export const bugReportInput = z.object({
  category: z.enum(["build", "launch", "integration", "documentation", "other"]),
  severity: z.enum(["low", "normal", "high", "critical"]),
  title: z.string().trim().min(8, "Use at least 8 characters for the issue title.").max(180),
  description: z.string().trim().min(30, "Please provide at least 30 characters so the issue can be investigated.").max(6000),
  reproductionSteps: optionalText(6000),
  environmentDetails: optionalText(1000),
  commandUsed: optionalText(2000),
  contactEmail: z.union([z.literal(""), z.string().trim().email("Enter a valid email address.").max(320)]).optional(),
  consent: z.boolean().refine(value => value === true, {
    message: "Please confirm that your report contains no passwords, tokens, or private keys.",
  }),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  bugReports: router({
    submit: publicProcedure.input(bugReportInput).mutation(async ({ input }) => {
      const referenceCode = `BGR-${nanoid(8).toUpperCase()}`;
      await createBugReport({
        referenceCode,
        category: input.category,
        severity: input.severity,
        title: input.title,
        description: input.description,
        reproductionSteps: input.reproductionSteps || null,
        environmentDetails: input.environmentDetails || null,
        commandUsed: input.commandUsed || null,
        contactEmail: input.contactEmail || null,
      });

      return { success: true, referenceCode } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
