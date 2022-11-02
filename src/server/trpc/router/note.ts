import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const noteRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany({});
  }),
  getAllWithSearch: publicProcedure
    .input(
      z.object({
        search: z.string().nullish(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: {
          OR: [
            { title: { contains: input.search ?? "", mode: "insensitive" } },
            { content: { contains: input.search ?? "", mode: "insensitive" } },
          ],
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({ data: input });
    }),
});
