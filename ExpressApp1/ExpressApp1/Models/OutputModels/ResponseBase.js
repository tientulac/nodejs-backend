exports.ResponseBase = function (req, res, StatusID, Message, Data) {
    const ResponseBase = {
        "Data": Data,
        "StatusID": StatusID,
        "Message": Message,
        "Status": (StatusID == 1 ? "Success" : (StatusID == 2 ? "Internal Server" : "Error"))
    }
    res.send(ResponseBase);
    console.log(ResponseBase);
};