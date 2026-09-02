export type EnquiryStatus =
  | "new"
  | "contacted"
  | "in_progress"
  | "completed"
  | "archived";

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export type EnquiryInput = Omit<Enquiry, "id" | "status" | "createdAt">;

export const ENQUIRY_STATUSES: EnquiryStatus[] = [
  "new",
  "contacted",
  "in_progress",
  "completed",
  "archived",
];

export const ENQUIRY_STATUS_LABELS: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In Progress",
  completed: "Completed",
  archived: "Archived",
};

export const ENQUIRY_SERVICE_OPTIONS = [
  "Web Development",
  "IT Solutions",
  "Graphic Design",
  "Digital Marketing",
  "Other",
] as const;
