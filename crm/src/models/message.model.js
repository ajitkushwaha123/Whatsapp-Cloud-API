import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    messageId: { type: String, required: true, unique: true },
    timestamp: { type: Date, required: true },

    from: { type: String, required: true },
    to: { type: String, required: true },

    profileName: { type: String },
    waId: { type: String },

    type: { type: String, required: true },
    text: { type: String },

    direction: {
      type: String,
      enum: ["incoming", "outgoing"],
      default: "incoming",
    },
    phoneNumberId: { type: String },
    displayPhoneNumber: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
