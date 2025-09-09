import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { status } = req.query;

  const base = {
    profileCompletion: 67,
    notifications: [
      {
        id: "n1",
        type: "info",
        title: "Welcome",
        message: "Complete your KYC to activate your account",
        createdAt: new Date().toISOString(),
        read: false,
      },
    ],
  };

  let data;

  switch ((status as string)?.toLowerCase()) {
    case "pending-registration":
      data = {
        ...base,
        accountStatus: "Pending Registration",
        notifications: [
          ...base.notifications,
          {
            id: "n2",
            type: "reminder",
            title: "Registration Step",
            message: "Please complete your registration form.",
            createdAt: new Date().toISOString(),
            read: false,
          },
        ],
      };
      break;

    case "pending-kyc":
      data = {
        ...base,
        accountStatus: "Pending KYC",
        notifications: [
          ...base.notifications,
          {
            id: "n2",
            type: "reminder",
            title: "KYC Required",
            message: "Upload your ID and Address proof to continue.",
            createdAt: new Date().toISOString(),
            read: false,
          },
        ],
      };
      break;

    case "under-review":
      data = {
        ...base,
        accountStatus: "Under Review",
        notifications: [
          ...base.notifications,
          {
            id: "n2",
            type: "info",
            title: "Verification in Progress",
            message: "Our team is reviewing your documents.",
            createdAt: new Date().toISOString(),
            read: false,
          },
        ],
      };
      break;

    case "approved":
      data = {
        ...base,
        accountStatus: "Approved",
        notifications: [
          ...base.notifications,
          {
            id: "n2",
            type: "success",
            title: "KYC Approved",
            message: "Your account is fully active now!",
            createdAt: new Date().toISOString(),
            read: false,
          },
        ],
      };
      break;

    case "rejected":
      data = {
        ...base,
        accountStatus: "Rejected",
        rejectionReasons: [
          "Uploaded ID proof is blurry",
          "Address proof is outdated",
        ],
        notifications: [
          ...base.notifications,
          {
            id: "n2",
            type: "error",
            title: "KYC Rejected",
            message: "Please fix the highlighted issues.",
            createdAt: new Date().toISOString(),
            read: false,
          },
        ],
      };
      break;

    case "suspended":
      data = {
        ...base,
        accountStatus: "Suspended",
        notifications: [
          ...base.notifications,
          {
            id: "n2",
            type: "error",
            title: "Account Suspended",
            message: "Contact support for assistance.",
            createdAt: new Date().toISOString(),
            read: false,
          },
        ],
      };
      break;

    default:
      data = {
        ...base,
        accountStatus: "Pending Registration", // fallback
      };
  }

  res.status(200).json(data);
}
