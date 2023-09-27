import fs, { unlinkSync } from "fs";
import path from "path";

import { promisify } from "util";
import { Request, Response, NextFunction } from "express";
import { $Enums, PrismaClient } from "@prisma/client";
import { Multer } from "multer";
import { isThisWeek, isToday, isTomorrow } from "date-fns";

const unlinkAsync = promisify(fs.unlink);

const prisma = new PrismaClient();

type Event = {
  id: number;
  name: string;
  location: string;
  description: string;
  imagePath: string;
  type: $Enums.PriceType;
  date: Date;
  time: string;
  category: string;
  price: number;
  userId: number;
};

const filterOnDate = (events: Event[], filter: string) => {
  let filteredEvents: Event[] = [];
  switch (filter) {
    case "0": {
      filteredEvents = events.filter((event) => isToday(event.date));
      break;
    }
    case "2": {
      filteredEvents = events.filter((event) => isTomorrow(event.date));
      break;
    }
    case "7": {
      filteredEvents = events.filter((event) => isThisWeek(event.date));
      break;
    }
    default: {
      filteredEvents = [];
    }
  }

  return filteredEvents;
};

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    });
    res.json(events);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getEventsOnCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, filter } = req.query;
    const events = await prisma.event.findMany({
      where: {
        category: category as string,
      },
      orderBy: {
        date: "asc",
      },
    });
    let filteredEvents: Event[] = [];
    if (filter === "all") {
      filteredEvents = events;
    } else {
      filteredEvents = filterOnDate(events, String(filter));
    }
    res.json(filteredEvents);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getEventsOnFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter } = req.query;
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    });

    let filteredEvents: Event[] = [];
    switch (filter) {
      case "0": {
        filteredEvents = events.filter((event) => isToday(event.date));
        break;
      }
      case "7": {
        filteredEvents = events.filter((event) => isThisWeek(event.date));
        break;
      }
      case "online": {
        filteredEvents = await prisma.event.findMany({
          where: {
            location: "online",
          },
        });
        break;
      }
      case "free": {
        filteredEvents = await prisma.event.findMany({
          where: {
            type: "free",
          },
        });
        break;
      }
      default: {
        filteredEvents = events;
      }
    }
    res.json(filteredEvents);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { eventId } = req.params;
    if (Number.isNaN(Number(eventId))) {
      return next();
    }
    const event = await prisma.event.findUnique({
      where: {
        id: Number(eventId),
      },
      include: {
        favorites: true,
        tag: true,
        user: {
          include: {
            followers: true,
          },
        },
        promo: true,
        reviews: {
          where: {
            parentReviewsId: {
              equals: null,
            },
          },
          include: {
            user: true,
            event: true,
          },
        },
      },
    });

    res.json(event);
  } catch (err) {
    next(err);
  }
};

export const getReviewsOnEventId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const event = await prisma.event.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        reviews: {
          where: {
            parentReviewsId: {
              equals: null,
            },
          },
        },
      },
    });
    const reviews = event.map((e) => e.reviews).flat();

    res.json({ event, reviews });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { eventId } = req.params;
    if (Number.isNaN(Number(eventId))) {
      return next();
    }
    const favorites = await prisma.favorites.findFirst({
      where: {
        eventId: Number(eventId),
      },
    });

    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

export const getEventByFullText = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q, date, price, category } = req.query;

    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    });
    let isFiltering = false;
    let filteredEvents: Event[] = date || price || category || q ? events : [];
    if (date) {
      isFiltering = true;
      filteredEvents = filterOnDate(events, String(date));
    }
    if (price) {
      isFiltering = true;
      filteredEvents = filteredEvents.filter((event) => event.type === price);
    }
    if (category) {
      isFiltering = true;
      filteredEvents = filteredEvents.filter(
        (event) => event.category === category
      );
    }

    if (q) {
      isFiltering = true;
      filteredEvents = filteredEvents.filter((event) =>
        event.name.toLowerCase().includes(q.toString().toLowerCase())
      );
    }
    if (!isFiltering) filteredEvents = [];

    res.json(filteredEvents);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const postEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { events } = req.body;
    const { path } = req.file as Express.Multer.File;
    const {
      name,
      location,
      description,
      date,
      time,
      type,
      price,
      category,
      tags,
      userId,
    } = JSON.parse(events);

    const event = await prisma.event.create({
      data: {
        name,
        location,
        description,
        date,
        time,
        category,
        type,
        price: Number(price),
        userId: Number(userId),
        imagePath: path,
        tag: {
          create: tags.map((t: string) => ({ name: t })),
        },
      },
      include: {
        tag: true,
      },
    });

    if (!event) {
      return res.status(400).json({
        message: "something wrong",
      });
    }

    res.json({
      message: "new event created",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const editEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { events } = req.body;
    const {
      name,
      location,
      description,
      date,
      time,
      type,
      price,
      category,
      tags,
      userId,
      eventId,
    } = JSON.parse(events);

    const updatedEvent = await prisma.event.findFirst({
      where: {
        id: Number(eventId),
      },
    });

    if (!!req.file) {
      const { path } = req.file as Express.Multer.File;
      deleteImage(String(updatedEvent?.imagePath));
      await prisma.event.update({
        where: {
          id: Number(eventId),
        },
        data: {
          imagePath: path,
        },
      });
    }

    const event = await prisma.event.update({
      where: {
        id: Number(eventId),
      },
      data: {
        name,
        location,
        description,
        date,
        time,
        category,
        type,
        price: Number(price),
        userId: Number(userId),
      },
    });

    tags.forEach(async (t: { id: string; name: string }) => {
      await prisma.tag.upsert({
        where: {
          id: Number(t.id),
        },
        create: {
          name: t.name,
          event: {
            connect: {
              id: Number(eventId),
            },
          },
        },
        update: {
          name: t.name,
        },
      });
    });

    if (!event) {
      return res.status(400).json({
        message: "something wrong",
      });
    }

    res.json({
      message: "new event created",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const postReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rating, review, eventId, userCommentId, parentId } = req.body;
    await prisma.reviews.create({
      data: {
        eventId: Number(eventId),
        rating: Number(rating),
        date: new Date(),
        comment: String(review),
        userId: Number(userCommentId),
        parentReviewsId: parentId && Number(parentId),
      },
    });
    res.json({
      msg: "review",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getReplies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const replies = await prisma.reviews.findMany({
      where: {
        parentReviewsId: Number(id),
      },
      include: {
        user: true,
        event: true,
      },
    });

    res.json(replies);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const postRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { eventId, userId, referal, newReferral } = req.body;

    await prisma.attendee.create({
      data: {
        eventId: Number(eventId),
        userId: Number(userId),
      },
    });

    const isReferralUsed = await prisma.referral.findFirst({
      where: {
        code: String(referal),
        AND: {
          NOT: {
            used: true,
          },
        },
      },
    });

    await prisma.pointsTransaction.upsert({
      where: {
        userId: Number(isReferralUsed?.ownerId || 0),
      },
      create: {
        points: 0,
        userId: Number(userId),
      },
      update: {
        points: {
          increment: 50,
        },
      },
    });

    await prisma.referral.upsert({
      where: {
        ownerId: Number(isReferralUsed?.ownerId || 0),
      },
      create: {
        code: newReferral,
        eventId: Number(eventId),
        ownerId: Number(userId),
      },
      update: {
        used: true,
        code: newReferral,
      },
    });

    await prisma.transaction.create({
      data: {
        userId: Number(userId),
        eventId: Number(eventId),
      },
    });

    res.status(200).json({
      msg: "success",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const postPromo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, limit, name, eventId } = req.body;

    const promo = await prisma.promo.create({
      data: {
        eventId: Number(eventId),
        name: name,
        limit: Number(limit),
        amount: Number(amount),
      },
    });

    res.json(promo);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const deletePromo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { eventId } = req.params;
    const promo = await prisma.promo.delete({
      where: {
        eventId: Number(eventId),
      },
    });

    res.json(promo);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const getPromo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { eventId } = req.params;

    const promo = await prisma.promo.findFirst({
      where: {
        eventId: Number(eventId),
      },
    });

    res.json(promo);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const postFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, eventId } = req.body;
    const isFavorite = await prisma.favorites.findFirst({
      where: {
        eventId: Number(eventId),
      },
    });
    if (Boolean(isFavorite)) {
      const favorite = await prisma.favorites.delete({
        where: {
          userId_eventId: {
            eventId: Number(eventId),
            userId: Number(userId),
          },
        },
      });

      return res.json(favorite);
    }

    const favorite = await prisma.favorites.create({
      data: {
        userId: Number(userId),
        eventId: Number(eventId),
      },
    });

    res.json(favorite);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteImage = async (path: string) => {
  await unlinkAsync(path);
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { eventId } = req.params;
    if (Number.isNaN(Number(eventId))) {
      return next();
    }
    const event = await prisma.event.delete({
      where: {
        id: Number(eventId),
      },
    });
    await deleteImage(event.imagePath);
    res.json(event);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
