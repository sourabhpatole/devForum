const mongoose = require("mongoose");

const ConnectionReqSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);

// connectionReqSchema.index({ fromUserId: 1, toUserId: 1 });

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  ConnectionReqSchema,
);

module.exports = ConnectionRequest;
