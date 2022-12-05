'use strict';
const VersionController = {
    versionV1(req, res, next) {
        try {
            return res.status(200).json({
                status: 200,
                msg: "Version V1",
            });
        } catch (error) {
            next(error);
        }
    },
    versionV2(req, res, next) {
        try {
            return res.status(200).json({
                status: 200,
                msg: "Version V2",
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports =  VersionController;