const fs = require('fs');

// Logging middleware
function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  const logEntry = `${timestamp} - ${method} ${url}\n`;

  fs.appendFile('access.log', logEntry, (err) => {
    if (err) {
      console.error('Error writing to access.log:', err);
    }
  });

  next();
}

// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);

  res.status(500).json({ error: 'Something went wrong. Please try again later.' });
}

module.exports = { requestLogger, errorHandler };
