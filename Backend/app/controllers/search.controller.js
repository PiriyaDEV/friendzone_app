const Search = require("../models/search.model.js");

function getTimeStamp() {
  return new Date().getTime();
}

exports.getSearchUserToInvite = (req, res) => {
  Search.getSearchUserToInvite(
    req.query.keyword,
    req.query.user_id,
    req.query.event_id,
    (err, result) => {
      if (err) return res.status(500).send({ message: err.message });
      else return res.status(200).send(result);
    }
  );
};

exports.getSearchUser = (req, res) => {
  Search.getSearchUser(req.query.keyword, req.query.user_id, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getSearchEvent = (req, res) => {
  Search.getSearchEvent(req.query.keyword, req.query.user_id, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getSearchDiscount = (req, res) => {
  Search.getSearchDiscount(req.query.keyword, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};
