const engine = require('./pipeline');
const logger = require('./utils/logger');

/**
 * Main entry point for the Email Validation & Trust Scoring System.
 */
module.exports = {
    validate: (email) => engine.validate(email),
    layers: {
        syntax: require('./validators/syntax'),
        dns: require('./validators/dns'),
        security: require('./validators/security'),
        smtp: require('./validators/smtp'),
        reputation: require('./validators/reputation'),
        behavior: require('./validators/behavior'),
        role: require('./validators/role'),
        disposable: require('./validators/disposable'),
        catchall: require('./validators/catchall')
    }
};

