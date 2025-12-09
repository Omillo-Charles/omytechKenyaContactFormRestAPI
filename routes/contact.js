import express from 'express';
import {
    submitContactForm,
    getAllContacts,
    getContactById,
    updateContactStatus,
    deleteContact
} from '../controllers/contact.js';
import { validateContactForm } from '../middleware/validator.js';
import { contactFormLimiter, apiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/submit', contactFormLimiter, validateContactForm, submitContactForm);

router.get('/', apiLimiter, getAllContacts);

router.get('/:id', apiLimiter, getContactById);

router.patch('/:id/status', apiLimiter, updateContactStatus);

router.delete('/:id', apiLimiter, deleteContact);

export default router;
