
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const bookInRouter = require('./routes/bookIn.router');
const bookOutRouter = require('./routes/bookOut.router');
const contactsRouter = require('./routes/contacts.router');
const demographicsRouter = require('./routes/demographics.router');
const eventsRouter = require('./routes/events.router');
const organizationsRouter = require('./routes/organizations.router');
const dataRouter = require('./routes/data.router');
const countiesRouter = require('./routes/counties.router')


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/bookIn', bookInRouter);
app.use('/api/bookOut', bookOutRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/demographics', demographicsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/organizations', organizationsRouter);
app.use('/api/data', dataRouter);
app.use('/api/counties', countiesRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
