const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        token: String,
        type: String,
        latestItemId: String,
        eventId: String,
    },
    { timestamps: true },
)

userSchema.static("getUserByTypeAndToken", function(type, token) {
    return this.findOne({ type, token })
})

userSchema.static("removeUserByTypeAndToken", function(type, token) {
    return this.remove({ type, token })
})

userSchema.static("removeUserByTypeAndTokenAndEventId", function(type, token, eventId) {
    return this.remove({ type, token, eventId })
})

userSchema.static("getUsersByType", function(type, latestItemId) {
    return this.find({ type, latestItemId: { $ne: latestItemId } })
})

userSchema.static("setLatestItemIdForUser", function(tokens, type, itemId) {
    const criteria = { token: { $in: tokens }, type: type }
    return this.update(criteria, { $set: { latestItemId: itemId } }, { multi: true })
})

userSchema.static("getUsersByEventId", function(eventId) {
    return this.find({ eventId })
})

const User = mongoose.model("User", userSchema)

module.exports = User
