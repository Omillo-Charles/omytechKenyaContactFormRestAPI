export const validateContactForm = (req, res, next) => {
    const { name, email, subject, message } = req.body;

    const errors = [];

    if (!name || name.trim().length === 0) {
        errors.push('Name is required');
    }

    if (!email || email.trim().length === 0) {
        errors.push('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.push('Please provide a valid email address');
    }

    if (!subject || subject.trim().length === 0) {
        errors.push('Subject is required');
    }

    if (!message || message.trim().length === 0) {
        errors.push('Message is required');
    } else if (message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};
