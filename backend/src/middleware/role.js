// role based middleware
export default function permit(role) {
  return (req, res, next) => {
    const { user } = req;
    if (user && user.role === role) {
      next();
    } else {
      res.status(403).send({ success: false, error: 'user not allowed' });
    }
  };
}
