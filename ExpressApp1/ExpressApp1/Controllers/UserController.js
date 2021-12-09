const User = require('../Models/InputModels/User');
const response = require('../Models/OutputModels/ResponseBase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.Load_List = async function (req, res) {
    try {
        await User.find({}, function (err, Data) {
            if (err) {
                response.ResponseBase(req, res, 2, err);
            }
            else {
                response.ResponseBase(req, res, 1, "Th�nh c�ng !", Data);
            }
        })
    }
    catch (ex) {
        response.ResponseBase(req, res, 2, ex);
    }
};

exports.Insert = async function (req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        let RequestUser = new User(
            {
                UserName: req.body.UserName,
                Password: hashedPassword,
                FullName: req.body.FullName,
                Email: req.body.Email,
                Roles: req.body.Roles
            }
        );
        const isUser = await User.findOne({ UserName: req.body.UserName });
        if (!isUser) {
            await RequestUser.save(async function (err) {
                if (err) {
                    response.ResponseBase(req, res, 2, "Th�m m?i th?t b?i");
                }
                else {
                    response.ResponseBase(req, res, 1, "Th�m m?i th�nh c�ng");
                }
            })
        }
        else {
            response.ResponseBase(req, res, 2, "T�n t�i kho?n ?� t?n t?i. Th�m m?i th?t b?i !")
        }
    }
    catch (ex) {
        response.ResponseBase(req, res, 2,ex);
    }
};

exports.Update = async function (req, res) {
    try {
        const isUser = await User.findOne({ UserName: req.body.UserName });
        if (!isUser) {
            await User.findByIdAndUpdate(req.body.id, { $set: req.body }, async function (err, Data) {
                if (err) {
                    response.ResponseBase(req, res, 2, err);
                }
                else {
                    response.ResponseBase(req, res, 1, "C?p nh?t th�nh c�ng !");
                }
            });
        }
        else {
            response.ResponseBase(req, res, 2, "T�n t�i kho?n ?� t?n t?i");
        }
    }
    catch (ex) {
        response.ResponseBase(req, res, 2, ex);
    }
};

exports.Delete = async function (req, res) {
    try {
        await User.findByIdAndRemove(req.params.id, async function (err) {
            if (err) {
                response.ResponseBase(req, res, 2, "X�a th?t b?i !");
            }
            else {
                response.ResponseBase(req, res, 1, "X�a th�nh c�ng !")
            }
        })
    }
    catch (ex) {
        response.ResponseBase(req, res, 2, ex)
    }
};

exports.Login = async function (req, res) {
    try {
        const { UserName, Password } = req.body;
        const isUser = await User.findOne({ UserName: UserName });
        if (!isUser) {
            response.ResponseBase(req, res, 2, "User kh�ng t?n t?ii !");
        }
        if (!bcrypt.compare(req.body.Password, isUser.Password)) {
            response.ResponseBase(req, res, 2, "M?t kh?u kh�ng ch�nh x�c !");
        }
        else {
            const payload = {
                UserName
            }
            jwt.sign(payload, 'secret', (err, token) => {
                if (err) {
                    response.ResponseBase(req, res, 2, err);
                }
                else {
                    response.ResponseBase(req, res, 1, "??ng nh?p th�nh c�ng !", token);
                }
            })
        }
    }
    catch (ex) {
        response.ResponseBase(req, res, 2, ex);
    }
}

