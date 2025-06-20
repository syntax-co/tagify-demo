// /lib/models/qr-code.js
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;




const dailyRateSchema = new Schema(
  {
    /* Start of the calendar day in UTC (e.g. 2025-05-21T00:00:00Z) */
    date:  { type: Date, required: true },

    /* Number of scans that occurred on that day */
    count: { type: Number, required: true, min: 0 },
  },
  { _id: false }           // don’t need an _id on each sub-doc
);



const qrCodeSchema = new Schema(
  { 
    ownerId: { type: String, ref: 'User', required: true, index: true },

    slug:   { type: String, required: true, },
    target: { type: String, required: true },

    dynamic: { type: Boolean, default: true },

    design: {
      color:    { type: String, default: '#FF312E', match: /^#([0-9A-F]{6})$/i },
      size:     { type: Number, default: 256, min: 64, max: 2048 },
      dotShape: { type: String, default: 'square' },
      logoUrl:  String,
    },

    stats: {
      totalScans: { type: Number, default: 0 },
      devices: {
        type: Map,
        of: Number,
        default: new Map(), // starts empty: will hold keys like 'mobile', 'desktop', 'tablet', etc.
      },
      lastScanAt: Date,
    },

    /* NEW: rolling daily scan counts */
    scanRates: [dailyRateSchema],
    status: {type: String, enum: ['active', 'paused'], default: 'active' }
  },
  { timestamps: true }
);

// Prevent duplicate slugs per user
qrCodeSchema.index({ ownerId: 1, slug: 1 }, { unique: true });

// delete mongoose.connection.models.QrCode;      // ← blow away stale version
// Hot-reload safety for Next.js
const QrCode = mongoose.models.QrCode || mongoose.model('QrCode', qrCodeSchema);

export default QrCode;
