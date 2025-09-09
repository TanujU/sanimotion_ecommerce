# Supabase Security Configuration Guide

This guide outlines the comprehensive security setup for the Sanimotion E-commerce application using Supabase Auth.

## Environment Variables Required

Create a `.env.local` file with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Security Configuration
NEXTAUTH_SECRET=your_nextauth_secret_key_here
NEXTAUTH_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Session Configuration
SESSION_TIMEOUT_MS=1800000
SESSION_WARNING_TIME_MS=300000

# Password Security
PASSWORD_MIN_LENGTH=8
PASSWORD_REQUIRE_SPECIAL_CHARS=true
PASSWORD_REQUIRE_NUMBERS=true
PASSWORD_REQUIRE_UPPERCASE=true
PASSWORD_REQUIRE_LOWERCASE=true

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY_TIME=3600
JWT_REFRESH_EXPIRY_TIME=604800

# Email Configuration (for password reset, etc.)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Security Headers
SECURITY_HEADERS_ENABLED=true
CORS_ORIGIN=http://localhost:3000

# Monitoring and Logging
LOG_LEVEL=info
AUDIT_LOG_ENABLED=true
SECURITY_MONITORING_ENABLED=true

# Development vs Production
NODE_ENV=development
```

## Security Features Implemented

### 1. Authentication Security
- **PKCE Flow**: Enhanced security for OAuth flows
- **Rate Limiting**: Prevents brute force attacks
- **Password Validation**: Strong password requirements
- **Session Management**: Automatic timeout and refresh
- **Account Lockout**: Temporary lockout after failed attempts

### 2. Database Security
- **Row Level Security (RLS)**: Comprehensive policies for all tables
- **Audit Logging**: All user actions are logged
- **Data Validation**: Input sanitization and validation
- **Secure Functions**: Database functions for security operations

### 3. Session Security
- **Automatic Refresh**: Tokens refresh before expiry
- **Idle Timeout**: Sessions expire after inactivity
- **Device Tracking**: Session tracking by device/IP
- **Secure Storage**: Encrypted session storage

### 4. API Security
- **Security Headers**: Comprehensive security headers
- **CORS Protection**: Proper CORS configuration
- **Input Validation**: All inputs are validated
- **Rate Limiting**: API rate limiting

### 5. Monitoring and Logging
- **Audit Trail**: Complete audit trail of all actions
- **Security Events**: Logging of security-relevant events
- **Failed Attempts**: Tracking of failed login attempts
- **Suspicious Activity**: Detection of suspicious patterns

## Setup Instructions

### 1. Database Setup
Run the `supabase-setup.sql` script in your Supabase SQL editor to:
- Create all necessary tables
- Set up RLS policies
- Create security functions
- Set up audit logging

### 2. Supabase Configuration
In your Supabase dashboard:

1. **Enable Email Auth**:
   - Go to Authentication > Settings
   - Enable email authentication
   - Configure email templates

2. **Set Password Requirements**:
   - Go to Authentication > Settings
   - Configure password requirements
   - Enable email verification

3. **Configure Rate Limiting**:
   - Go to Authentication > Settings
   - Set rate limits for login attempts
   - Configure account lockout settings

4. **Set up Email Templates**:
   - Configure password reset emails
   - Set up email verification templates
   - Customize email styling

### 3. Security Headers
The middleware automatically adds security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Referrer-Policy: strict-origin-when-cross-origin`

### 4. Rate Limiting
Rate limiting is implemented at multiple levels:
- **Login Attempts**: 5 attempts per 15 minutes
- **Signup Attempts**: 3 attempts per hour
- **Password Reset**: 3 attempts per hour
- **API Requests**: 100 requests per 15 minutes

### 5. Password Security
Password requirements:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
- No common patterns (password, 123456, etc.)

## Security Best Practices

### 1. Environment Variables
- Never commit `.env.local` to version control
- Use strong, unique secrets
- Rotate secrets regularly
- Use different secrets for development and production

### 2. Database Security
- Regularly review RLS policies
- Monitor audit logs
- Clean up expired sessions
- Update security functions as needed

### 3. Session Management
- Implement proper session timeout
- Use secure session storage
- Monitor session activity
- Implement session invalidation

### 4. Monitoring
- Set up alerts for security events
- Monitor failed login attempts
- Track suspicious activity
- Regular security audits

## Troubleshooting

### Common Issues

1. **Rate Limiting Too Strict**:
   - Adjust rate limits in `supabase-security.ts`
   - Check database rate limit records

2. **Session Timeout Issues**:
   - Verify session configuration
   - Check token expiry settings
   - Review session manager settings

3. **Password Validation Errors**:
   - Check password requirements
   - Verify validation function
   - Test with different password formats

4. **Database Permission Errors**:
   - Verify RLS policies
   - Check user permissions
   - Review audit logs

### Security Monitoring

Monitor these key metrics:
- Failed login attempts
- Account lockouts
- Session timeouts
- Rate limit violations
- Suspicious user agents
- Unusual access patterns

## Additional Security Measures

### 1. Multi-Factor Authentication (MFA)
Consider implementing MFA for enhanced security:
- SMS-based MFA
- TOTP-based MFA
- Email-based MFA

### 2. Advanced Rate Limiting
Implement more sophisticated rate limiting:
- IP-based rate limiting
- User-based rate limiting
- Endpoint-specific rate limiting

### 3. Security Scanning
Regular security scanning:
- Dependency vulnerability scanning
- Code security analysis
- Penetration testing

### 4. Backup and Recovery
Implement proper backup and recovery:
- Regular database backups
- Secure backup storage
- Disaster recovery procedures

## Support

For security-related issues:
1. Check the audit logs
2. Review the security configuration
3. Consult the Supabase documentation
4. Contact the development team

Remember: Security is an ongoing process. Regularly review and update your security measures to stay protected against new threats.
