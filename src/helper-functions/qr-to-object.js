/**
 * Transforms the <Create QR Code> form state into a Mongo-ready document.
 *
 * @param {Object} form  – UI state from useState({ … })
 * @returns {Object} ready for QRCodeModel.create()
 */



export const formToQRCodeDoc = (form, ownerId, logoUrl = null) => {
  const normalizeHex = (hex) =>
    hex ? (hex.startsWith('#') ? hex.toUpperCase() : `#${hex.toUpperCase()}`) : '#FF312E';

  return {
    ownerId,                                 // ObjectId of the owning user
    slug:   form.slug.trim(),
    target: form.target.trim(),
    dynamic: typeof form.dynamic === 'boolean' ? form.dynamic : true,

    design: {
      color:    normalizeHex(form.color),
      size:     Number(form.size) || 256,
      dotShape: form.dotStyle || 'square',      // 'square' | 'circle' | 'diamond'
      logoUrl,                               // provide after upload, if any
    },

    stats: { totalScans: 0, lastScanAt: null },
    scanRates: [],                           // dailyRateSchema entries populate over time
  };
};
