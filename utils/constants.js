
exports.TOPIC = {
    POOL: "pool." + process.env.NODE_ENV,
    POOL_DEAD_LETTER: "pool.dead.letter"
};


exports.PROPERTY_APPROVAL_STATUS = {
    APPROVED: "approved",
    DRAFT: "draft",
    PENDING: "pending_review",
    CHANGE_REQUESTED:"changes-requested",
    CHANGE_MADE:"changes-made",
    REJECTED:"rejected",
    INVESTIGATION_DONE:"investigation-done",
    PRESELL_FAILED:"presell-failed"

};


