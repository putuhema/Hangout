import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";
import { Webhook, WebhookRequiredHeaders } from "svix";

const prisma = new PrismaClient();

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!Boolean(id)) {
      return next();
    }
    const user = await prisma.user.findUnique({
      where: {
        externalId: String(id),
      },
      include: {
        event: {
          orderBy: {
            date: "asc",
          },
        },
        favorites: {
          include: {
            event: true,
          },
        },
        pointsTransaction: true,
      },
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getReferrals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { externalId } = req.query;
    const user = await prisma.user.findFirst({
      where: {
        externalId: String(externalId),
      },
      include: {
        referral: {
          include: {
            event: true,
          },
        },
      },
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const follow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { followerId, followingId } = req.body;
    await prisma.follows.create({
      data: {
        followerId: Number(followerId),
        followingId: Number(followingId),
      },
    });
  } catch (err) {
    next(err);
  }
};

export const unfollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { followerId, followingId } = req.body;
    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: Number(followerId),
          followingId: Number(followingId),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const webhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const headers = req.headers;
    if (!headers) {
      return;
    }
    const head = {
      "svix-id": headers["svix-id"] as string,
      "svix-timestamp": headers["svix-timestamp"] as string,
      "svix-signature": headers["svix-signature"] as string,
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!);
    const evt = wh.verify(
      JSON.stringify(payload),
      head as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      profile_image_url,
      username,
    } = evt.data;
    const email = (email_addresses as Email[])[0].email_address;
    // Handle the webhook
    const eventType: EventType = evt.type;
    if (eventType === "user.created" || eventType === "user.updated") {
      await prisma.user.upsert({
        where: {
          externalId: id as string,
        },
        create: {
          externalId: id as string,
          username: username as string,
          firstname: first_name as string,
          lastname: last_name as string,
          imageUrl: profile_image_url as string,
          email,
          points: 0,
        },
        update: {
          username: username as string,
          firstname: first_name as string,
          lastname: last_name as string,
          imageUrl: profile_image_url as string,
          email,
        },
      });
    }
    res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

type EventType = "user.created" | "user.updated" | "*";
type Email = {
  email_address: string;
  id: string;
};
type Event = {
  data: Record<string, string | number | Email[]>;
  object: "event";
  type: EventType;
};
