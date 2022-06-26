import express from 'express';
import passport from 'passport';
import userRoutes from './userRoutes';
import bookRoutes from './bookRoutes';
import authRoutes from './authRoutes';
import friendRoute from './friendRoutes';
import friendshipRequestsRoutes from './friendshipRequestRoutes';
import documentRoutes from './documentRoute';

const router = (app: express.Application) => {
    app.use('/auth', authRoutes)
    app.use('/users', userRoutes);
    app.use('/books', passport.authenticate('jwt', {session: false}), bookRoutes);
    app.use('/friendship-requests', passport.authenticate('jwt', {session: false}), friendshipRequestsRoutes);
    app.use('/friends', passport.authenticate('jwt', {session: false}), friendRoute);
    app.use('/assets', documentRoutes);
}

export default router;