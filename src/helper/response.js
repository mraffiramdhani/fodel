module.exports = {
    response: (res, statusRes = 200, success = true, message = "OK", payload = {}) => {
        const payloadResponse = {}
        payloadResponse.success = success
        payloadResponse.message = message
        payloadResponse.data = payload
        return res.status(statusRes).json(payloadResponse)
    }
}