import type { Enquiry } from "@/types/enquiry";

export const enquiries: Enquiry[] = [
  {
    id: "enq-example-1",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@example.com",
    phone: "0400 000 111",
    company: "Mitchell & Co",
    service: "Web Development",
    message:
      "Hi, we're looking to redesign our current business website. It's a few years old and doesn't work well on mobile. Could we arrange a time to discuss options?",
    status: "new",
    createdAt: "2026-08-25T02:15:00.000Z",
  },
  {
    id: "enq-example-2",
    name: "James Nguyen",
    email: "james.nguyen@example.com",
    phone: "0400 000 222",
    company: "Nguyen Family Dental",
    service: "IT Solutions",
    message:
      "We're expanding to a second location and need help setting up our network and IT systems there. Keen to get a quote on ongoing support as well.",
    status: "contacted",
    createdAt: "2026-08-22T05:40:00.000Z",
  },
  {
    id: "enq-example-3",
    name: "Priya Anand",
    email: "priya.anand@example.com",
    company: "Anand Studio",
    service: "Graphic Design",
    message:
      "Looking for a full brand refresh — new logo, colour palette, and some templates for social media. Do you have examples of past brand work?",
    status: "in_progress",
    createdAt: "2026-08-18T23:05:00.000Z",
  },
  {
    id: "enq-example-4",
    name: "Tom Baxter",
    email: "tom.baxter@example.com",
    phone: "0400 000 444",
    company: "Baxter Outdoor Supplies",
    service: "Digital Marketing",
    message:
      "Interested in running some Google Ads for our online store ahead of the summer season. What would that look like in terms of setup and management?",
    status: "completed",
    createdAt: "2026-08-10T04:20:00.000Z",
  },
];
