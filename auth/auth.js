const auth=(req, res, next)=>{
    if (req.body.role === "admin"||req.params.role === "admin") {
      return next(); // Continue to the next middleware or route handler
    } else {
      return res.json({ message: "Unauthorized. Admin access only." });
    }
  }
  
  module.exports = auth;