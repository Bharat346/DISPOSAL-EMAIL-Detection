#!/usr/bin/env node

const emailTrust = require('../index');
const logger = require('../utils/logger');

const email = process.argv[2];

if (!email) {
    console.log("============================================");
    console.log("🛡️  TempMail Guard CLI");
    console.log("============================================\n");
    console.log("Usage: tempmail-guard <email_address>");
    console.log("\nExample: tempmail-guard user@example.com");
    process.exit(1);
}

// logger.info(`Starting validation for: ${email}`); // Pipeline already logs this

emailTrust.validate(email)
    .then(result => {
        console.log('\n============================================');
        console.log('🛡️  Validation Results');
        console.log('============================================\n');
        
        console.log(`Email:      ${result.email}`);
        console.log(`Valid:      ${result.valid ? '✅ Yes' : '❌ No'}`);
        console.log(`Score:      ${result.trust_score}/100`);
        console.log(`Category:   ${result.category.toUpperCase()}`);
        console.log(`Reasons:    ${result.reasons.join(', ')}`);
        
        console.log('\n--- Detailed Signals ---');
        Object.entries(result.signals).forEach(([layer, data]) => {
            if (data) {
                console.log(`\n[${layer.toUpperCase()}]`);
                Object.entries(data).forEach(([key, value]) => {
                    if (typeof value === 'object') {
                        // Truncate long object outputs for readability
                        const str = JSON.stringify(value);
                        console.log(`  ${key}: ${str.length > 80 ? str.substring(0, 80) + '...' : str}`);
                    } else {
                        console.log(`  ${key}: ${value}`);
                    }
                });
            }
        });
        
        console.log('\n============================================');
        process.exit(result.valid ? 0 : 1);
    })
    .catch(err => {
        console.error('\n❌ Validation failed with an error:');
        console.error(err.message || err);
        process.exit(1);
    });
